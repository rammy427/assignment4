import { Link } from "react-router-dom";
import Skills from "../components/Skills";
import { isLoggedIn } from "../services/api";

function EditSkills()
{
    // Check if the user is logged in. If not, stop immediately.
    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Edit Skills</h1>
        <Link className="col-2 mx-auto" to="/add-skill">
            <button className="btn btn-success w-100 mb-3">Add Skill</button>
        </Link>
        <Skills isEditing />
        </>
    )
}

export default EditSkills;