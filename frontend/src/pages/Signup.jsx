import React from 'react'
import { Toaster } from 'react-hot-toast'
import Authform from '../components/Authform'

function Signup() {
  return (
    <>
     <Toaster/>
    <Authform type="signup"></Authform>
    </>
   
  )
}

export default Signup  