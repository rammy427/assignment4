import { useEffect, useState } from "react";
import { getItemById } from "../services/api";
import { USER_ID } from "../constants/constants";

function EducationTable()
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
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}

export default EducationTable;