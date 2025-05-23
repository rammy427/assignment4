import { useEffect, useState } from "react";
import { deleteItem, getItemById, isLoggedIn } from "../services/api";
import SkillTable from "../components/SkillTable";
import { USER_ID } from "../constants/constants";
import { Link } from "react-router-dom";

function Home() {
    const [user, setUser] = useState({});

    const getUser = () =>
    {
        getItemById("users", USER_ID)
        .then(result => setUser(result.data))
        .catch(error => console.log(error));
    }

    const removeUser = () =>
    {
        deleteItem("users", USER_ID)
        .then(() => alert("User deleted successfully!"))
        .catch(error => console.log(error));
    }

    // Get user with API when the page is loaded.
    useEffect(getUser, []);

    return (
        <>
        {
            // Render the edit user button only if logged in.
            isLoggedIn() &&
            <div className="row w-100 mx-auto mb-3 justify-content-center">
                <Link className="col col-lg-2" to="/edit-user">
                    <button className="btn btn-primary text-white w-100"><i className="bi bi-pencil-square mx-1"></i>Edit User</button>
                </Link>
                <button className="col col-lg-2 btn btn-danger" onClick={removeUser}><i className="bi bi-trash3-fill mx-1"></i>Delete User</button>
            </div>
        }
        <h1>{user.FirstName} {user.LastName}</h1>
        <img src="/src/assets/logo.jpeg" className="w-25 mt-3 mb-3 rounded-circle align-self-center"></img>
        <h2>{user.Role}</h2>
        <p className="col-8 mx-auto">{user.Description}</p>

        <h2>My Skills</h2>
        {/* Get skills from the component. */}
        <SkillTable />
        </>
    );
}

export default Home;