const {getSkillById, getSkillsByUser, addSkillToUser, updateSkill, deleteSkill} = require("../models/skillModel");
const {getUserById} = require("../models/userModel");

exports.getSkillById = async (id, userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const skill = await getSkillById(id);
        if (!user) return res.status(404).json({message: "User not found"});
        else if (!skill) return res.status(404).json({message: "Skill not found"});
        else return res.status(200).json(skill);
    }
    catch (error)
    {
        res.status(500).json({message: "Error fetching skill", error: error.message});
    }
}

exports.getSkillsByUser = async (userId, res) =>
    {
        try
        {
            const user = await getUserById(userId);
            if (!user)
                res.status(404).json({message: "User not found"});
            else
            {
                const skills = await getSkillsByUser(userId);
                res.status(200).json(skills);
            }
        }
        catch (error)
        {
            res.status(500).json({message: "Error fetching skills for user", error: error.message})
        }
    }

exports.addSkillToUser = async (userId, data, res) =>
{
    try
    {
        const user = await getUserById(userId);
        if (!user)
            res.status(404).json({message: "User not found"});
        else
        {
            const id = await addSkillToUser(userId, data);
            res.status(201).json({id: id});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error adding skill", error: error.message});
    }
}

exports.updateSkill = async (id, userId, data, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const skill = await getSkillById(id);
        if (!user)
            res.status(404).json({message: "User not found"});
        else if (!skill)
            res.status(404).json({message: "Skill not found"});
        else
        {
            await updateSkill(id, userId, data);
            res.status(200).json({message: `Skill ${id} for user ${userId} was successfully updated!`});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error updating skill", error: error.message});
    }
}

exports.deleteSkill = async (id, userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const skill = await getSkillById(id);
        if (!user)
            res.status(404).json({message: "User not found"});
        else if (!skill)
            res.status(404).json({message: "Skill not found"});
        else
        {
            await deleteSkill(id, userId);
            res.status(200).json({message: `Skill ${id} for user ${userId} was successfully removed!`});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error deleting skill", error: error.message});
    }
}