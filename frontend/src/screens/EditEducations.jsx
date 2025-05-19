import { Link } from "react-router-dom";
import { isLoggedIn } from "../services/api";
import EducationTable from "../components/EducationTable";

function EditEducations()
{
    // Check if the user is logged in. If not, stop immediately.
    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Edit Education</h1>
        <Link className="col-2 mx-auto" to="/add-education">
            <button className="btn btn-success w-100 mb-3">Add Education</button>
        </Link>
        <EducationTable isEditing />
        </>
    );
}

export default EditEducations;