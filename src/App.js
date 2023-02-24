import { useState, useEffect } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import axios from "axios";

function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // fetchTasks();
  }, [])

  // const fetchTasks = () => {
  //   let data;
  //   axios.get('http://localhost:8282/csv/readcsv/01/23')
  //   .then((res) => {
  //     setTasks(res.data)
  //   })
  //   .catch(err => console.log(err))

  //   return data;
  // }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data;
  }

  const addTask = (date) => {

    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2,4);

    axios.get(`http://localhost:8282/csv/readcsv/${month}/${year}`)
    .then((res) => {
      setTasks(res.data)
      console.log(tasks);
    })
    .catch(err =>{
        setTasks(['error'])
       console.log(err)})

    // const res = await fetch('http://localhost:5000/tasks', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(task)
    // })

    // const data = await res.json();
    // setTasks([...tasks, data]);

    //const id = Math.floor(Math.random() * 9999);
    //const newTask = {id, ...task};
    //setTasks([...tasks, newTask]);
  }

  // const deleteTask = async (id) => {
  //   await fetch(`http://localhost:5000/tasks/${id}`, {
  //     method: 'DELETE'
  //   });

  //   setTasks(tasks.filter((task) => task.id!==id));
  // }

  // const toggleReminder = async (id) => {

  //   const taskToToggle = await fetchTask(id);
  //   const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  //   const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(updatedTask)
  //   })

  //   const data = await res.json();

  //   setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task
  //   ))
  // }

  return (
    <Router>
      <div className="container">
        <Header onAddTask={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} title='Milestone Alert' />
        <Routes>
          <Route path='/' exact element={
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
          
              {tasks.length > 0 ? 
              <Tasks tasks={tasks}/> 
              : ''}
            </>
          }
          />

          <Route path="/about" element={<About/>} />
        </Routes>
        <Footer/>

      </div>
    </Router>
  );
}

export default App;
