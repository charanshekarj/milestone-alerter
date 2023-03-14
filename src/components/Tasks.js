import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Task from "./Task"
import { Table, Thead, Tr, Th } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Tasks = ({ tasks, date }) => {

  const targetRef = useRef(null);

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 680;

  const generatePDF = () => {
    const input = targetRef.current;
    if(isMobile) {
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      pdf.html(input).then(() => {
        pdf.save(`${date}.pdf`);
      })
    }
    else {
      html2canvas(input, {
        height: input.scrollHeight, // Set the height to the scrollHeight of the content
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${date}.pdf`); 
      });
    }
  }
  
  
  
  console.log(tasks[0]);
  return (
    <>
    
    <Table className="" ref={targetRef} id="table">
    {tasks[0]==='error' ? '' : <div className="task head hide">Results</div>}
      
    {tasks[0]==='error' ? (<h2>No Records found</h2>) :
    <Thead>
      
      <Tr className="justify-content-center">
        <Th className=" task head ps-3"><h5>SOW</h5></Th>
        <Th className=" task head"><h5>Customer</h5></Th>
        <Th className=" task head"><h5>Status</h5></Th>
        <Th className=" task head"><h5>Milestones</h5></Th>
        <Th className=" task head"><h5>Due Date</h5></Th>
      </Tr>
    </Thead>}
         {tasks[0]==='error' ? '' : tasks.map(
            (task, i) => ( <Task key={i} task={task.replace(/[[\]]/g, '')}></Task> ) 
        )}
    </Table>
    {tasks[0]==='error' ? '' : <div className="d-flex justify-content-between"><div></div><button className='btn ml-auto' onClick={generatePDF}>Download PDF</button></div>}
    </>
  )
}

export default Tasks 