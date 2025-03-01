import {applyMiddleware,createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";
const ADD_TASK="task/add";
const DELETE_TASK="task/delete";
const FETCH_TASK ="task/fetch";
const initialState={
    task:[],
};
const taskReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_TASK:
            return {...state,
                task:[...state.task,action.payload],
            };
        case DELETE_TASK:
            const updatedTask=state.task.filter((curTask,index)=>{
                return index!==action.payload;
            })
            return {
                ...state,
                task:updatedTask,
            };
        case FETCH_TASK:
            return {
                ...state,
                task:[...state.task , ...action.payload],
            }
        default:
            return state;

    }
}

// export const store=createStore(taskReducer);
// console.log(store); 
// console.log("initial State: ",store.getState()); 
// store.dispatch({type:ADD_TASK,payload:"buy fortuner"});
// console.log("updated State: ",store.getState());
// store.dispatch({type:ADD_TASK,payload:"buy 3 fortuner"});
// console.log("updated State: ",store.getState());
// store.dispatch({type:DELETE_TASK,payload:1});
// console.log("updated State: ",store.getState());

// const addTask=(data)=>{
//     return {type:ADD_TASK,payload:data};
// }
// const deleteTask=(id)=>{
//     return {type:DELETE_TASK,payload:1};
// }
// console.log("initial State: ",store.getState()); 
// store.dispatch(addTask("buyFortuner"));
// console.log("updated State: ",store.getState());
// store.dispatch(addTask("buy two fortuner"));
// console.log("updated State: ",store.getState());
// store.dispatch(deleteTask(1));
// console.log("updated State: ",store.getState());

export const store=createStore(taskReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export const addTask=(data)=>{
    return {type:ADD_TASK,payload:data};
};
export const deleteTask=(id)=>{
    return {type:DELETE_TASK,payload:id};
};
export const fetchTask=()=>{
    return async (dispatch)=>{
        try{
            const res=await fetch (
                "https://jsonplaceholder.typicode.com/todos?_limit=3"
            );
            const task=await res.json();
            dispatch({type:FETCH_TASK,payload:task.map((curr)=>curr.title)})
        }catch(error)
        {
            console.log(error);
        }
    }
}
