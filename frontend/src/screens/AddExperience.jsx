import ExperienceForm from "../components/ExperienceForm";
import { isLoggedIn } from "../services/api";

function AddExperience()
{
    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Add Experience</h1>
        <ExperienceForm />
        </>
    );
}

export default AddExperience;