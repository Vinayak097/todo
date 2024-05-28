import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useRecoilValue } from 'recoil';
import Todocard from '../components/Todocard';
import SyncLoader from "react-spinners/SyncLoader";
import { GetTodos } from '../hooks/getMyTodos';
import { getsetPage, getsetTodos } from '../store/atomstore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAddTodo } from '../hooks/addTodo';
import Form from "react-bootstrap/Form";
import { Toaster } from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
function Todo() {
  const { loader, mytodos } = GetTodos();
  const [addloader,setaddloader]=useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [newtodoTitle,setnewtodoTitle]=useState("")
  const [newtododescription,setnewtodoDescription]=useState("");
  const [newtodotag,setnewtodoTag]=useState("work")
  const {addTodo}=useAddTodo();
  


  // If not used, consider removing it
  // const changePage = (page) => {
  //   SetcuurnetPage(page);
  // };

  const handleshowModel = () => {
    setModalShow(true);
  };
  const addTodoHandler =async ()=>{
    setaddloader(true)
    const res=await addTodo(newtodoTitle,newtododescription,newtodotag);
    setaddloader(false)
    console.log("add rs ",res)
  
    console.log("todo added ")
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <div className='h-screen'>
      <Toaster></Toaster>
      <Modal
        show={modalShow} // Added to control visibility
        onHide={handleCloseModal} // Added to control closing the modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            Add todo item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form>
          <Form.Group className='mb-3 '>
            <Form.Label>
              Title
            </Form.Label>
            <Form.Control type="text"
            rows={2}
            autoFocus
            onChange={(e)=>{setnewtodoTitle(e.target.value)}}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      onChange={(e) => setnewtodoDescription(e.target.value)}
                    />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tag</Form.Label>
            <Form.Control as="select" className='me-2' onChange={(e)=>{setnewtodoTag(e.target.value)}}>
              <option value="work">work</option>
              <option value="self">self</option>
              <option value="study">study</option>
              <option value="other">other</option>
            </Form.Control>
          </Form.Group>



          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button className='border rounded-full' variant='success' onClick={()=>{addTodoHandler()}}>{addloader?<Spinner animation='grow'></Spinner>:"Add todo"}</Button>
          <Button className='shadow' variant='light' onClick={handleCloseModal}>Close</Button> {/* Updated */}
        </Modal.Footer>
      </Modal>

      <div className='flex flex-col mx-36 h-full'>
        <div className='mt-8'>
          <nav className='text-orange-900 flex justify-between'>
            <h1 className='text-4xl font-bold'>Todo</h1>
            <button onClick={handleshowModel} className='text-5xl font-bold'>
              +
            </button>
          </nav>
        </div>

        <div className='shadow-lg border p-2 flex flex-1 mb-8 mt-12 gap-2'>
          <Sidebar />
          <div className='pl-2 flex-1 mx-4'>
            {loader ? (
              <div className="flex h-full w-full justify-center items-center">
                <SyncLoader color="#69665c" margin={4} speedMultiplier={0.5} />
              </div>
            ) : mytodos && mytodos.length > 0 ? (
              <div className='grid p-2 grid-cols-2 gap-4'>
                {mytodos.map((e) => (
                  e._id ? (
                    <Todocard
                      key={e._id} // Ensure each Todocard has a unique key prop
                      id={e._id} // Use _id as the id prop
                      title={e.title}
                      description={e.description}
                      completed={e.completed}
                      tag={e.tag}
                    />
                  ) : (
                    <div key={Math.random()} className="text-red-500">
                      Error: Todo item is missing an _id
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className='flex gap-2  h-full w-full justify-center items-center'>
                <p>No todos available.</p>
                <div className=' '>
                  <button onClick={()=>{handleshowModel()}} className='p-2 rounded-full shadow bg-slate-100 text-zinc-600'> add todo</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
