const {connectDB, sql} = require("../config/db");

async function getExperiences()
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request().query('SELECT * FROM [Experience]');
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getExperienceById(id)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM [Experience] WHERE Id = @id");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getExperiencesByUser(userId)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('userid', sql.Int, userId)
            .query("SELECT * FROM [Experience] WHERE UserId = @userid");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function addExperienceToUser(userId, data)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('userid', sql.Int, userId)
            .input('jobtitle', sql.VarChar, data.jobTitle)
            .input('company', sql.VarChar, data.company)
            .input('description', sql.VarChar, data.description)
            .input('startdate', sql.Date, data.startDate)
            .input('enddate', sql.Date, data.endDate)
            .input('isproject', sql.Bit, data.isProject)
            .query(`
                INSERT INTO [Experience] (UserId, JobTitle, Company, Description, StartDate, EndDate, IsProject)
                VALUES (@userid, @jobtitle, @company, @description, @startdate, @enddate, @isproject);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function updateExperience(id, userId, data)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .input('userid', sql.Int, userId)
            .input('jobtitle', sql.VarChar, data.jobTitle)
            .input('company', sql.VarChar, data.company)
            .input('description', sql.VarChar, data.description)
            .input('startdate', sql.Date, data.startDate)
            .input('enddate', sql.Date, data.endDate)
            .input('isproject', sql.TinyInt, data.isProject)
            .query(`
                UPDATE [Experience] SET JobTitle = @jobtitle, Company = @company, Description = @description, StartDate = @startdate, EndDate = @enddate, IsProject = @isproject
                WHERE Id = @id AND UserId = @userid
            `);
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function deleteExperience(id, userId)
{
    try
    {
        let connection = await connectDB();
        await connection.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, userId)
            .query('DELETE FROM [Experience] WHERE Id = @id AND UserId = @userId');
        return true;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

module.exports = {getExperiences, getExperienceById, getExperiencesByUser, addExperienceToUser, updateExperience, deleteExperience};