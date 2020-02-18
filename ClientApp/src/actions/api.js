import axios from "axios";

const baseUrl = "https://localhost:44370/api/"
export default {
    Food(url = baseUrl + 'foods/'){
        return {
            fetchAll : num => axios.get(url+'?num='+num),
            fetchById : id => axios.get(url+id),
            create : (newRecord,num) => axios.post(url+"?num="+num, newRecord),
            update : (id, updateRecord) => axios.put(url+id, updateRecord),
            delete : id => axios.delete(url+id)
        }
    },
    DayTotal(){
        return {
            fetchDate : num => axios.get(baseUrl + 'dayTotals/' + '?date=' + num)
        }
    }
}