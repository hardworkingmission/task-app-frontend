import axios from 'axios';
import { useEffect, useState } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://gentle-sierra-12228.herokuapp.com/api/tasks')
      .then((res) => {
        if (res.data) {
          setLoading(false);
          setTasks(res.data);
        }
      });
  }, [refetch]);
  return { tasks, loading, refetch, setRefetch };
};

export default useTasks;
