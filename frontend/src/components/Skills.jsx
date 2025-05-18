import { useEffect, useState } from "react";
import { getItemById } from "../services/api";
import { USER_ID } from "../constants/constants";
import DeleteModal from "./DeleteModal";


function Skills({isEditing = false})
{
    const [skills, setSkills] = useState([]);

    const getSkills = () =>
    {
        getItemById("skills", USER_ID)
        .then(result => setSkills(result.data))
        .catch(error => console.log(error));
    }

    useEffect(() => getSkills(), [skills]);

    return (
        <>
        <table className="table w-50 mx-auto">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Proficiency</th>
                    {
                        isEditing && <th scope="col">Options</th>
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
                                isEditing &&
                                <td>
                                    <Link to={`/edit-skill/${skill.Id}`}>
                                        <button className="btn btn-primary text-white">Edit</button>
                                    </Link>
                                    <DeleteModal type="skills" id={skill.Id} />
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

export default Skills;