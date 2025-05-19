import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem, editItem, getItemById, getItems } from "../services/api";
import { USER_ID } from "../constants/constants";

function EducationForm({id = -1})
{
    const navigate = useNavigate();
    const isEditing = () => { return id != -1 };
    const [degrees, setDegrees] = useState([]);

    const [data, setData] = useState(
        {
            institution: "",
            degreeId: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: ""
        }
    );

    const [error, setError] = useState(
        {
            institution: "",
            degreeId: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: ""
        }
    );

    const getEducation = () =>
    {
        if (isEditing())
            getItemById(`education/${USER_ID}`, id)
            .then(result => setData(
                {
                    institution: result.data.Institution,
                    degreeId: result.data.DegreeId,
                    fieldOfStudy: result.data.FieldOfStudy,
                    startDate: result.data.StartDate,
                    endDate: result.data.EndDate
                }
            ))
            .catch(error => console.log(error));
    }

    const getDegrees = () =>
    {
        getItems("education/degrees")
        .then(result => setDegrees(result.data))
        .catch(error => console.log(error));
    }
    
    useEffect(() =>
    {
        getEducation();
        getDegrees();
    }, []);

    const handleOnChange = (name, value, regex = /.*/) =>
    {
        setError({...error, [name]: !regex.test(value) ? "Incorrect format!" : ""});
        setData({...data, [name]: value});
    }

    const handleSubmit = event =>
    {
        event.preventDefault();
        console.log("Data submitted:", data);

        // If degree ID is None, set its value to null.
        if (data.degreeId === "")
            data.degreeId = null;

        // Check for formatting errors.
        for (const key in error)
            if (error.hasOwnProperty(key))
            {
                const value = error[key];
                console.log(value);
                // Exit the function if we found an error.
                if (value) return;
            }

        // If no errors occurred, send request with the API.
        if (isEditing())
        {
            // We are editing the current education. Send PUT request.
            editItem(`education/${USER_ID}`, id, data)
            .then(() =>
            {
                alert("Saved changes to education successfully!");
                navigate("/edit-educations");
            })
            .catch(error =>
            {
                alert("Invalid fields!");
                setError({name: "", proficiency: ""});
                console.log(error);
            });
        }
        else
        {
            // We are adding a new education. Send POST request.
            createItem(`education/${USER_ID}`, data)
            .then(() =>
            {
                alert("Added education successfully!");
                navigate("/edit-educations");
            })
            .catch(error =>
            {
                alert("Invalid fields!");
                setError({name: "", proficiency: ""});
                console.log(error);
            });
        }
    }

    return (
        <>
        <form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <label htmlFor="institution">Institution <span className="text-danger">*</span></label>
                    <br />
                    <input id="institution" name="institution" type="text" className="form-control bg-white" value={data.institution} maxLength={150}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} required />
                    {
                        error.institution && <span className="text-danger pb-2">{error.institution}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="degreeId">Degree ID</label>
                    <br />
                    <select id="degreeId" name="degreeId" className="form-select" value={data.degreeId}
                    onChange={e => handleOnChange(e.target.name, e.target.value)}>
                        <option value={null}>None</option>
                        {
                            // Iterate through all possible degrees.
                            degrees.map(degree => <option key={degree.Id} value={degree.Id}>{degree.Id} - {degree.Name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="fieldOfStudy">Field of Study</label>
                    <br />
                    <input id="fieldOfStudy" name="fieldOfStudy" type="text" className="form-control bg-white" value={data.fieldOfStudy} maxLength={150}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.fieldOfStudy && <span className="text-danger pb-2">{error.degreeId}</span>
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

export default EducationForm;