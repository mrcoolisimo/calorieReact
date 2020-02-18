import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Food";
import * as actions2 from "../actions/DayTotal";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import FoodForm from "./FoodForm";
import FoodChart from "./FoodChart";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import { getDefaultFormatCodeSettings } from "typescript";
import { getCurrentDate } from '../utils/getCurrentDate';

// fetchAllFoods => Action => API => Reducer => back here

const styles = theme =>({
    root:{
        "& .MuiTableCell-head":{
            fontSize:"1.25rem"
        }
    },
    paper : {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
// var date = Date(Date.now()).split('T')[0];

var num = 0


const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

function theDayf (num) {
    var f = new Date(year, month, day  + num) // PLUS 1 DAY
    return f;
}

var theDay = theDayf(num).toDateString()

const Foods = ({classes,...props}) => {
    const [currentId,setCurrentId] = useState(0)
    
    

    useEffect(()=>{
        // #1
        props.fetchAllFoods(num)
        props.fetchDate(num)
        
    },[])//componentDidMount 
    
    const { addToast } = useToasts()

    const onFetchAdd = () => {
        num += 1
        theDay = theDayf(num).toDateString()
        props.fetchAllFoods(num)
        props.fetchDate(num)
    }
    const onFetchSubtract = () => {
        num -= 1
        theDay = theDayf(num).toDateString()
        props.fetchAllFoods(num)
        props.fetchDate(num)
    }

    const onDelete = foodID => {
        if(window.confirm('Are you sure you want to delete this?'))
            props.deleteFood(foodID, () => addToast("Deleted Successfully!", {appearance:'info'}))
    }

    const result = (record) => {
        return(
            parseInt( record.fats ? record.fats : 0)*9 + 
            parseInt( record.carbs ? record.carbs : 0)*4 +
            parseInt( record.protein ? record.protein : 0)*4
        )
    }

    

    return (
    <Paper className={classes.paper} elevation={5}>
        <FoodForm {...({currentId,setCurrentId,num})}/>
        <Grid container>
            <Grid item>
                <div>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className='float-left width-half'
                        onClick={onFetchSubtract}
                    >
                        Yesterday
                    </Button>
                    <Button
                        variant="contained"
                        className='float-right width-half'
                        onClick={onFetchAdd}
                    >
                        Tomorrow
                    </Button>
                    <div>{theDay}</div>
                </div>
                
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Fats</TableCell>
                                <TableCell>Carbs</TableCell>
                                <TableCell>Protein</TableCell>
                                <TableCell>Calories</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // #7 the list is ouput to the page
                                props.FoodList.map((record,index)=>{
                                    return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.fats}</TableCell>
                                            <TableCell>{record.carbs}</TableCell>
                                            <TableCell>{record.protein}</TableCell>
                                            <TableCell>{result(record)}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                    onClick={() => { setCurrentId(record.foodID) }}/></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                    onClick={() => onDelete(record.foodID) }/></Button>
                                                </ButtonGroup> 
                                            </TableCell>
                                        </TableRow>)  
                                })
                            }
                            </TableBody>
                    </Table>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Total Fats</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // #7 the list is ouput to the page
                                props.DayTotal.map((record,index)=>{
                                    return (<TableRow key={index} hover>
                                            <TableCell>{record.totalFats}</TableCell>
                                        </TableRow>)
                                })
                            }
                            </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        
        <FoodChart />
    </Paper>
        
    );
}

const mapStateToProps = state => ({
    // #6 This list is then retrieved from the reducer
    FoodList : state.Food.list,
    DayTotal : state.DayTotal.list
})

const mapActionToProps = {
    // #2
    fetchAllFoods : actions.fetchAll,
    deleteFood : actions.Delete,
    fetchDate : actions2.fetchDate
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Foods));