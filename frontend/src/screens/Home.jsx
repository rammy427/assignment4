import { useEffect, useState } from "react";
import { getItemById, isLoggedIn } from "../services/api";
import Skills from "../components/Skills";
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

    // Get user with API when the page is loaded.
    useEffect(getUser, []);

    return (
        <>
        {
            // Render the edit user button only if logged in.
            isLoggedIn() &&
            <Link className="col-2 mx-auto" to="/edit-user">
                <button className="btn btn-primary text-white w-100 mb-3">Edit User</button>
            </Link>
        }
        <h1>{user.FirstName} {user.LastName}</h1>
        <img src="/src/assets/logo.jpeg" className="w-25 mt-3 mb-3 rounded-circle align-self-center"></img>
        <h2>{user.Role}</h2>
        <p className="col-8 mx-auto">{user.Description}</p>

        <h2>My Skills</h2>
        {
            // Render the edit skills button only if logged in.
            isLoggedIn() &&
            <Link className="col-2 mx-auto" to="/edit-skills">
                <button className="btn btn-primary text-white w-100 mb-3">Edit Skills</button>
            </Link>
        }
        {/* Get skills from the component. */}
        <Skills />
        </>
    );
}

export default Home;