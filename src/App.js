import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Calender from './components/Calendar/Calendar';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import ToDo from './components/ToDo/ToDo';
import Home from './components/Home/Home';
import EditTask from './components/EditTask/EditTask';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/completedtasks" element={<CompletedTasks />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/edittask/:taskId" element={<EditTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
