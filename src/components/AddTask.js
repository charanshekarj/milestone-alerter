import { useState, useRef } from "react"
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";  

const AddTask = ({ onAdd }) => {

    const inputRef = useRef(null);
    const [day, setDay] = useState(new Date());
    const [lines, setLines] = useState([]);

 const clearRef = () => {
    inputRef.current.value = '';
    setLines([]);
 }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        setLines(event.target.result.split('\n'))
        console.log(lines);
    };

    reader.readAsText(file);
  }

    const onSubmit = (e) => {
        //to prevent submitting to another page
        e.preventDefault();

        onAdd(day, lines);

        // setText('');
        // setDay('');
        // setReminder(false);
    }
  return (
    <form action="" className="add-form" onSubmit={onSubmit}>
        <div className="row">
        <div className="form-control col">
            <label>Month & Year</label>
            <DatePicker
                className=""
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
        <div className="form-control col" style={{justifyContent:"flex"}}>
            <label>Upload File</label>
            <div className="row">
            <input className="col" type="file" accept="text/csv" onChange={handleFileInputChange} ref={inputRef}/>
            {lines.length>0 && <div className="col-3 clear p-0"><button className="btn p-1" onClick={clearRef}>Clear File</button></div>}
            </div>
        </div>
        </div>
        

        <input className="btn btn-block" type="submit" value="Search" />
    </form>
  )
}

export default AddTask