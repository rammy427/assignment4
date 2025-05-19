import { useEffect, useState } from "react";
import { deleteItem, getItemById, isLoggedIn } from "../services/api";
import { USER_ID } from "../constants/constants";
import { Link } from "react-router-dom";

function SkillTable()
{
    const [skills, setSkills] = useState([]);

    const getSkills = () =>
    {
        getItemById("skills", USER_ID)
        .then(result => setSkills(result.data))
        .catch(error => console.log(error));
    }

    useEffect(() => getSkills(), [skills]);

    const removeSkill = (id) =>
    {
        deleteItem(`skills/${USER_ID}`, id)
        .then(() => alert("Skill deleted successfully!"))
        .catch(error => console.log(error));
    }

    return (
        <>
        {
            isLoggedIn() &&
            <Link className="col-2 mx-auto" to="/add-skill">
                <button className="btn btn-success w-100 mb-3"><i className="bi bi-plus-lg mx-1"></i>Add Skill</button>
            </Link>
        }
        <table className="table w-50 mx-auto">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Proficiency</th>
                    {
                        isLoggedIn() && <th scope="col">Options</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    // Iterate through all the skills.
                    skills.map((skill, index) =>
                        <tr key={index}>
                            <th scope="row">{skill.Id}</th>
                            <td>{skill.Name}</td>
                            <td>{skill.Proficiency}</td>
                            {
                                isLoggedIn() &&
                                <td>
                                    <Link className="mx-1" to={`/edit-skill/${skill.Id}`}>
                                        <button className="btn btn-primary text-white"><i className="bi bi-pencil-square"></i></button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => removeSkill(skill.Id)}><i className="bi bi-trash3-fill"></i></button>
                                </td>
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    );
}

export default SkillTable;