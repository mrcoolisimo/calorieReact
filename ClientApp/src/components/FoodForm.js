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
            margin: theme.spacing(1),
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

    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp={...errors}
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
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

    const result = 0 + parseInt(values.fats)*10 + parseInt(values.carbs);

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                console.log("Toasty")
                resetForm()
                addToast("Submitted Successfully!", {appearance:'success'})
                
            }
            if(props.currentId==0)
                props.createFood(values, onSuccess)
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
                <Grid item xs={6}>
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
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField 
                    name="carbs"
                    variant="outlined"
                    label="Carbs"
                    value={values.carbs}
                    onChange={handleInputChange}
                    />
                    <TextField 
                    name="protein"
                    variant="outlined"
                    label="Protein"
                    value={values.protein}
                    onChange={handleInputChange}
                    />
                    {result}
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                                Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
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