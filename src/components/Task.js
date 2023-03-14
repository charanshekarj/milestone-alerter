import { Tbody, Tr, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Task = ({ task }) => {

  // const splitString = (string) => {
  //   const parts = string.match(/("[^"]*")|[^,]+/g);
  //   return parts.map(part => part.replace(/^"/, '').replace(/"$/, '').trim());
  // }
  const regex = /(?:[^,]*,){3}((?:[^,]*,)*[^,]*)/;
  const resultArray = task.split(',');
  let milestone = ''
  if(resultArray.length > 5){
    milestone = task.split(regex);

    resultArray[4] = resultArray[resultArray.length-1];
    resultArray[3] = milestone;
  }


  return (

    <Tbody>
      <Tr className="justify-content-center">
        <Td className=" task"><h6>{resultArray[0]}</h6></Td>
        <Td className=" task"><h6>{resultArray[1]}</h6></Td>
        <Td className=" task"><h6>{resultArray[2]}</h6></Td>
        <Td className=" task"><h6>{resultArray[3]}</h6></Td>
        <Td className=" task"><h6>{resultArray[4]}</h6></Td>
      </Tr>
    </Tbody>


    // <div className='task reminder' >
    //   <h3>{task} </h3>
    // </div>
  )
}

export default Task