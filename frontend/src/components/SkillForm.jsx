import { useEffect, useState } from "react";
import { createItem, editItem, getItemById } from "../services/api";
import { ALPHANUMERIC_REGEX, USER_ID } from "../constants/constants";
import { useNavigate } from "react-router-dom";

function SkillForm({id = -1})
{
    const navigate = useNavigate();
    const isEditing = () => { return id != -1 };

    const [data, setData] = useState(
        {
            name: "",
            proficiency: ""
        }
    )

    const [error, setError] = useState(
        {
            name: "",
            proficiency: ""
        }
    );

    const getSkill = () =>
    {
        if (isEditing())
            getItemById(`skills/${USER_ID}`, id)
            .then(result => setData(
                {
                    name: result.data.Name,
                    proficiency: result.data.Proficiency
                }
            ))
            .catch(error => console.log(error));
    }

    useEffect(getSkill, []);

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

        // If no errors occurred, send request with the API.
        if (isEditing())
        {
            // We are editing the current skill. Send PUT request.
            editItem(`skills/${USER_ID}`, id, data)
            .then(() =>
            {
                alert("Saved changes to skill successfully!");
                navigate("/edit-skills");
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
            // We are adding a new skill. Send POST request.
            createItem(`skills/${USER_ID}`, data)
            .then(() =>
            {
                alert("Added skill successfully!");
                navigate("/edit-skills");
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
                    <label htmlFor="name">Name <span className="text-danger">*</span></label>
                    <br />
                    <input id="name" name="name" type="text" className="form-control bg-white" value={data.name} maxLength={100}
                    onChange={e => handleOnChange(e.target.name, e.target.value, ALPHANUMERIC_REGEX)} required />
                    {
                        error.name && <span className="text-danger pb-2">{error.name}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="proficiency">Proficiency</label>
                    <br />
                    <input id="proficiency" name="proficiency" type="text" className="form-control bg-white" value={data.proficiency} maxLength={50}
                    onChange={e => handleOnChange(e.target.name, e.target.value, ALPHANUMERIC_REGEX)} />
                    {
                        error.proficiency && <span className="text-danger pb-2">{error.proficiency}</span>
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

export default SkillForm;