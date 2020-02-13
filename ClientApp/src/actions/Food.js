import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'
}

const formatData = data => ({
    ...data,
    // Change these into integers
    fats : parseInt( data.fats ? data.fats : 0),
    carbs : parseInt( data.carbs ? data.carbs : 0),
    protein : parseInt( data.protein ? data.protein : 0 )
})

export const fetchAll = () => dispatch =>
{
    // #3 Get the URL, perform action (get, post)
    api.Food().fetchAll()
    .then(response => {
        // #4 Send this to the reducer
            dispatch({
                type : ACTION_TYPES.FETCH_ALL,
                payload : response.data
            })
        }
    )
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch =>{
    data = formatData(data)
    api.Food().create(data)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.CREATE,
            payload:res.data
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const update = (foodID, data, onSuccess) => dispatch =>{
    data = formatData(data)
    api.Food().update(foodID, data)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.UPDATE,
            //Add the id to send with data (id:id == id)
            payload: {foodID,...data}
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}

export const Delete = (foodID, onSuccess) => dispatch =>{
    api.Food().delete(foodID)
    .then(res =>{
        dispatch({
            type:ACTION_TYPES.DELETE,
            //Add the id to send with data (id:id == id)
            payload: foodID
        })
        onSuccess()
    })
    .catch(err => console.log(err))
}