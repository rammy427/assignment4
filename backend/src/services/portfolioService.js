const {getUserById} = require("../models/userModel");
const {getSkillsByUser} = require("../models/skillModel");
const {getExperiencesByUser} = require("../models/experienceModel");
const {getEducationByUser} = require("../models/educationModel");

exports.getPortfolioByUser = async (userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const skills = await getSkillsByUser(userId);
        const exps = await getExperiencesByUser(userId);
        const ed = await getEducationByUser(userId);
        res.status(200).json({
            "user_info": user,
            "skills": skills,
            "experiences": exps,
            "education": ed
        })
    }
    catch (error)
    {
        res.status(500).json({message: "Error finding portfolio for the user", error: error.message});
    }
}