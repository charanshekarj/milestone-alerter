import { useState } from "react"
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

    let month = date.getMonth() + 1;
    let year = date.getFullYear().toString().substring(2,4);
    const payload = lines;
    let queryString = ''
    month<10 ? queryString=`?month=0${month}&year=${year}` : queryString=`?month=${month}&year=${year}`;

    setDMonth(`${month}-${year}`);
    if(lines.length === 0)
    {
      axios.get(`http://localhost:3000/fetch-csv${queryString}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch(err =>{
          setTasks(['error'])
          console.log(err)
        })
    }
    else {
    axios.post(`http://localhost:3000/upload-csv-file/${queryString}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.data.length===0) 
        setTasks(['error']);
      else
        setTasks(res.data);
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
