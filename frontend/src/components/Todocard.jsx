import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useRef } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { getsetTodos } from "../store/atomstore";
import { backend_url } from "../../config";
import axios from "axios";

function Todocard({ title, description, tag, completed, id }) {
  const token = localStorage.getItem("Ttoken");

  const updateUrl = `${backend_url}/todo/update/`;
  const deleteUrl = `${backend_url}/todo/delete`;

  const [mytodos, setmytodos] = useRecoilState(getsetTodos);

  const titleref = useRef();
  const descref = useRef();

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

  const updatetodo = () => {
    // Implement update logic here
    toast.success("implementing in progress ")
  };

  const handleShowUpdateModal = () => {
    toast.success("Updated");
  };

  const handleShowDeleteModal = () => {
    toast.success("Deleted");
  };

  return (
    <div key={id} className='p-4 flex flex-col gap-4 shadow-md text-orange-900 bg-yellow-50'>
      <Toaster />
      <div className='flex justify-between'>
        <p ref={titleref} className={`font-bold text-2xl line-through-animation h-9 ${completed ? 'added' : ''}`}>{title}</p>
        <DropdownButton id="dropdown-basic-button" title="Options">
          <Dropdown.Item onClick={updatetodo}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={handleShowDeleteModal}>Delete</Dropdown.Item>
        </DropdownButton>
      </div>
      <div ref={descref} className={`font-bold text-2xl line-through-animation h-7 w-fit ${completed ? 'added' : ''}`}>
        {description}
      </div>
      <div className='flex justify-between'>
        <img src="" alt="color" />
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
