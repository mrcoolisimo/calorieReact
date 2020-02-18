import api from "./api";

export const ACTION_TYPES = {
    FETCH_DATE : 'FETCH_DATE'
}

export const fetchDate = (num) => dispatch =>
{
    // #3 Get the URL, perform action (get, post)
    api.DayTotal().fetchDate(num)
    .then(response => {
        // #4 Send this to the reducer
            console.log('hey',response)
            dispatch({
                type : ACTION_TYPES.FETCH_DATE,
                payload : response.data
            })
        }
    )
    .catch(err => console.log(err))
}