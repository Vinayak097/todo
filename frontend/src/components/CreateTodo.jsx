import { useState } from "react";

export function CreateTodo(){
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState(0);
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
    fetch("http://localhost:3000/todo",{
        method:"POST",
        body:JSON.stringify({
            title: title,
            description: description
        }),
        headers:{
            "Content-Type": "application/json" // Corrected header name
        }
    })
    .then(async function(res){
        const json = await res.json();
        alert( json);
    })
}}></button>

    </div>
}

