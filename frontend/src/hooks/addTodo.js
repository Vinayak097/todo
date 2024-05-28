import { useEffect, useState } from "react"
import { addTodoSchema } from "../validators/authValidate"

import toast from "react-hot-toast"
import { backend_url } from "../../config"
import axios from "axios"
import { useRecoilState } from "recoil"
import { getsetTodos } from "../store/atomstore"


const addTodo=()=>{
    
    
    const addurl=`${backend_url}/todo/todo`;
    
    const [loader,setLoader]=useState();
    const [mytodos,setmytodos]=useRecoilState(getsetTodos);
    useEffect(()=>{
        setLoader(true);
        const Todo=async({title,description,tag})=>{
            const obj={title,description,tag}
            const payload=addTodoSchema.parse(obj);
            console.log("payload : ",payload)
            if(payload.success){
                try{
                    const  res=await axios.post(addurl,{
                        headers:{
                            authorization:localStorage.getItem("Ttoken")
                        }
                        ,body:JSON.stringify(obj)
                    })
                    setLoader(false)
                    setmytodos([res.data.Todo] , ...mytodos);
                    console.log(res)
                    toast.success(res.data.message);
                    

                }catch(error){
                    setLoader(false)
                    toast.error("error ading todos")
                    console.log(error.message)
                    //navigate('/login')
                }
            }
        }
        Todo();
       
        return {loader,newtodo}
    })
}