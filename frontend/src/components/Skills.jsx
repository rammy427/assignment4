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
        <h2>My Skills</h2>
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
        </div>
        </>
    );
}

export default Skills;