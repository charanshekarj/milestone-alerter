import { useState } from "react"
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";  

const AddTask = ({ onAdd }) => {

    const [day, setDay] = useState(new Date());

    const onSubmit = (e) => {
        //to prevent submitting to another page
        e.preventDefault();

        onAdd(day);

        // setText('');
        // setDay('');
        // setReminder(false);
    }

  return (
    <form action="" className="add-form" onSubmit={onSubmit}>
        {/* <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder="Add Task" 
            value={text} onChange={(e) => {
                setText(e.target.value);
                setError('');
            }} />
            <p style={{color: 'red'}}>{error}</p>
        </div> */}
        <div className="form-control">
            <label>Month & Year</label>
            {/* <DatePicker selected={day} onChange={(date) => setDay(date)} />   */}
            <DatePicker
                hintText="Choose Date"
                container="inline"
                inputStyle={{ textAlign: 'center' }}
                selected={day}
                onChange={(day) => {
                    setDay(day)
                    console.log(day.getMonth(),day.getFullYear());
                }}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                />
        </div>
        {/* <div className="form-control form-control-check" style={{justifyContent:"flex"}}>
            <label>Set Reminder</label>
            <input type="checkbox" 
            checked={reminder}
            value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div> */}

        <input className="btn btn-block" type="submit" value="Search" />
    </form>
  )
}

export default AddTask