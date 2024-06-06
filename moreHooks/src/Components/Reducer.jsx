import React from "react";
import { useReducer } from "react";
import { useRef } from "react";
function Reducer(){
const todo={
    inputVal:"",
    task:[],
}


const showUp=useRef(null);

   const toReduce=(state,action)=>{
    switch(action.type){
        case"input":
        return {...state,inputVal:action.value}
        case"tasks":
        console.log(9);
        return {
            ...state,task:[...state.task,
                {id:Date.now(),text:state.inputVal,hidden:false},
            ],
            inputVal:"",
        };
        case "toogle":
            return{
                ...state,
                tasks:state.tasks.map((task)=>
                    task.id===action.id?{...task,hidden:!task.hidden}:task
                ),
            };
            default:
                return state;
    }
   } 

const [toDo,dispatch]=useReducer(toReduce,todo)
const handleInput=(e)=>{
    dispatch({type:"input",value:e.target.value})
    console.log(1);
}
const handleTask=(e)=>{
    if(e.key=='Enter')
        dispatch({type:"tasks"})
    console.log(2);
}
const handleToggle=(id)=>{
    dispatch:({type:"toggle",id})
    console.log(3);
}
const handelFocus=()=>{
    if(showUp.current)
        showUp.current.focus();
}
    return(
        <div>
         <input type="text" value={toDo.inputVal} onChange={handleInput} onKeyDown={handleTask}/>
       <ul>
        {todo.task.map((item)=>(
            <li key={item.id}>{toDo.inputVal}
                <button onClick={()=>handleToggle(item.id)}>toggle</button>
            </li>
            
            ))}
       </ul>
       <button onClick={handelFocus}
       >showUP</button>
        </div>

    )
}
export default Reducer