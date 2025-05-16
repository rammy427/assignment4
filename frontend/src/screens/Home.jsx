import { useEffect, useState } from "react";
import { getItemById } from "../services/api";
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
    useEffect(() => getUser(), []);

    return (
        <>
        <button>
            {/* Passing current user info to the route to avoid another API call. */}
            <Link to="/edit-user" state={{curUser: user}}>Edit User</Link>
        </button>
        <h1>{user.FirstName} {user.LastName}</h1>
        <img src="/src/assets/logo.jpeg" className="w-25 mt-3 mb-3 rounded-circle align-self-center"></img>
        <h2>{user.Role}</h2>
        <p className="col-8 mx-auto">{user.Description}</p>

        {/* Get skills from the component. */}
        <Skills />
        </>
    );
}

export default Home;