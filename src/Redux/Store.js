import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import CountryReducer from './CountryReducer';

const StoreValue =  createStore(CountryReducer, applyMiddleware(thunk));

export default StoreValue;