# User Portfolio Management System

CCOM4995: Web Application Development \
Final Assignment

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
**Make sure to also include the API key in the request header!**

## Endpoints

### Users

- `POST` `/users` - Create a new user with a profile. E-mail, password, first name, and last name are required.
- `GET` `/users/<id>` - Get the profile of the user with the given ID.
- `PUT` `/users/<id>` - Edit the profile of the user with the given ID. E-mail, first name, and last name are required.
- `DELETE` `/users/<id>` - Delete the user with the given ID if he or she exists.

`<id>` is the user ID. It must be a positive integer, and the user associated to this ID must exist.

### Skills

- `POST` `/skills/<userId>` - Add a new skill to the user with the given ID. Name is required.
- `GET` `/skills/<userId>` - Get all the skills belonging to the user with the given ID.
- `PUT` `/skills/<userId>/<id>` - Edit one skill with the given ID associated to the user with the given user ID. Name is required.
- `DELETE` `/skills/<userId>/<id>` - Delete one skill with the given ID associated to the user with the given user ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist. \
`<id>` is the skill ID. It must be a positive integer, and a skill associated to this ID must exist.

### Experience

- `POST` `/experience/<userId>` - Add a new experience or project to the user with the given ID. Job title is required.
- `GET` `/experience/<userId>` - Get all the experiences or projects belonging to the user with the given ID.
- `PUT` `/experience/<userId>/<id>` - Edit one experience or project with the given ID associated to the user with the given user ID. Job title is required.
- `DELETE` `/experience/<userId>/<id>` - Delete one experience or project with the given ID associated to the user with the given user ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist. \
`<id>` is the experience or project ID. It must be a positive integer, and a skill associated to this ID must exist.

### Education

- `POST` `/education/<userId>` - Add a new education slot to the user with the given ID. Institution is required.
- `GET` `/education/<userId>` - Get all the education belonging to the user with the given ID.
- `PUT` `/education/<userId>/<id>` - Edit one education slot with the given ID associated to the user with the given user ID. Institution is required.
- `DELETE` `/education/<userId>/<id>` - Delete one education slot with the given ID associated to the user with the given user ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist. \
`<id>` is the education ID. It must be a positive integer, and a skill associated to this ID must exist.
When adding or editing an education, the degree ID must also exist (unless it is `NULL`) and must be a positive integer.

### Full Portfolio

- `GET` `/portfolio/<userId>` - Get the entire portfolio belonging to the user with the given ID.

`<userId>` is the user ID. It must be a positive integer, and the user associated to this ID must exist.

## Validation with an API Key
Each endpoint is protected by an API key that is compared to the one saved in the `.env` file. If the API key given does not match, the request will respond with a `403 Forbidden` status. \
To prevent this, add the header `Api-Key` to the request. For the purpose of this project only, the value for the API key is the simple string `testkey`. Using this string will allow you to use the API.

## References

- [Extract HTTP Request Headers](https://stackoverflow.com/questions/13147693/how-to-extract-request-http-headers-from-a-request-using-nodejs-connect)