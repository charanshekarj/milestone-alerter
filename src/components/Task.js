
const Task = ({ task }) => {
  const resultArray = task.split(',');
  return (
    // <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
    //     <h3>{task.text}  <FaTimes onClick={() => onDelete(task.id)} style={{color:'red', cursor:'pointer'}}/> </h3>
    //     <p>{task.day}</p>
    // </div>

    <div className="row d-flex justify-content-center">
        <div className="col-1 task"><h6>{resultArray[0]}</h6></div>
        <div className="col-2 task"><h6>{resultArray[1]}</h6></div>
        <div className="col-2 task"><h6>{resultArray[2]}</h6></div>
        <div className="col-4 task"><h6>{resultArray[3]}</h6></div>
        <div className="col-2 task"><h6>{resultArray[4]}</h6></div>
      </div>


    // <div className='task reminder' >
    //   <h3>{task} </h3>
    // </div>
  )
}

export default Task