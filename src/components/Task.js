
const Task = ({ task }) => {

  const splitString = (string) => {
    const parts = string.match(/("[^"]*")|[^,]+/g);
    return parts.map(part => part.replace(/^"/, '').replace(/"$/, '').trim());
  }
  const regex = /(?:[^,]*,){3}((?:[^,]*,)*[^,]*)/;
  const resultArray = task.split(',');
  let milestone = ''
  if(resultArray.length > 5){
    milestone = task.split(regex);

    resultArray[4] = resultArray[resultArray.length-1];
    resultArray[3] = milestone;
  }


  return (
    // <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
    //     <h3>{task.text}  <FaTimes onClick={() => onDelete(task.id)} style={{color:'red', cursor:'pointer'}}/> </h3>
    //     <p>{task.day}</p>
    // </div>

    <tr className="d-flex justify-content-center">
        <td className="col-md-1 task"><h6>{resultArray[0]}</h6></td>
        <td className="col-md-2 task"><h6>{resultArray[1]}</h6></td>
        <td className="col-md-2 task"><h6>{resultArray[2]}</h6></td>
        <td className="col-md-4 task"><h6>{resultArray[3]}</h6></td>
        <td className="col-md-2 task"><h6>{resultArray[4]}</h6></td>
      </tr>


    // <div className='task reminder' >
    //   <h3>{task} </h3>
    // </div>
  )
}

export default Task