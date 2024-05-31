import Dropdown from "react-bootstrap/Dropdown";
import Spinner from 'react-bootstrap/Spinner';
import React, { useRef } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getsetTodos } from "../store/atomstore";
import { backend_url } from "../../config";
import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import purple from '../assets/images/purple.png'
import red from '../assets/images/red.png'
import green from '../assets/images/green.png'
import blue from '../assets/images/blue.png'
function Todocard({ title, description, tag, completed, id }) {
  const token = localStorage.getItem("Ttoken");
  const updateUrl = `${backend_url}/todo/update/`;
  const deleteUrl = `${backend_url}/todo/delete/`;
  const [mytodos, setmytodos] = useRecoilState(getsetTodos);
  const titleref = useRef();
  const descref = useRef();
  
  const [updateload,setuploader]=useState(false);
  const [newTodoDesc, setNewTodoDesc] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState(null);
  const [deleteloader,setdeleteloder]=useState(false);
  const [selectedTag, setSelectedTag] = useState("work");
  const [showupdate,setshowupdate]=React.useState(false)
  
  const updateHandler=async(key) => { 
    var setobj = {
      $set: {
        // fields and their new values
      } 
    }
    if (newTodoTitle) {
      setobj.$set.title = newTodoTitle;
    }
    console.log(selectedTag)
    if(selectedTag){
      setobj.$set.tag=selectedTag
    }
   
  
    if(newTodoDesc){
      setobj.$set.description=newTodoDesc
    }
    if(!setobj.$set){
      return

    }
    
    console.log(setobj.$set)
    const todo=mytodos.find(todo=>todo._id===key)

    
    if(!todo){
      toast.error("todo not found")
      setuploader(false)
      return 
    }
    
    setuploader(true)
    try{
      const response=await axios.put(updateUrl+todo._id,setobj.$set,{
        headers:{authorization:token}
      })
      
      console.log(response)
    
      setuploader(false)
      setshowupdate(false)

      updaterecoil(todo,setobj.$set)

    }catch(err){
      setuploader(false)
      setshowupdate(false)
      console.log(err)
      toast.error("failed to update");
    }

  }
  const updaterecoil=(todo,data)=>{
    
    console.log(todo._id,"id dsidi ")
    setmytodos(prevtodos=>prevtodos.map(T=>T._id===todo._id ? {...T,
      ...(data.title !==undefined &&{title:data.title}),
    ...(data.description!==undefined && {description:data.description}),
    ...(data.tag!==undefined && {tag:data.tag})
      
    }:T))
   

  }
  const deletefun=async(key)=>{
    console.log("key",key)
    const todo=mytodos.find(todo=>todo._id==key)
    setdeleteloder(true)
    if(!todo){
      toast.error("todo not found ")
      return
    }
    try{
      const response= await axios.delete(deleteUrl+todo._id,{
        headers :{authorization:token}
      })
      setdeleteloder(false)
      if(response.status==200){
        const filtertodo=mytodos.filter(T=>T._id !=todo._id)
        setmytodos(filtertodo)
       
      }
      
      
    }    catch(err){
      setdeleteloder(false)
      console.log(err)
      toast.error("failed to delete ")
    }
  }
  
  const showupdatefun = async() => {
    // Implement update logic here
    setshowupdate(true)
  };
  const closeupdatefun=()=>{
    setshowupdate(false)
  }

 

  
  const Tododone = async (key) => {
    const todo = mytodos.find(todo => todo._id === key);
    if (!todo) {
      toast.error("Todo not found");
      return;
    }
    const data = { completed: !todo.completed };
    try {
      setmytodos(prevtodos => prevtodos.map(todo => 
        todo._id === key ? { ...todo, completed: !todo.completed } : todo
      ));

      if (titleref.current && descref.current) {
        const titleElement = titleref.current;
        const descElement = descref.current;
        
        if (todo.completed) {
          titleElement.classList.add('added');
          descElement.classList.add("added");
        } else {
          titleElement.classList.remove('added');
          descElement.classList.remove("added");
        }
        await axios.put(updateUrl + todo._id, data, {
          headers: { authorization: token }
        });
      }
    } catch (error) {
      toast.error("Error updating todo: " + error.message);
    }
  };
  const colors={
    work:purple,
    study:red,
    self:green,
    other:blue
  }
  


  return (
    <div key={id} className={`${completed ? 'shadow-none  ' :"shadow "} bg-yellow-50 p-4 flex flex-col gap-4  text-zinc-600 `}>
      <Modal show={showupdate} onHide={closeupdatefun}>
      <Modal.Header closeButton>
                <Modal.Title>Update todo item</Modal.Title>
              </Modal.Header>
      
      <Modal.Body>
      <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      onChange={(e) => setNewTodoTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      onChange={(e) => setNewTodoDesc(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="me-2"
                    >
                      <option value="work">Work</option>
                      <option value="study">Study</option>
                      <option value="self">Self</option>
                      <option value="other">Other</option>
                    </Form.Control>
                  </Form.Group>
                </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" onClick={closeupdatefun}>
                  Close
                </Button>
                <Button variant="success" onClick={()=>{updateHandler(id)}}>
                 {updateload? <Spinner animation="grow" />:" update"}
                </Button>
              </Modal.Footer>
              </Modal>
      <Toaster />
      <div className='flex justify-between'>
        
        <p ref={titleref} className={`font-semibold text-2xl line-through-animation h-9 ${completed ? 'added' : ''}`}>{title}</p>
        <Dropdown className="ms-auto bg-transparent  rounded-md flex " drop="start">
            <Dropdown.Toggle className="flex text-zinc-900 " id="dropdown-basic" variant="">
              <p className="text-2xl">...</p>            </Dropdown.Toggle>
            <Dropdown.Menu className="text-zinc-900 ">
              <Dropdown.Item onClick={showupdatefun} className="light">
                Edit...
                <Dropdown.Divider />
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>{deletefun(id)}} className="light">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
      <div ref={descref} className={`font-light text-lg line-through-animation  w-fit ${completed ? 'added' : ''}`}>
        {description}
      </div>  
      <div className='flex justify-between'>
        <img className="w-8 h-8" src={colors[tag]} alt="color" />
        <input 
          type="checkbox" 
          checked={completed}
          onChange={() => Tododone(id)} 
        />
      </div>
    </div>
  );
}

export default Todocard;
