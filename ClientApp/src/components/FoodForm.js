import React,{useState,useEffect} from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Food";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        },
        formControl: {
            margin: theme.spacing(10),
            minWidth: 230,
        },
        smMargin: {
            margin: theme.spacing(1)
        }
    },
})

const initialFieldValues ={
    name: '',
    fats: '',
    carbs: '' ,
    protein: ''
}

const FoodForm = ({classes, ...props}) => {

    var num = props.num
    
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp={...errors}
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('fats' in fieldValues)
            temp.fats = (fieldValues.fats >= 0) ? "" : "This field must be a positive number"
        if ('carbs' in fieldValues)
            temp.carbs = (fieldValues.carbs >= 0) ? "" : "This field must be a positive number"
        if ('protein' in fieldValues)
            temp.protein = (fieldValues.protein >= 0) ? "" : "This field must be a positive number"    
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x=="")
    }

    const {
        values, 
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } =useForm(initialFieldValues,validate, props.setCurrentId)

    const result = parseInt( values.fats ? values.fats : 0)*9 + 
                   parseInt( values.carbs ? values.carbs : 0)*4 +
                   parseInt( values.protein ? values.protein : 0)*4

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                resetForm()
                addToast("Submitted Successfully!", {appearance:'success'})
                
            }
            if(props.currentId==0) {
                props.createFood(values, onSuccess, num)
            }
            else
                props.updateFood(props.currentId, values, onSuccess)
        }
    }

    useEffect(()=>{
        if(props.currentId != 0)
            setValues({
                ...props.FoodList.find(x => x.foodID == props.currentId)
            })
            setErrors({})
    },[props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item>
                    <TextField 
                    name="name"
                    variant="outlined"
                    label="Name"
                    value={values.name}
                    onChange={handleInputChange}
                    //error={true}
                    //helperText={errors.name}
                    {...(errors.name && {error:true, helperText:errors.name})}
                    />
                    <TextField 
                    name="fats"
                    variant="outlined"
                    label="Fats"
                    value={values.fats}
                    onChange={handleInputChange}
                    {...(errors.fats && {error:true, helperText:errors.fats})}
                    />
                    <TextField 
                    name="carbs"
                    variant="outlined"
                    label="Carbs"
                    value={values.carbs}
                    onChange={handleInputChange}
                    {...(errors.carbs && {error:true, helperText:errors.carbs})}
                    />
                    <TextField 
                    name="protein"
                    variant="outlined"
                    label="Protein"
                    value={values.protein}
                    onChange={handleInputChange}
                    {...(errors.protein && {error:true, helperText:errors.protein})}
                    />
                    <div>
                        Calories: {result}
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className='float-left width-half'
                        >
                                Submit
                        </Button>
                        <Button
                            variant="contained"
                            className='float-right width-half'
                            onClick={resetForm}
                        >
                                Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    // #6 This list is then retrieved from the reducer
    FoodList : state.Food.list
})

const mapActionToProps ={
    // #2
    createFood : actions.create,
    updateFood : actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FoodForm));