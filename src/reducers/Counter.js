import {ADD,SUB} from '../ActionTypes'
let reducer = (state=0,action)=>{
    if(action){
        switch(action.type){
            case ADD: ;return state + 1;
            case SUB: return state - 1;
            default: return state;
        }
    } else {
        return state;
    }
}

export default reducer;