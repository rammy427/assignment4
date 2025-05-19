import { Link } from "react-router-dom";
import { USER_ID } from "../constants/constants";
import { deleteItem, isLoggedIn } from "../services/api";

function ExperienceTable({experiences})
{
    const removeExperience = (id) =>
    {
        deleteItem(`experience/${USER_ID}`, id)
        .then(() => alert("Experience deleted successfully!"))
        .catch(error => console.log(error));
    }

    return (
        <>
        {
            isLoggedIn() &&
            <Link className="col-2 mx-auto" to="/add-experience">
                <button className="btn btn-success w-25 mb-3">Add Experience</button>
            </Link>
        }
        <table className="table mx-auto">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Company</th>
                    <th scope="col">Description</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    {
                        isLoggedIn() && <th scope="col">Options</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    // Iterate through all the experiences.
                    experiences.map((exp, index) =>
                        <tr key={index}>
                            <th scope="row">{exp.Id}</th>
                            <td>{exp.JobTitle}</td>
                            <td>{exp.Company}</td>
                            <td>{exp.Description}</td>
                            <td>{(exp.StartDate == null) ? "" : exp.StartDate.slice(0, 10)}</td>
                            <td>{(exp.EndDate == null) ? "" : exp.EndDate.slice(0, 10)}</td>
                            {
                                isLoggedIn() &&
                                <td>
                                    <Link to={`/edit-experience/${exp.Id}`}>
                                        <button className="btn btn-primary text-white">Edit</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => removeExperience(exp.Id)}>Delete</button>
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

export default ExperienceTable;