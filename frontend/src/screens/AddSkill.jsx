import SkillForm from "../components/SkillForm";
import { isLoggedIn } from "../services/api";

function AddSkill()
{
    if (!isLoggedIn())
        return <h1>You must be logged in.</h1>;

    return (
        <>
        <h1>Add Skill</h1>
        <SkillForm />
        </>
    );
}

export default AddSkill;