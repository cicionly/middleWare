let createStore = (reducer)=>{
    let state;
    let listeners = [];

    let getState = ()=>state;

    let subscribe = (listener)=>{
        listeners.push(listener);
        return ()=>(
            listeners = listeners.filter(l=>l!==listener)
        )
    }

    let dispatch = (action) =>{
        state = reducer(state,action);
        listeners.forEach(l=>l());
    }

    dispatch();

    return ({
        getState,
        subscribe,
        dispatch
    })
}

let compose = (...fns) =>{
    return (...args)=>{
        let last = fns.pop();
        return fns.reduceRight((first,next)=>{ return next(first)},last(...args))
    }
}

let applyMiddleWare = (...middleWares) =>{
    return createStore => reducer =>{
        let store = createStore(reducer);
        console.log(middleWares);
        middleWares = middleWares.map((middleWare)=>middleWare(store));
        let dispatch = compose(...middleWares)(store.dispatch);
        return {
            ...store,dispatch
        }
    }
}

export  {createStore,applyMiddleWare};