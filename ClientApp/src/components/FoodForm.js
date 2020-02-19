import React,{useState,useEffect} from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Food";
import * as actions2 from "../actions/DayTotal";
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
    servings: '',
    fats: '',
    carbs: '' ,
    protein: ''
}



const FoodForm = ({classes, ...props}) => {

    var num = props.num
    
    const { addToast } = useToasts()

    function buttonWait() {
        props.fetchDate(num)
      }

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

    const result = (parseInt( values.fats ? values.fats : 0)*9 + 
                   parseInt( values.carbs ? values.carbs : 0)*4 +
                   parseInt( values.protein ? values.protein : 0)*4)*
                   parseInt( values.servings ? values.servings : 1)

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                resetForm()
                addToast("Submitted Successfully!", {appearance:'success'})
                
            }
            if(props.currentId==0) {
                props.createFood(values, onSuccess, num)
                setTimeout(buttonWait, 2000)
            }
            else
                props.updateFood(props.currentId, values, onSuccess)
                setTimeout(buttonWait, 1000)
                
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
            <Grid container className = "">
                <Grid item className = "width-full">
                    <div className = "margin-center">
                    <TextField 
                    name="name"
                    variant="outlined"
                    label="Name"
                    value={values.name}
                    onChange={handleInputChange}
                    className = "width-full"
                    //error={true}
                    //helperText={errors.name}
                    {...(errors.name && {error:true, helperText:errors.name})}
                    />
                    <TextField 
                    name="servings"
                    variant="outlined"
                    label="Servings"
                    value={values.servings}
                    onChange={handleInputChange}
                    className = "width-full"
                    //error={true}
                    //helperText={errors.name}
                    //{...(errors.name && {error:true, helperText:errors.name})}
                    />
                    </div>
                    <div className="margin-center">
                    <TextField 
                    name="fats"
                    variant="outlined"
                    label="Fats"
                    value={values.fats}
                    onChange={handleInputChange}
                    className = "width-third"
                    {...(errors.fats && {error:true, helperText:errors.fats})}
                    />
                    <TextField 
                    name="carbs"
                    variant="outlined"
                    label="Carbs"
                    value={values.carbs}
                    onChange={handleInputChange}
                    className = "width-third"
                    {...(errors.carbs && {error:true, helperText:errors.carbs})}
                    />
                    <TextField 
                    name="protein"
                    variant="outlined"
                    label="Protein"
                    value={values.protein}
                    onChange={handleInputChange}
                    className = "width-third"
                    {...(errors.protein && {error:true, helperText:errors.protein})}
                    />
                    </div>
                    <div className = "centerText">
                        Calories (estimate): {result}
                    </div>
                    <br></br>
                    <div className="vertical-pad">
                        <Button
                            type="submit"
                            variant="contained"
                            className='float-left width-half green vertical-pad'
                        >
                                Submit
                        </Button>
                        <Button
                            className='float-right width-half grey vertical-pad'
                            variant="contained"
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
    updateFood : actions.update,
    fetchDate : actions2.fetchDate
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FoodForm));