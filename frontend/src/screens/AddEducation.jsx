import EducationForm from "../components/EducationForm";
import { isLoggedIn } from "../services/api";

function AddEducation()
{
    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Add Education</h1>
        <EducationForm />
        </>
    )
}

export default AddEducation;