import { useParams } from "react-router-dom";
import { isLoggedIn } from "../services/api";
import EducationForm from "../components/EducationForm";

function EditEducation()
{
    const {id} = useParams();

    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Edit Education {id}</h1>
        <EducationForm id={id} />
        </>
    );
}

export default EditEducation;