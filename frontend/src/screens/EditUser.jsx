import { useEffect, useState } from "react";
import { editItem, getItemById, isLoggedIn } from "../services/api";
import { EMAIL_REGEX, PASSWORD_REGEX, USER_ID } from "../constants/constants";
import { useNavigate } from "react-router-dom";

function EditUser()
{
    const navigate = useNavigate();

    // Check if user is logged in. If not logged in, stop immediately.    
    if (!isLoggedIn())
        return (<h1>You must be logged in.</h1>);

    const [data, setData] = useState(
        {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "",
            description: ""
        }
    );

    const [error, setError] = useState(
        {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            role: "",
            description: ""
        }
    );

    const getUser = () =>
    {
        getItemById("users", USER_ID)
        .then(result => setData(
            {
                email: result.data.Email,
                password: result.data.Password,
                firstName: result.data.FirstName,
                lastName: result.data.LastName,
                role: result.data.Role,
                description: result.data.Description
            }
        ))
        .catch(error => console.log(error));
    }

    useEffect(getUser, []);

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
        // PUT request with "users" resource.
        editItem("users", USER_ID, data)
        .then(() =>
        {
            alert("Successfully edited user info!");
            navigate("/");
        })
        .catch(error =>
        {
            alert("Invalid fields!");
            setError({email: "", password: "", firstName: "", lastName: "", role: "", description: ""});
            console.log(error);
        });
    }

    return (
        <>
        <h1>Edit User</h1>
        <form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                    <br />
                    <input id="email" name="email" type="email" className="form-control bg-white" value={data.email} maxLength={320}
                    onChange={e => handleOnChange(e.target.name, e.target.value, EMAIL_REGEX)} required />
                    {
                        error.email && <span className="text-danger pb-2">{error.email}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="password">Password <span className="text-danger">*</span></label>
                    <br />
                    <input id="password" name="password" type="password" className="form-control bg-white" value={data.password} maxLength={250}
                    onChange={e => handleOnChange(e.target.name, e.target.value, PASSWORD_REGEX)} />
                    {
                        error.password && <span className="text-danger pb-2">{error.password}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="firstName">First Name <span className="text-danger">*</span></label>
                    <br />
                    <input id="firstName" name="firstName" type="text" className="form-control bg-white" value={data.firstName} maxLength={50}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} required />
                    {
                        error.firstName && <span className="text-danger pb-2">{error.firstName}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
                    <br />
                    <input id="lastName" name="lastName" type="text" className="form-control bg-white" value={data.lastName} maxLength={150}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} required />
                    {
                        error.lastName && <span className="text-danger pb-2">{error.lastName}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="role">Role</label>
                    <br />
                    <input id="role" name="role" type="text" className="form-control bg-white" value={data.role} maxLength={15}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.role && <span className="text-danger pb-2">{error.role}</span>
                    }
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea id="description" name="description" className="form-control bg-white" value={data.description} maxLength={500} rows={5}
                    onChange={e => handleOnChange(e.target.name, e.target.value)} />
                    {
                        error.description && <span className="text-danger pb-2">{error.description}</span>
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

export default EditUser;