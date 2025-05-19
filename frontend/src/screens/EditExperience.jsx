import { useParams } from "react-router-dom";
import { isLoggedIn } from "../services/api";
import ExperienceForm from "../components/ExperienceForm";

function EditExperience()
{
    const {id} = useParams();

    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Edit Experience {id}</h1>
        <ExperienceForm id={id} />
        </>
    )
}

export default EditExperience;