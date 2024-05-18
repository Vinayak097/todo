import React, { useState } from 'react'
import { backend_url } from '../../config'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'


function Authform2({type}) {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [spinner,setSpinner]=useState(false)
    const navigate=useNavigate()
    console.log("authsform2")
   
    const formhandler=async(e)=>{
        e.preventDefault();
        console.log("submitted")
        const data={
            username,
            password
        }
        const pick_Url=backend_url+`/auth/${type}`
        
       
        if(type==="login"){
            console.log('types  : ',type)
            setSpinner(true)
            try{
           
            console.log("axios")
            const response= await axios.post(pick_Url,data)
            console.log('post')
            if(response.status== 200){
                var token=response.data.token;
                localStorage.setItem("Ttoken",token)
                navigate("home")
                setSpinner(false)
            }
           
            setSpinner(false)
        }catch(error){
            setSpinner(false)
            if(error.response.status==411){
                toast.error("username/password incorrect")   
                console.log(response.data.error)            
            }
            console.log(error.response)
           toast.error("Failed to login , retry")
            
    } 
    }
    if(type==="signup"){
        console.log('types  : ',type)
        setSpinner(true)
            try{
            const response= await axios.post(pick_Url,data)
            if(response.status== 201){
                var token=response.data.token;
                localStorage.setItem("Ttoken",token)
                navigate("home")
                setSpinner(false)
            }
        }catch(error){
            setSpinner(false)  
            if(error.response.status==411){
                setSpinner(false)
               toast.error(error.response.data.message)
               console.log(error.response)
            }
            
            
        }
    }

    }
    return (
        <div className=' flex '>
            <Toaster></Toaster>
        
        
        
        <div className='border bg-secondary flex flex-1 justify-center h-screen items-center'>
        <p className=' text-3xl px-5 fs-1 font-light text-primary  mx-4'>
        Supercharge Your Day with todo! Your tasks, your way – Effortless,Efficient, Exceptional. Let's Get Things Done!
        </p>
        
        </div>
            <div className='border flex flex-1 justify-center h-screen items-center'>
                <form onSubmit={formhandler}>
                    <div className='flex flex-col gap-2 h-20 '>
                    <div className=''>
                        <input className='p-2 bg-blue-50' type="text" placeholder='username'  required onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div>
                        <input className='p-2 bg-blue-50' type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div>
                        <button className='text-xl p-2 bg-blue-500 border w-full rounded-md'>
                           {spinner ?"loading" : "submit"}
                        </button>
                    </div>
                    </div>
                   
                </form>
                
            </div>        
        </div>
      )

    
}

export default Authform2
   
