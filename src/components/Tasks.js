import Task from "./Task"

const Tasks = ({ tasks }) => {

  return (
    <>
    {tasks[0]=='error' ? (<h2>No Records found</h2>) :
      <div className="row d-flex justify-content-center">
        <div className="col-1 task head"><h5>SOW</h5></div>
        <div className="col-2 task head"><h5>Customer</h5></div>
        <div className="col-2 task head"><h5>Status</h5></div>
        <div className="col-4 task head"><h5>Milestones</h5></div>
        <div className="col-2 task head"><h5>Due Date</h5></div>
      </div>}
         {tasks[0]=='error' ? '' : tasks.map(
            (task, i) => ( <Task key={i} task={task.replace(/[\[\]]/g, '')}></Task> ) 
        )}
    </>
  )
}

export default Tasks 