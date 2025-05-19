const {connectDB, sql} = require('../config/db');

async function getUserById(id)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Id', sql.Int, id)
            .query('SELECT TOP 1 [Id], [Email], [FirstName], [LastName], [LastLogin], [Role], [Description], [RegisteredOn], [Deleted] FROM [User] WHERE Id = @Id');
        return result.recordset[0];
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

async function getUserByEmail(email)
{
    try
    {
        let connection = await connectDB();
        let result = await connection.request()
            .input('Email', sql.VarChar, email)
            .query('SELECT TOP 1 * FROM [User] WHERE Email = @Email');
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
            .input('description', sql.VarChar, data.description)
            .input('registeredon', sql.DateTime2, new Date())
            .query(`
                INSERT INTO [User] (Email, Password, FirstName, LastName, Role, Description, RegisteredOn)
                VALUES (@email, @password, @firstname, @lastname, @role, @description, @registeredon);
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
            .input('password', sql.VarChar, data.password)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role)
            .input('description', sql.VarChar, data.description)
            .query(`
                UPDATE [User] SET Email = @email, Password = @password, FirstName = @firstname, LastName = @lastname, Role = @role, Description = @description
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

module.exports = {getUserById, getUserByEmail, createUser, updateUser, deleteUser};