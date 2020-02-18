import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import {Line} from 'react-chartjs-2';
import * as actions2 from "../actions/DayTotal";

var arr = []
var arr2 = []
var dates = []

var test = (data) => {
    arr = []
    for (var item in data) {
            arr.unshift(data[item].totalFats);
    }
    return arr;
}

var test2 = (data) => {
    arr2 = []
    for (var item in data) {
            arr2.unshift(data[item].totalCarbs);
    }
    return arr2;
}

var datef = (data) => {
    dates = []
    for (var item in data) {
        //console.log(data)
        dates.unshift(data[(item)].date);
    }
    console.log(dates)
    return dates;
}

const FoodChart = ({classes, ...props}) => {
      return (
        arr = test(props.DayTotal),
        arr2 = test2(props.DayTotal),
        dates = datef(props.DayTotal),
        console.log('dates', dates),
        <div>
          <Line
            data={{labels: dates,
                datasets: [
                    {
                        label: 'Fats',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: 'rgba(0,192,0,1)',
                        borderColor: 'rgba(0,192,0,1)',
                        borderWidth: 2,
                        data: arr
                    },
                    {
                        label: 'Carbs',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: 'rgba(150,0,0,1)',
                        borderColor: 'rgba(150,0,0,1)',
                        borderWidth: 2,
                        data: arr2
                    }
                ]
            }}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
        </div>
      );
}

const mapStateToProps = state => ({
    // #6 This list is then retrieved from the reducer
    DayTotal : state.DayTotal.list
})

const mapActionToProps ={
    // #2
    fetchDate : actions2.fetchDate
}

export default connect(mapStateToProps,mapActionToProps)(FoodChart, test);