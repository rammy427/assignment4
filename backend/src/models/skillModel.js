const {connectDB, sql} = require("../config/db");

async function getSkills()
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Skill]');
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getSkillById(id)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM [Skill] WHERE Id = @id");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getSkillsByUser(userId)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('userid', sql.Int, userId)
            .query("SELECT * FROM [Skill] WHERE UserId = @userid");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function addSkillToUser(userId, data)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('userid', sql.Int, userId)
            .input('name', sql.VarChar, data.name)
            .input('proficiency', sql.VarChar, data.proficiency)
            .query(`
                INSERT INTO [Skill] (UserId, Name, Proficiency)
                VALUES (@userid, @name, @proficiency);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function updateSkill(id, userId, data)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .input('userid', sql.Int, userId)
            .input('name', sql.VarChar, data.name)
            .input('proficiency', sql.VarChar, data.proficiency)
            .query(`
                UPDATE [Skill] SET Name = @name, Proficiency = @proficiency
                WHERE Id = @id AND UserId = @userid
            `);
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function deleteSkill(id, userId)
{
    try
    {
        let connection = await connectDB();
        await connection.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, userId)
            .query('DELETE FROM [Skill] WHERE Id = @id AND UserId = @userId');
        return true;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

module.exports = {getSkills, getSkillById, getSkillsByUser, addSkillToUser, updateSkill, deleteSkill};