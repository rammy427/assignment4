const {connectDB, sql} = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
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
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        let connection = await connectDB();
        await connection.request()
            .input('id', sql.Int, id)
            .input('email', sql.VarChar, data.email)
            .input('password', sql.VarChar, hashedPassword)
            .input('firstname', sql.VarChar, data.firstName)
            .input('lastname', sql.VarChar, data.lastName)
            .input('role', sql.VarChar, data.role)
            .input('description', sql.VarChar, data.description)
            .query((data.password != "") ? `
                UPDATE [User] SET Email = @email, Password = @password, FirstName = @firstname, LastName = @lastname, Role = @role, Description = @description
                WHERE Id = @id`
                :
                `UPDATE [User] SET Email = @email, FirstName = @firstname, LastName = @lastname, Role = @role, Description = @description
                WHERE Id = @id`
            );
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
            .query('UPDATE [User] SET Deleted = 1 WHERE Id = @Id');
        return true;
    }
    catch (err)
    {
        throw new Error(err.message);
    }
}

module.exports = {getUserById, getUserByEmail, createUser, updateUser, deleteUser};