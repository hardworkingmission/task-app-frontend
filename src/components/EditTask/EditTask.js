import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({});

  useEffect(() => {
    axios
      .get(`https://gentle-sierra-12228.herokuapp.com/api/tasks/${taskId}`)
      .then((res) => setTask(res.data));
  }, [taskId]);

  const handleChange = (e) => {
    //console.log(e);
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const editTask = (e) => {
    e.preventDefault();
    let updatedTask = {};
    if (task?.completed === 'false') {
      task.completed = false;
      updatedTask = { ...task };
    } else {
      updatedTask = { ...task };
    }
    axios
      .patch(
        `https://gentle-sierra-12228.herokuapp.com/api/tasks/${updatedTask._id}`,
        updatedTask
      )
      .then((res) => {
        if (res.data) {
          toast.success('Task Updated Successfully..!');
        }
      });
  };
  return (
    <div className="lg:w-1/3 md:w-1/2 w-5/6 mx-auto border-2 p-2 rounded-lg">
      <ToastContainer />
      <form onSubmit={editTask}>
        <div className="mb-2">
          <label htmlFor="name" className=" text-start block">
            Task
          </label>
          <input
            type="text"
            className="w-full p-2 border-2 rounded-lg outline-none"
            id="name"
            name="task"
            value={task?.task}
            onChange={handleChange}
          />
        </div>
        {task.completed ? (
          <div className="mb-2 text-left">
            <label htmlFor="completed" className=" text-start block">
              Status
            </label>
            <input
              type="checkbox"
              id="completed"
              className="checkbox"
              name="completed"
              checked={task?.completed === true ? true : false}
              value={false}
              onChange={handleChange}
            />
          </div>
        ) : (
          ''
        )}
        <div>
          <input
            type="submit"
            className="text-white bg-green-400 p-2 rounded-lg w-full cursor-pointer"
            value={'Update'}
          />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
