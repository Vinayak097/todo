import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Todos} from './components/Todos'
import { CreateTodo } from './components/CreateTodo'
function App() {
  

  return ( <div id='app'> 
        <CreateTodo/>
       
        <Todos></Todos>
        
                
        
      </div>
  )
}

export default App
