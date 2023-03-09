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

  const addTask = (date, lines) => {

    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2,4);
    console.log(year);
    const payload = lines;

    if(lines.length === 0)
    {
      axios.get(`http://localhost:8181/csv/readcsv/${month}/${year}`)
      .then((res) => {
        setTasks(res.data)
        console.log(res.data);
        //console.log(tasks);
      })
      .catch(err =>{
          setTasks(['error'])
          console.log(err)
        })
    }
    else {
    axios.post(`http://localhost:8181/csv/upload-csv-file/${month}/${year}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      setTasks(res.data)
      console.log(res.data);
      //console.log(tasks);
    })
    .catch(err =>{
        setTasks(['error'])
        console.log(err)})
    }
  }


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
