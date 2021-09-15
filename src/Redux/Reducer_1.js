import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios'

const defaultValue = { loading : false, data : [], error : "" }

//export const validateGetAction = () => ({ type : "GET", data: "" });

const CountryReducer1 = (state = defaultValue, actions) => {
     
    if (actions.type === "GET") {
        
        console.log(actions);
        

        axios.get('https://restcountries.eu/rest/v2/name/' + actions.data + '?fullText=true')
            .then(response => {
                    let data = [];
                    data = response.data[0];

                    console.log({
                        loading : true,
                        data : data,
                        error : "GET"
                    });

                    return {
                        loading : true,
                        data : data,
                        error : "GET"
                    }
                }
            ).catch(err => { 
                return {
                    loading : true,
                    data : "",
                    error : "GET ERROR"
                }
             });

    } else if(actions.type === "PUT") {

        return {
            loading : false,
            data : ["PUT"],
            error : "PUT"
        }

    } else if (actions.type === "DELETE") {
        return {
            loading : false,
            data : ["DELETE"],
            error : "DELETE"
        }
    } else {
        return {...state};
    }
}

let stores1 = createStore(CountryReducer1)

export default stores1;