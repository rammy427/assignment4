import { useEffect, useState } from "react";
import { getItemById } from "../services/api";
import { USER_ID } from "../constants/constants";
import { Link } from "react-router-dom";

function EducationTable({isEditing = false})
{
    const [education, setEducation] = useState([]);

    const getEducation = () =>
    {
        getItemById("education", USER_ID)
        .then(result => setEducation(result.data))
        .catch(error => console.log(error));
    }

    useEffect(getEducation, []);

    return (
        <>
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
                        isEditing && <th scope="col">Options</th>
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
                            <td>{ed.StartDate}</td>
                            <td>{ed.EndDate}</td>
                            {
                                isEditing &&
                                <td>
                                    <Link to={`/edit-education/${ed.Id}`}>
                                        <button className="btn btn-primary text-white">Edit</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => removeEducation(ed.Id)}>Delete</button>
                                </td>
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export default EducationTable;