import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem, editItem, getItemById } from "../services/api";
import { USER_ID } from "../constants/constants";

function ExperienceForm({id = -1})
{
    const navigate = useNavigate();
    const isEditing = () => { return id != -1 };

    const [data, setData] = useState(
        {
            jobTitle: "",
            company: "",
            description: "",
            startDate: "",
            endDate: "",
            isProject: false
        }
    );

    const [error, setError] = useState(
        {
            jobTitle: "",
            company: "",
            description: "",
            startDate: "",
            endDate: ""
        }
    );

    const getExperience = () =>
    {
        if (isEditing())
            getItemById(`experience/${USER_ID}`, id)
            .then(result => setData(
                {
                    jobTitle: result.data.JobTitle,
                    company: result.data.Company,
                    description: result.data.Description,
                    startDate: (result.data.StartDate == null) ? "" : result.data.StartDate.slice(0, 10),
                    endDate: (result.data.EndDate == null) ? "" : result.data.EndDate.slice(0, 10),
                    isProject: result.data.IsProject
                }
            ))
            .catch(error => console.log(error));
    }

    useEffect(getExperience, []);

    const handleOnChange = (name, value, regex = /.*/) =>
    {
        setError({...error, [name]: !regex.test(value) ? "Incorrect format!" : ""});
        setData({...data, [name]: value});
    }

    const handleSubmit = event =>
    {
        event.preventDefault();
        console.log("Data submitted:", data);

        // Check for formatting errors.
        for (const key in error)
            if (error.hasOwnProperty(key))
            {
                const value = error[key];
                console.log(value);
                // Exit the function if we found an error.
                if (value) return;
            }
        
        // Create new payload that corrects null inputs.
        const payload =
        {
            jobTitle: data.jobTitle,
            company: (data.company == "") ? null : data.company,
            description: data.description,
            startDate: (data.startDate == "") ? null : data.startDate,
            endDate: (data.endDate == "") ? null : data.endDate,
            isProject: data.isProject
        }

        // If no errors occurred, send request with the API.
        if (isEditing())
        {
            // We are editing the current experience. Send PUT request.
            editItem(`experience/${USER_ID}`, id, payload)
            .then(() =>
            {
                alert("Saved changes to experience successfully!");
                navigate("/experience");
            })
            .catch(error =>
            {
                alert("Invalid fields!");
                setError({jobTitle: "", company: "", description: "", startDate: "", endDate: ""});
                console.log(error);
            });
        }
        else
        {
            // We are adding a new experience. Send POST request.
            createItem(`experience/${USER_ID}`, payload)
            .then(() =>
            {
                alert("Added experience successfully!");
                navigate("/experience");
            })
            .catch(error =>
            {
                alert("Invalid fields!");
                setError({jobTitle: "", company: "", description: "", startDate: "", endDate: ""});
                console.log(error);
            });
        }
    }
    
    return (
        <>
        <form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <label htmlFor="isProject">Is Project</label>
                    <br />
                    <input id="isProject" name="isProject" type="text" className="form-control bg-white" value={data.isProject} maxLength={5}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.isProject && <span className="text-danger pb-2">{error.isProject}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="jobTitle">Title <span className="text-danger">*</span></label>
                    <br />
                    <input id="jobTitle" name="jobTitle" type="text" className="form-control bg-white" value={data.jobTitle} maxLength={100}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} required />
                    {
                        error.jobTitle && <span className="text-danger pb-2">{error.jobTitle}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="company">Company</label>
                    <br />
                    <input id="company" name="company" type="text" className="form-control bg-white" value={data.company} maxLength={100}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.company && <span className="text-danger pb-2">{error.company}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea id="description" name="description" className="form-control bg-white" value={data.description} cols={10}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.description && <span className="text-danger pb-2">{error.description}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="startDate">Start Date</label>
                    <br />
                    <input id="startDate" name="startDate" type="date" className="form-control bg-white" value={data.startDate}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.startDate && <span className="text-danger pb-2">{error.startDate}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="endDate">End Date</label>
                    <br />
                    <input id="endDate" name="endDate" type="date" className="form-control bg-white" value={data.endDate}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.endDate && <span className="text-danger pb-2">{error.endDate}</span>
                    }
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-6">
                    <button type="submit" className="bg-secondary text-dark rounded w-100">Submit</button>
                </div>
            </div>
        </form>
        </>
    );
}

export default ExperienceForm;