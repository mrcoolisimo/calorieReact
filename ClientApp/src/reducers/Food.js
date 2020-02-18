import { ACTION_TYPES } from "../actions/Food";

const initialState = {
    list:[]
}


export const Food = (state=initialState, action) => {
    switch (action.type) {

        case ACTION_TYPES.FETCH_ALL:
            // #5 Store the data we got from the action into the list
            return {
                //...state,
                list:[...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list : [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list : state.list.map(x => x.foodID == action.payload.foodID ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list : state.list.filter(x => x.foodID != action.payload)
            }

        default:
            return state
    }
}