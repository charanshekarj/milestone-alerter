import Task from "./Task"

const Tasks = ({ tasks }) => {

  
  console.log(tasks[0]);
  return (
    <>
    <table className="table-responsive ">
    {tasks[0]=='error' ? (<h2>No Records found</h2>) :
      <tr className="d-flex justify-content-center">
        <th className="col-1 task head ps-3"><h5>SOW</h5></th>
        <th className="col-2 task head"><h5>Customer</h5></th>
        <th className="col-2 task head"><h5>Status</h5></th>
        <th className="col-4 task head"><h5>Milestones</h5></th>
        <th className="col-2 task head"><h5>Due Date</h5></th>
      </tr>}
         {tasks[0]=='error' ? '' : tasks.map(
            (task, i) => ( <Task key={i} task={task.replace(/[\[\]]/g, '')}></Task> ) 
        )}
    </table>
    </>
  )
}

export default Tasks 