import React from 'react'

import Authform2 from '../components/Authforms2'
import Authform from '../components/Authform'
import { Toaster } from 'react-hot-toast'
function Login() {
  return (
    <div>
      <Toaster></Toaster>
      <div>

      <Authform type="login"></Authform>
    </div>
    </div>
  )
}

export default Login