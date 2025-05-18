const {getExperienceById, getExperiencesByUser, addExperienceToUser, updateExperience, deleteExperience} = require("../models/experienceModel");
const { getUserById } = require("../models/userModel");

exports.getExperiencesByUser = async (userId, res) =>
    {
        try
        {
            const user = await getUserById(userId);
            if (!user)
                res.status(404).json({message: "User not found"});
            else
            {
                const exps = await getExperiencesByUser(userId);
                res.status(200).json(exps);
            }
        }
        catch (error)
        {
            res.status(500).json({message: "Error fetching experiences for user", error: error.message});
        }
    }

exports.getExperienceById = async (id, userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const exp = await getExperienceById(id);
        if (!user) return res.status(404).json({message: "User not found"});
        else if (!exp) return res.status(404).json({message: "Experience not found"});
        else return res.status(200).json(exp);
    }
    catch (error)
    {
        res.status(500).json({message: "Error fetching experience", error: error.message});
    }
}

exports.addExperienceToUser = async (userId, data, res) =>
{
    try
    {
        const user = await getUserById(userId);
        if (!user)
            res.status(404).json({message: "User not found"});
        else
        {
            const id = await addExperienceToUser(userId, data);
            res.status(201).json({id: id});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error adding experience", error: error.message});
    }
}

exports.updateExperience = async (id, userId, data, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const exp = await getExperienceById(id);
        if (!user)
            res.status(404).json({message: "User not found"});
        else if (!exp)
            res.status(404).json({message: "Experience not found"});
        else
        {
            await updateExperience(id, userId, data);
            res.status(200).json({message: `Experience ${id} for user ${userId} was successfully updated!`});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error updating experience", error: error.message});
    }
}

exports.deleteExperience = async (id, userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const exp = await getExperienceById(id);
        if (!user)
            res.status(404).json({message: "User not found"});
        else if (!exp)
            res.status(404).json({message: "Experience not found"});
        else
        {
            await deleteExperience(id, userId);
            res.status(200).json({message: `Experience ${id} for user ${userId} was successfully removed!`});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error deleting experience", error: error.message});
    }
}