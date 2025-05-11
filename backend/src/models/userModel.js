const {connectDB, sql} = require('../config/db');

async function getUserById(id)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .query('SELECT TOP 1 * FROM [User] WHERE Id = @Id');
        return result.recordset[0];
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function createUser(data)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('email', sql.VarChar, data.email)
            .input('password', sql.VarChar, data.password)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role)
            .input('registeredon', sql.DateTime2, new Date())
            .query(`
                INSERT INTO [User] (Email, Password, FirstName, LastName, Role, RegisteredOn)
                VALUES (@email, @password, @firstname, @lastname, @role, @registeredon);
                SELECT SCOPE_IDENTITY() AS Id;
            `);
        return result.recordset[0].Id;
    }
    catch (err)
    {
        throw new Error(err.message);
    } 
}

async function updateUser(id, data)
{
    try
    {
        let connection = await connectDB();
        await connection.request()
            .input('id', sql.Int, id)
            .input('email', sql.VarChar, data.email)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role)
            .query(`
                UPDATE [User] SET Email = @email, FirstName = @firstname, LastName = @lastname, Role = @role
                WHERE Id = @id
            `);
        return true;
    }
    catch (err)
    {
        throw new Error(err.message);
    } 
}

async function deleteUser(id)
{
    try
    {
        let connection = await connectDB();
        await connection.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM [User] WHERE Id = @Id');
        return true;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

module.exports = {getUserById, createUser, updateUser, deleteUser};