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
        <Skills isEditing />
        </>
    )
}

export default EditSkills;