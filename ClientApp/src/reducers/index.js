import { combineReducers } from "redux";
import { Food } from "./Food";
import { DayTotal } from "./DayTotal";

export const reducers = combineReducers({
    Food,
    DayTotal
})