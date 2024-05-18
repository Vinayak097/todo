import { useState } from "react";
import { backend_url } from "../../config";
import axios from "axios";
export function CreateTodo(){
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("");
    const [todos,setTodos]=useState();
    return <div id="createtd" >
        <input className="input" id="title" type="text" placeholder="title" onChange={function(e){ 
            const value=e.target.value;
            setTitle(value)
            
        }} ></input><br/>
        <input className="input" id="desc" type="text" placeholder="description" onChange={function(e){
            const value=e.target.value;
            setDescription(value)
        }}></input><br/>
        <button id="compl" onClick={()=>{

    axios.post(`${backend_url}todo/todo`,{
        headers:{
            autorization:localStorage.getItem("Ttoken")
        },
        body:JSON.stringify({
            title: title,
            description: description,
            tag:"study"
        }),
            
    })
    .then(async function(res){
        const json = await res.json();
        
        alert( json);
    })
}}>submit </button>

    </div>
}

