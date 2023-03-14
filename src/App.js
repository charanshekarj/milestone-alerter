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

  const [showAddTask, setShowAddTask] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [dMonth, setDMonth] = useState(`${new Date().getMonth()}-${new Date().getFullYear()}`);


  const addTask = (date, lines) => {

    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2,4);
    console.log(year);
    const payload = lines;

    setDMonth(`${month}-${year}`);
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
              <Tasks tasks={tasks} date={dMonth}/> 
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
