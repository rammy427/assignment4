import { useState } from "react";
import "../App.css";

function Checklist() {
    const [count, setCount] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");

    // Function called every time a box is checked to complete task.
    const toggleCompletion = (src_index) => {
        let new_tasks = tasks.map((item, index) => {
            if (index === src_index)
                item.is_completed = !item.is_completed;
            return item;
        });
        setTasks(new_tasks);
    }

    // Update form dynamically.
    const updateForm = (value) => {
        setDescription(value);
    }

    // Function to add task when user submits form.
    const addTask = (event) => {
        event.preventDefault();
        if (description !== "")
        {
            setTasks([...tasks, {id: count, is_completed: false, description: description}]);
            setCount(count + 1);
            setDescription("");
        }
    }

    // Function to remove task when user presses the trash button.
    const removeTask = (id) => {
        let new_tasks = tasks.filter(task => task.id != id);
        setTasks(new_tasks);
    }

    return (
        <>
            <h1>Checklist</h1>
            {/* Task addition input. */}
            <div className="container">
                <form onSubmit={addTask} className="input-group col-6 mx-auto mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Add Task</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={description} onChange={(e) => updateForm(e.target.value)}></input>
                </form>
            </div>

            <div className="container col-md-6 mx-auto mb-5">
            {
                // Render all the tasks.
                tasks.map((task, index) => (
                    <div key={task.id} className="form-check row">
                        <input className="form-check-input col-1" type="checkbox" value="" id={index} onClick={() => toggleCompletion(index)}></input>
                        <label className={(task.is_completed ? "strikethrough " : "") + "form-check-label col-10"} htmlFor={index}>
                            {task.description}
                        </label>
                        {/* Removal button. */}
                        <button onClick={() => removeTask(task.id)} className="btn btn-danger col-1">
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                ))
            }
            </div>
        </>
    );
}

export default Checklist;