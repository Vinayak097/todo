import React, { useState } from 'react'

import { Toaster } from 'react-hot-toast'
import girl from '../assets/images/girl2.png'
import todocard from "../assets/images/hometodo.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backend_url } from '../../config'
import SyncLoader from "react-spinners/SyncLoader";
function Home() {
  const [spinner,setSpinner]=useState(false)
  const navigate=useNavigate()
  const hadlehome=async()=>{
    setSpinner(true)
    try{
    const token=localStorage.getItem("Ttoken")
    console.log(token)
    if(token==undefined){
      navigate("/signup")
    }
    console.log("response")
    const response= await axios.get(`${backend_url}/todo/todos`,{
      headers:{
        authorization:token
      }
    })
    console.log("respond :" ,response)
    navigate("/todo")
    }catch(error){
      console.log(error.response)
   
      navigate("/signup")
    }
  }
  return (
    <>
    <Toaster></Toaster>
    {spinner ? ( <div className="flex h-screen bg-yellow-100 justify-center  ">
      <div className='flex items-center justify-center'>
      <SyncLoader color="#69665c" margin={4} speedMultiplier={0.5} />
      </div>
          
        </div>):(
    <div className='flex  justify-center text-center'>
  
      <div className=' '>
       <div className='pt-2'>
        <h1 className='flex text-7xl font-bold  justify-center mt-2 '> 
          <p className='text-blue-300'>t</p>
          <p className='text-yellow-300'>o</p>
          <p className='text-red-300'>d</p>
          <p className='text-green-300'>o</p>
        </h1>
      </div>
      <div className='flex pt-12 justify-center'>
       <p className='text-xl text-center '>
       Get stuff done with our minimal pastel aesthetic todo app.
       <br></br>
        Simplify your day, one task at a time!
       </p>
      </div>
      <div className='pt-12'>
      <button onClick={hadlehome} class="text-white p-3 px-8 rounded-md bg-[#746056]">Get Started</button>
      </div>
      <div className="png-img-container flex justify-center mt-6 mt-md-5">
              <img src={girl} style={{width: "10rem"}} alt="" className="avatar mb-n2 mb-md-n4" />
            </div>
            <div className="todo-img-container">
              <img
                style={{ height: "11rem", width: "30rem" }}
                src={todocard}
                alt=""
                className="todo-img"
              />
            </div>
    </div>
    </div>)} 
    </>
  )
}

export default Home