import { useEffect, useState } from "react";
import { getItemById } from "../services/api";
import { USER_ID } from "../constants/constants";


function Skills()
{
    const [skills, setSkills] = useState([]);

    const getSkills = () =>
    {
        getItemById("skills", USER_ID)
        .then(result => setSkills(result.data))
        .catch(error => console.log(error));
    }

    useEffect(() => getSkills(), []);

    return (
        <>
        {/* <h2>My Skills</h2>
        <div className="container bg-secondary p-2 rounded-3 text-center mb-5">
            {
                // Iterate through all the skills.
                skills.map(
                    (skill, index) => (
                        <div key={index} className="row">
                            <div className="col-6">{skill.Name}</div>
                            <div className="col-6">{skill.Proficiency}</div>
                        </div>
                    )
                )
            }
        </div> */}

        <table className="table w-50 mx-auto">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Proficiency</th>
                </tr>
            </thead>
            <tbody>
                {
                    // Iterate through all the skills.
                    skills.map((skill, index) =>
                        <tr>
                            <th scope="row">{skill.Id}</th>
                            <td>{skill.Name}</td>
                            <td>{skill.Proficiency}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    );
}

export default Skills;