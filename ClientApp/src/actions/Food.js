import api from "./api";

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'
    //FETCH_DATE : 'FETCH_DATE'
}

const formatData = data => ({
    ...data,
    // Change these into integers
    servings : parseInt( data.servings ? data.servings : 1 ),
    fats : parseInt( data.fats ? data.fats : 0 ),
    carbs : parseInt( data.carbs ? data.carbs : 0 ),
    protein : parseInt( data.protein ? data.protein : 0 )
})



export const fetchAll = (num) => dispatch =>
{
    // #3 Get the URL, perform action (get, post)
    api.Food().fetchAll(num)
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

export const create = (data, onSuccess, num) => dispatch =>{
    data = formatData(data)
    console.log("create", data)
    api.Food().create(data,num)
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
    console.log('edit',data)
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