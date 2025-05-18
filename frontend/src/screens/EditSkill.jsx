import { useParams } from "react-router-dom";
import SkillForm from "../components/SkillForm";
import { isLoggedIn } from "../services/api";

function EditSkill()
{
    const {id} = useParams();

    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Edit Skill {id}</h1>
        <SkillForm id={id} />
        </>
    );
}

export default EditSkill;