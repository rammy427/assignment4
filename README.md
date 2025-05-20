# User Portfolio Management System

CCOM4995: Web Application Development \
Final Assignment

**PLEASE READ REMARKS AT END OF DOCUMENT!**

## Description

This is a web application where the user can view and edit their portfolio information, such as skills, education, projects, and internships. This application features a front end interface made using React and Bootstrap as well as a back end API made using Node.js and Express, with Axios and Cors to connect both. It also features JWT authorization, protected routes, and password hashing.

## Running the Project

First, install the latest version of Node.js [here](https://nodejs.org/en). \
Next, download and extract the ZIP file containing all the files. \
Once the folder is open in any text editor, run the following commands in the terminal on the root directory (containing the folders `frontend` and `backend`) to install the needed dependencies:

Firstly, for the **back end** installation, enter the backend folder with `cd backend/`. Then, run the following installations:
- `npm install express` to install Express.js.
- `npm install mssql dotenv` to install MSSQL.
- `npm install express-validator` to install the Express Validator.
- `npm install jsonwebtoken` to install the JSON Web Token handler.
- `npm install cors` to connect to the front end.

Then, for the **front end** installation, go back to the root directory and enter the frontend folder with `cd frontend/`. Then, run:
- `npm install`.
- `npm install axios` to connect to the back end.

Once all dependencies are installed, run the server with `node src/server.js` on the root directory.
Now, you can use any API client such as Postman to test the API by sending as many GET, POST, PUT, and DELETE requests as you want. Once the server is running, choose the request type and enter the URL:
```
http://localhost:3000/api/v1/<endpoint>
```
where `<endpoint>` is any of the following endpoints below. \
**All requests require an API key. All PUT, POST, and DELETE requests also require a JWT header for verification. However, the front end already takes care of this. ;)**

## Endpoints

### Auth

- `POST` `/auth/login` - Called when the user submits the login form. Creates a JWT and sets the header of all subsequent requests.

### Users

- `GET` `/users/<id>` - Gets the profile of the user with the given ID.
- `PUT` `/users/<id>` - Edits the profile of the user with the given ID. E-mail, first name, and last name are required.
- `DELETE` `/users/<id>` - Deletes the user with the given ID and all their information if they exist. This is a *soft* delete, meaning the user can still be retrieved if its `Deleted` field is set to `NULL` again.

`<id>` is the user ID. It must be a positive integer, and the user associated to this ID must exist.

### Skills

- `GET` `/skills/<userId>/<id>` - Gets one skill by its ID.
- `GET` `/skills/<userId>` - Gets all the skills belonging to the user with the given ID.
- `POST` `/skills/<userId>` - Adds a new skill to the user with the given ID. Name is required.
- `PUT` `/skills/<userId>/<id>` - Edits one skill with the given ID associated to the user with the given user ID. Name is required.
- `DELETE` `/skills/<userId>/<id>` - Deletes one skill with the given ID associated to the user with the given user ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist. \
`<id>` is the skill ID. It must be a positive integer, and a skill associated to this ID must exist.

### Experience

The front end interface allows the user to easily distinguish an experience between one of three types: project, course, or job.

An experience is a:
- **project** if its `IsProject` value is equal to `TRUE`.
- **course** if its `IsProject` value is equal to `FALSE` and if it belongs to no company.
- **job** if its `isProject` value is equal to `FALSE` and if it belongs to a company.

- `GET` `/experience/<userId>` - Gets all the experiences or projects belonging to the user with the given ID.
- `GET` `/experience/<userId>/<id>` - Gets one experience by its ID.
- `POST` `/experience/<userId>` - Adds a new experience or project to the user with the given ID. Job title is required.
- `PUT` `/experience/<userId>/<id>` - Edits one experience or project with the given ID associated to the user with the given user ID. Job title is required.
- `DELETE` `/experience/<userId>/<id>` - Deletes one experience or project with the given ID associated to the user with the given user ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist. \
`<id>` is the experience or project ID. It must be a positive integer, and a skill associated to this ID must exist.

### Education

- `GET` `/education/degrees` - Gets all the possible degrees. This is used internally by the education management form.
- `GET` `/education/<userId>` - Gets all the educations belonging to the user with the given ID.
- `GET` `/education/<userId>/<id>` - Gets one education by its ID.
- `POST` `/education/<userId>` - Adds a new education slot to the user with the given ID. Institution is required.
- `PUT` `/education/<userId>/<id>` - Edits one education slot with the given ID associated to the user with the given user ID. Institution is required.
- `DELETE` `/education/<userId>/<id>` - Deletes one education slot with the given ID associated to the user with the given user ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist. \
`<id>` is the education ID. It must be a positive integer, and a skill associated to this ID must exist.
When adding or editing an education, the degree ID must also exist (unless it is `NULL`) and must be a positive integer.

## Validation with an API Key
Each endpoint is protected by an API key that is compared to the one saved in the `.env` file. If the API key given does not match, the request will respond with a `403 Forbidden` status. \
To prevent this, add the header `Api-Key` to the request. For the purpose of this project only, the value for the API key is the simple string `testkey`. Using this string will allow you to use the API.

## JWT Authorization
All POST, PUT, and DELETE requests are verified with a JWT header. When the user logs in, all subsequent requests are given the header `[Authorization]` equal to `Bearer <token>` where `<token>` is the JWT string.

## References

- [Extract HTTP Request Headers](https://stackoverflow.com/questions/13147693/how-to-extract-request-http-headers-from-a-request-using-nodejs-connect)
- [How to Pass Props Through React Router's Link Component](https://ui.dev/react-router-pass-props-to-link)
- [Using Axios to set request headers](https://blog.logrocket.com/using-axios-set-request-headers/)
- [Regex for Password](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a)
- [Implementing Protected Routes In React JS](https://medium.com/@yogeshmulecraft/implementing-protected-routes-in-react-js-b39583be0740)
- [Password Encryption](https://www.npmjs.com/package/bcrypt)

## Remarks for the Professor!

- The user ID to maintain auth session is hardcoded into the app. The credentials I used are:
    ```
    ID: 159
    Email: sebastian.ramirez4@upr.edu
    Password: WebDestroyer#1
    ```
- The bonus I chose for this assignment is the **password encryption**.
- If the front end looks strange, try running it specifically on the Mozilla Firefox browser. For some reason, my React applications only display objects properly there. I still have not discovered why this is the case. Maybe I really am the web destroyer.