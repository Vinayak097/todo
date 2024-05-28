import React, { useState } from 'react'
import { backend_url } from '../../config'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userSchema } from '../validators/authValidate'
import toast, { Toaster } from 'react-hot-toast'
import SyncLoader from "react-spinners/SyncLoader";

function Authform({type}) {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [usernameerror,setusernameError]=useState("")
    const [formerror,setFormError]=useState("")
    const [passworderror,setPasswordError]=useState("")
    const [spinner,setSpinner]=useState(false)
    const navigate=useNavigate();
    console.log(type)
      
    useEffect(() => {
        setusernameError("");
        setPasswordError("");
      }, [username, password]);
   

    const formhandler=async(e)=>{
        e.preventDefault();

        const validInput = userSchema.safeParse({ username, password });
        if (validInput.error) {
          for (let i = 0; i < validInput.error.errors.length; i++) {
            if (validInput.error.errors[i].path == "username") {
              setusernameError(validInput.error.errors[i].message);
              
            }
            if (validInput.error.errors[i].path == "password") {
              setPasswordError(validInput.error.errors[i].message);
            }
          }
        }
        if(!validInput.error){
            console.log("pass")
            const data={
                username,
                password
            }
            const url=backend_url+`/auth/${type}`
            
           
            if(type==="login"){
                console.log("login: ",type)
                setSpinner(true)
                try{
                    console.log('enterlogin')               
                
                const response=await axios.post(url,data)
                console.log("log rspon",response)
                if(response.status== 200){
                    toast.success("login success")
                    var token=response.data.token;
                    localStorage.setItem("Ttoken",token)
                    
                    navigate("/todo")
                    setSpinner(false)
                }
                setSpinner(false)
            }catch(error){
                toast.error(error.message)
                setSpinner(false)
            if(error.response.status==411){
                toast.error("username/password incorrect") 
                setusernameError("User not found / incorrect password ")  
                 return
            }
            console.log(error.response)
           toast.error("Failed to login , retry")
           setFormError("Failed to login , retry")
            
        }   
        }
        if(type==="signup"){
            console.log("signup: ",type)
            setSpinner(true)
                try{
              
                
                const response= await axios.post(url,data)
                if(response.status== 201){
                    toast.success("signup success")
                    var token=response.data.token;
                    localStorage.setItem("Ttoken",token)
                    navigate("/todo")
                    setSpinner(false)
                }
                
                setSpinner(false)
            }catch(error){
                setSpinner(false)
                toast.error("failed to signup")
                console.log(error)
                if(error.response.status==400){
                    
                    setusernameError("username alerady exist ")
                }
                if(error.response.status==404){
                    setusernameError(" incorrect inputs ")
                }else{
                   setFormError("Failed to signup , retry")
                }
                
               }

        }

      
       
    }}
  return (
    <div className=' flex '>
        <Toaster></Toaster>
        
        
        
        <div className='border bg-yellow-100 flex flex-1 justify-center h-screen items-center'>
        <p className=' text-3xl px-5 fs-1 font-light text-primary  mx-4'>
            Supercharge Your Day with todo! Your tasks, your way – Effortless,Efficient, Exceptional. Let's Get Things Done!
        </p>
        
        </div>
        
        <div className='border bg-blue-100 flex flex-col gap-4 flex-1 justify-center  items-center'>
        <div className='text-3xl text-center mb-4 '>{type==="login"? "Login" :"Create an Account"}</div>
            <form onSubmit={formhandler}>
              
                <div className='flex flex-col gap-2 h-20  '>
               
                <div className=''>
                    <input className='p-2 bg-blue-50' type="text" placeholder='username'  required onChange={(e)=>{setUsername(e.target.value)}}/>
                    {usernameerror && (
                        <p className="text-red-500 error mt-2 mb-n1">
                          {usernameerror}
                        </p>
                      )}
                </div>
                <div>
                    <input className='p-2 bg-blue-50' type="text" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    {passworderror && ( <p className="text-red-500 error mt-2 mb-n1">
                          {passworderror}
                        </p>)} 
                        {formerror && (<p>
                            {formerror}
                        </p>)}
                </div>
                <div>
                    <button  className='text-xl p-2 bg-blue-500 border w-full rounded-md'>{spinner? "loading.." : <div>{type=="login" ? "login":"signup"}</div>}
                       
                    </button>
                </div>
                </div>
               
            </form>
            
        </div>        
    </div>
  )
}

export default Authform