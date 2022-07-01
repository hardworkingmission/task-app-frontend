import React from 'react';
import useTasks from '../../useTasks/useTasks';

const CompletedTasks = () => {
  const { tasks, loading, refetch, setRefetch } = useTasks();
  const completedTasks = tasks.filter((task) => task.completed === true);
  if (loading) {
    return (
      <button className="btn bg-green-400 border-0 loading my-5">
        loading
      </button>
    );
  }
  return (
    <div className="w-5/6 mx-auto my-5">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Task</th>
              <th>Created At</th>
              <th>Completed At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {completedTasks?.map((task, index) => (
              <tr key={task._id}>
                <td>
                  <div className="flex items-center space-x-3">{task.task}</div>
                </td>
                <td>{task.createdAt}</td>
                <td>{task.completedAt}</td>
                <td>
                  {task.completed === true ? (
                    <span className="text-green-400">Completed</span>
                  ) : (
                    <span className="text-red-400">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* <!-- foot --> */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
};

export default CompletedTasks;
