import React from 'react';
import Sidebar from '../components/Sidebar';
import { useRecoilValue } from 'recoil';
import Todocard from '../components/Todocard';
import SyncLoader from "react-spinners/SyncLoader";
import { GetTodos } from '../hooks/getMyTodos';
import { getsetPage, getsetTodos } from '../store/atomstore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Todo() {
  const { loader, mytodos } = GetTodos();
  const [modalShow, setModalShow] = React.useState(false);

  // If not used, consider removing it
  // const changePage = (page) => {
  //   SetcuurnetPage(page);
  // };

  const addTodoHandler = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <div className='h-screen'>
      <Modal
        show={modalShow} // Added to control visibility
        onHide={handleCloseModal} // Added to control closing the modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button> {/* Updated */}
        </Modal.Footer>
      </Modal>

      <div className='flex flex-col mx-36 h-full'>
        <div className='mt-8'>
          <nav className='text-orange-900 flex justify-between'>
            <h1 className='text-4xl font-bold'>Todo</h1>
            <button onClick={addTodoHandler} className='text-5xl font-bold'>
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
              <div className='flex h-full w-full justify-center items-center'>
                <p>No todos available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
