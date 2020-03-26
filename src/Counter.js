import React from 'react';
import {createStore, applyMiddleWare} from './redux';
import reducer from "./reducers/Counter";
import { ADD} from './ActionTypes';

export default class Counter extends React.Component{
    render(){
        return <div className="container">
            <button>+</button>
            <button>-</button>
        </div>
    }
}

let logger1 = store =>next=>action=>{
    console.log("logger1 before");
    next(action);
    console.log("logger1 after");
}

let logger2 = store =>next=>action=>{
    console.log("logger2 before");
    next(action);
    console.log("logger2 after");
}

let store = applyMiddleWare(logger1,logger2)(createStore)(reducer);
store.subscribe(()=>{console.log(store.getState())})
store.dispatch({type:ADD})
