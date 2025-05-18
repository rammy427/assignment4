const {getDegrees, getDegreeById, getEducationByUser, addEducationToUser, getEducationById, updateEducation, deleteEducation} = require("../models/educationModel");
const {getUserById} = require("../models/userModel");

exports.getDegrees = async (res) =>
{
    try
    {
        const degrees = await getDegrees();
        res.status(200).json(degrees);
    }
    catch (error)
    {
        res.status(500).json({message: "degrees_not_found", error: error.message});
    }
}

exports.getEducationById = async (id, userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const education = await getEducationById(id);
        if (!user) return res.status(404).json({message: "User not found"});
        else if (!education) return res.status(404).json({message: "Education not found"});
        else return res.status(200).json(education);
    }
    catch (error)
    {
        res.status(500).json({message: "Error fetching education", error: error.message});
    }
}

exports.getEducationByUser = async (userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        if (!user)
            res.status(404).json({message: "User not found"});
        else
        {
            const education = await getEducationByUser(userId);
            res.status(200).json(education);
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error fetching education for user", error: error.message});
    }
}

exports.addEducationToUser = async (userId, data, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const degree = await getDegreeById(data.degreeId);
        if (!user)
            res.status(404).json({message: "User not found"});
        else if (!degree)
            res.status(404).json({message: "Degree not found"});
        else
        {
            const id = await addEducationToUser(userId, data);
            res.status(201).json({id: id});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error adding education", error: error.message});
    }
}

exports.updateEducation = async (id, userId, data, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const ed = await getEducationById(id);
        const degree = await getDegreeById(data.degreeId);
        if (!user)
            res.status(404).json({message: `User ${id} not found`});
        else if (!ed)
            res.status(404).json({message: `Education ${id} not found`});
        else if (!degree)
            res.status(404).json({message: `Degree ${id} not found`});
        else
        {
            await updateEducation(id, userId, data);
            res.status(200).json({message: `Education ${id} for user ${userId} was successfully updated!`});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error updating education", error: error.message});
    }
}
    
exports.deleteEducation = async (id, userId, res) =>
{
    try
    {
        const user = await getUserById(userId);
        const ed = await getEducationById(id);
        if (!user)
            res.status(404).json({message: "User not found"});
        else if (!ed)
            res.status(404).json({message: "Education not found"});
        else
        {
            await deleteEducation(id, userId);
            res.status(200).json({message: `Education ${id} for user ${userId} was successfully removed!`});
        }
    }
    catch (error)
    {
        res.status(500).json({message: "Error deleting education", error: error.message});
    }
}