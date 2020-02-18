import { ACTION_TYPES } from "../actions/DayTotal";

const iniitalState = {
    list:[]
}

export const DayTotal = (state=iniitalState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_DATE:
            // #5 Store the data we got from the action into the list
            return {
                //...state,
                list:[...action.payload] 
            }
        
        default:
            return state
        }   
}