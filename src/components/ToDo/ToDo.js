import axios from 'axios';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import date from 'date-and-time';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTasks from '../../useTasks/useTasks';
import CustomConfirm from '../CustomConfirm/CustomConfirm';

const currentTime = date.format(new Date(), date.compile('MMM D YYYY h:m:s A'));

const ToDo = () => {
  const { tasks, loading, refetch, setRefetch } = useTasks();
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    task: '',
    completed: false,
    email: 'sshakil496@gmail.com',
    createdAt: currentTime,
    completedAt: '',
  };
  const [newTask, setNewTask] = useState(initialState);
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  //add task
  const addTask = (e) => {
    e.preventDefault();
    axios
      .post('https://gentle-sierra-12228.herokuapp.com/api/tasks', newTask)
      .then((res) => {
        if (res.data) {
          setRefetch(!refetch);
          toast('Task Added Successfully..!');
          setNewTask(initialState);
        }
      });
  };

  //change status;
  const editStatus = (e) => {
    //setCompleted(e.target.value);
    const taskInfo = { completed: true, completedAt: currentTime };
    axios
      .patch(
        `https://gentle-sierra-12228.herokuapp.com/api/tasks/${e.target.value}`,
        taskInfo
      )
      .then((res) => {
        if (res.data) {
          setRefetch(!refetch);
        }
      });
  };

  //delete task
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskId, setTaskId] = useState('');
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleConfirm = (confirm) => {
    if (confirm) {
      axios
        .delete(`https://gentle-sierra-12228.herokuapp.com/api/tasks/${taskId}`)
        .then((res) => {
          if (res.data) {
            setModalIsOpen(false);
            setRefetch(!refetch);
            toast('Task Deleted Successfully..!');
          }
        });
    }
  };
  const deleteTask = (id) => {
    setModalIsOpen(true);
    setTaskId(id);
  };

  if (loading) {
    return (
      <button className="btn bg-green-400 border-0 loading my-5">
        loading
      </button>
    );
  }
  return (
    <div className="w-5/6 mx-auto">
      <ToastContainer />
      <CustomConfirm
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        handleConfirm={handleConfirm}
      />

      <div className="my-5">
        <button
          className="text-3xl font-[500] hover:text-green-400"
          onClick={() => setAgree(!agree)}
        >
          + Add Task
        </button>
        <div className={`${agree ? 'block' : 'hidden'}`}>
          <form onSubmit={addTask}>
            <input
              className={`border-2 p-2 rounded-lg outline-none`}
              type="text"
              name="task"
              placeholder="Add your task"
              value={newTask.task}
              onChange={handleChange}
              required
              onKeyPress={(e) => e.key === 'Enter' && addTask}
            />
          </form>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Complete</th>
              <th>Task</th>
              <th>Created At</th>
              <th>Completed At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {tasks?.map((task, index) => (
              <tr key={task?._id}>
                <td>
                  {task.completed === false ? (
                    <input
                      type="checkbox"
                      className="checkbox bg-blue-400"
                      value={task._id}
                      onChange={editStatus}
                    />
                  ) : (
                    ''
                  )}
                </td>
                <td>
                  <div className="flex items-center space-x-3">{task.task}</div>
                </td>
                <td>{task.createdAt}</td>
                <td>{task.completed === true ? task.completedAt : ''}</td>
                <td>
                  {task.completed === true ? (
                    <span className="text-green-400">Completed</span>
                  ) : (
                    <span className="text-red-400">Pending</span>
                  )}
                </td>
                <th>
                  <div className="flex">
                    <button
                      className="text-green-400 h-[35px] w-[35px] rounded-[50%] flex items-center justify-center hover:bg-gray-200"
                      onClick={() => navigate(`/edittask/${task._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 ml-3 h-[35px] w-[35px] flex rounded-[50%] items-center justify-center hover:bg-gray-200"
                      onClick={() => deleteTask(task._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDo;
