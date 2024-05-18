
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Todo from './pages/todo'
function App() {
  

  return ( <div id='app'>
    <Routes>
        <Route element={<Home />} path="/home"></Route>
        <Route element={<Login></Login>} path="/login"></Route>
        <Route element={<Signup />} path="/signup"></Route>
        <Route element={<Todo />} path="/todo"></Route>
      </Routes>
      </div>
  )
}

export default App
