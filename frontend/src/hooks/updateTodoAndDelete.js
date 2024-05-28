import { useEffect, useState } from "react"
import { addTodoSchema } from "../validators/authValidate"

import toast from "react-hot-toast"
import { backend_url } from "../../config"
import axios from "axios"
import { useRecoilState } from "recoil"
import { getsetTodos } from "../store/atomstore"
import { useNavigate } from "react-router-dom"


export const useUpAndDel = () => { 
  const updateUrl = `${backend_url}/todo/update/`;
  const deleteUrl = `${backend_url}/todo/delete`;
    const navigate=useNavigate();
    const [mytodos, setmytodos] = useRecoilState(getsetTodos);
  

    const upDate = async (title, description, tag) => { 
      
      const obj = { title, description, tag };
  
      try {
      
        const payload = addTodoSchema.parse(obj); 
        console.log("payload : ", payload);
  
       
        if (payload) { 
    
          const res = await axios.post(addurl, obj, { 
            headers: {
              authorization: localStorage.getItem("Ttoken"),
              'Content-Type': 'application/json'
            }
          });
  
          
          setmytodos([res.data.Todo, ...mytodos]); 
      
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Error adding todo");
        console.error(error.message);
        navigate("/login")
      }
    };
  
    // Updated returned object to use addTodo
    return { upDate }; 
  };