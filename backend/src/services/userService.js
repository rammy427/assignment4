const {getUserById, createUser, updateUser, deleteUser} = require("../models/userModel");

exports.getUserById = async (id, res) =>
{
    try
    {
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
}

exports.createUser = async (data, res) =>
{
    try
    {
        const id = await createUser(data);
        res.status(201).json({id: id});
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
}
exports.updateUser = async (id, data, res) =>
{
    try
    {
        const user = await getUserById(id);
        if (!user)
            res.status(404).json({message: "User not found"});
        else
        {
            await updateUser(id, data);
            res.status(200).json({message: `User ${id} was successfully updated!`});
        }
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

exports.deleteUser = async (id, res) =>
{
    try
    {
        const user = await getUserById(id);
        if (!user)
            res.status(200).json({message: `User ${id} not found. No need to remove`});
        await deleteUser(id);
        res.status(200).json({message: `User ${id} was successfully removed!`});
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}