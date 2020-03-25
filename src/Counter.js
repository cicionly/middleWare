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

// let promise = store => next => action =>{
//     if(action.then){
//         return action.then((data)=>next(data));
//     }
//     return next(action);
// }

let chunk = store => next => action =>{
    if(typeof action === "function"){
        return action(next);
    }
    return next(action);
}

let store = applyMiddleWare(chunk)(createStore)(reducer);
store.dispatch((dispatch)=>{
    setTimeout(()=>dispatch({type:ADD}),3000)
})

// let store = applyMiddleWare(promise)(createStore)(reducer);
// store.dispatch(new Promise((resolve,reject)=>{
//     setTimeout(()=>resolve({type:ADD}),3000);
// }));

store.subscribe(()=>console.log(store.getState()));