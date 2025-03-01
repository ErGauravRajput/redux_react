import { useDispatch, useSelector } from "react-redux";
import {MdDeleteForever} from "react-icons/md";
import { useState } from "react";
import { addTask, deleteTask, fetchTask } from "../store";
export const Todo=()=>{
    const tasks=useSelector((state)=>state.task);
    const dispatch=useDispatch();
    const [task,setTask]=useState("");
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        if(task.trim()=="") return;
        dispatch(addTask(task));
        return setTask("");
    }
    const handleTaskDelete=(index)=>{
        return dispatch(deleteTask(index));
    }
    const handleFetchTasks=()=>{
       return dispatch(fetchTask());
    }
    return (
        <div className="container">
            <div className="todo-app">
                <h1>
                    <i className="fa-regular fa-pen-to-square"></i>To-do List:
                </h1>
                <div className="row">
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" id="input-box" placeholder="Add a new Task" value={task} 
                        onChange={(e)=>setTask(e.target.value)}/>
                        <button>Add Task</button>
                    </form>
                </div>
                <button onClick={handleFetchTasks}>Fetch Tasks</button>
                <ul id="list-container"></ul>
                {tasks.map((curr,index)=>{
                    return (
                        <li key={index}>
                            <p>{index}.{curr}</p>
                            <div>
                                <button ><MdDeleteForever className="icon-style" 
                                onClick={()=>handleTaskDelete(index)}/></button>
                            </div>
                        </li>
                        
                    );
                })}
            </div>
        </div>
    );
}
