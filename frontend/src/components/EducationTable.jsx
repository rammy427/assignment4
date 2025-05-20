import { useEffect, useState } from "react";
import { deleteItem, getItemById, isLoggedIn } from "../services/api";
import { USER_ID } from "../constants/constants";
import { Link } from "react-router-dom";

function EducationTable()
{
    const [education, setEducation] = useState([]);

    const getEducation = () =>
    {
        getItemById("education", USER_ID)
        .then(result => setEducation(result.data))
        .catch(error => console.log(error));
    }

    useEffect(getEducation, [education]);

    const removeEducation = (id) =>
    {
        deleteItem(`education/${USER_ID}`, id)
        .then(() => alert("Education deleted successfully!"))
        .catch(error => console.log(error));
    }

    return (
        <>
        {
            isLoggedIn() &&
            <Link className="mx-auto" to="/add-education">
                <button className="btn btn-success col-12 col-md-5 mb-3"><i className="bi bi-plus-lg mx-1"></i>Add Education</button>
            </Link>
        }
        <div className="table-responsive">
            <table className="table mx-auto">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Institution</th>
                        <th scope="col">Degree</th>
                        <th scope="col">Field of Study</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        {
                            isLoggedIn() && <th scope="col">Options</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        // Iterate through all education.
                        education.map((ed, index) =>
                            <tr key={index}>
                                <th scope="row">{ed.Id}</th>
                                <td>{ed.Institution}</td>
                                <td>{ed.DegreeId}</td>
                                <td>{ed.FieldOfStudy}</td>
                                <td>{ed.StartDate.slice(0, 10)}</td>
                                <td>{ed.EndDate.slice(0, 10)}</td>
                                {
                                    isLoggedIn() &&
                                    <td>
                                        <Link className="mx-1" to={`/edit-education/${ed.Id}`}>
                                            <button className="btn btn-primary text-white"><i className="bi bi-pencil-square"></i></button>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => removeEducation(ed.Id)}><i className="bi bi-trash3-fill"></i></button>
                                    </td>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default EducationTable;