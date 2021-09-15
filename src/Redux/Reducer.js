import React from 'react';
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux';

const DATA_START = "START";
const DATA_PROCESS = "PROCESS";
const DATA_FAIL = "FAIL";

const defaultValue = { loading : false, data : [], error : "" }

const CountryReducer = (state = defaultValue, actions) => {
    switch (actions.type) {
        case 'START':
            return {
                ...state,
                loading : true
            }
        case 'PROCESS':
            return {
                loading : false,
                data : actions.data,
                error : ""
            }
        case 'FAIL':
            return {
                loading : false,
                data : [],
                error : actions.error
            }
    
        default:
            return{...state }
    }
}

let stores = createStore(CountryReducer, applyMiddleware(thunk))

export default stores;