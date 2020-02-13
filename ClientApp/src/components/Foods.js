import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Food";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import FoodForm from "./FoodForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

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

const Foods = ({classes,...props}) => {
    const [currentId,setCurrentId] = useState(0)

    useEffect(()=>{
        // #1
        props.fetchAllFoods()
    },[])//componentDidMount 

    const { addToast } = useToasts()

    const onDelete = foodID => {
        if(window.confirm('Are you sure you want to delete this?'))
            props.deleteFood(foodID, () => addToast("Deleted Successfully!", {appearance:'info'}))
    }

    return (
    <Paper className={classes.paper} elevation={5}>
        <Grid container>
            <Grid item xs={5}>
                <FoodForm {...({currentId,setCurrentId})}/>
            </Grid>
            <Grid item xs={5}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Fats</TableCell>
                                <TableCell>Carbs</TableCell>
                                <TableCell>Protein</TableCell>
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
                </TableContainer>
            </Grid>
        </Grid>
    </Paper>
    );
}

const mapStateToProps = state => ({
    // #6 This list is then retrieved from the reducer
    FoodList : state.Food.list
})

const mapActionToProps ={
    // #2
    fetchAllFoods : actions.fetchAll,
    deleteFood : actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(Foods));