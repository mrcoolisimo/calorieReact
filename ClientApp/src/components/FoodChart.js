import React,{useState,useEffect} from "react";
import { connect } from "react-redux";
import {Line} from 'react-chartjs-2';
import * as actions2 from "../actions/DayTotal";

var arr = []
var arr2 = []
var arr3 = []
var dates = []

var test = (data) => {
    arr = []
    for (var item in data) {
            arr.unshift(data[item].totalFats);
    }
    console.log('data',data)
    return arr;
}

var test2 = (data) => {
    arr2 = []
    for (var item in data) {
            arr2.unshift(data[item].totalCarbs);
    }
    return arr2;
}

var test3 = (data) => {
  arr3 = []
  for (var item in data) {
          arr3.unshift(data[item].totalProtein);
  }
  return arr3;
}

var datef = (data) => {
    dates = []
    for (var item in data) {
        //console.log(data)
        dates.unshift(data[(item)].date);
    }
    
    return dates;
}

const FoodChart = ({classes, ...props}) => {
      return (
        arr = test(props.DayTotal),
        arr2 = test2(props.DayTotal),
        arr3 = test3(props.DayTotal),
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
                        backgroundColor: 'rgba(154, 223, 65,1)',
                        borderColor: 'rgba(154, 223, 65,1)',
                        borderWidth: 2,
                        data: arr
                    },
                    {
                        label: 'Carbs',
                        fill: false,
                        lineTension: 0,
                        backgroundColor: 'rgba(233, 163, 58,1)',
                        borderColor: 'rgba(233, 163, 58,1)',
                        borderWidth: 2,
                        data: arr2
                    },
                    {
                      label: 'Protein',
                      fill: false,
                      lineTension: 0,
                      backgroundColor: 'rgba(50, 219, 197,1)',
                      borderColor: 'rgba(50, 219, 197,1)',
                      borderWidth: 2,
                      data: arr3
                  }
                ]
            }}
            options={{
              title:{
                display:true,
                text:'Macronutrient Data in Last 7 Days',
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