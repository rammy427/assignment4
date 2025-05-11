const {connectDB, sql} = require("../config/db");

async function getEducation()
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request().query("SELECT * FROM [Education]");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getDegrees()
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request().query("SELECT * FROM [Degree]");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getEducationById(id)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .query("SELECT * FROM [Education] WHERE Id = @id");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getDegreeById(degreeId)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('degreeid', sql.Int, degreeId)
            .query("SELECT * FROM [Degree] WHERE Id = @degreeid");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getEducationByUser(userId)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('userid', sql.Int, userId)
            .query("SELECT * FROM [Education] WHERE UserId = @userid");
        return result.recordset;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function addEducationToUser(userId, data)
{
    // TODO: Check if the user exists first!
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('userid', sql.Int, userId)
            .input('institution', sql.VarChar, data.institution)
            .input('degreeid', sql.Int, data.degreeId)
            .input('fieldofstudy', sql.VarChar, data.fieldOfStudy)
            .input('startdate', sql.Date, data.startDate)
            .input('enddate', sql.Date, data.endDate)
            .query(`
                INSERT INTO [Education] (UserId, Institution, DegreeId, FieldOfStudy, StartDate, EndDate)
                VALUES (@userid, @institution, @degreeid, @fieldofstudy, @startdate, @enddate);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function updateEducation(id, userId, data)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('id', sql.Int, id)
            .input('userid', sql.Int, userId)
            .input('institution', sql.VarChar, data.institution)
            .input('degreeid', sql.Int, data.degreeId)
            .input('fieldofstudy', sql.VarChar, data.fieldOfStudy)
            .input('startdate', sql.Date, data.startDate)
            .input('enddate', sql.Date, data.endDate)
            .query(`
                UPDATE [Education] SET Institution = @institution, DegreeId = @degreeid, FieldOfStudy = @fieldofstudy, StartDate = @startdate, EndDate = @enddate
                WHERE Id = @id AND UserId = @userid
            `);
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function deleteEducation(id, userId)
{
    try
    {
        let connection = await connectDB();
        await connection.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, userId)
            .query('DELETE FROM [Education] WHERE Id = @id AND UserId = @userId');
        return true;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

module.exports = {getEducation, getDegrees, getEducationById, getDegreeById, getEducationByUser, addEducationToUser, updateEducation, deleteEducation};