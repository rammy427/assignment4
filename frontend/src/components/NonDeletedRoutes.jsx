import { Outlet } from "react-router-dom";
import { getItemById } from "../services/api";
import { useEffect, useState } from "react";
import { USER_ID } from "../constants/constants";

function NonDeletedRoutes()
{
    const [user, setUser] = useState({});
    useEffect(() =>
    {
        getItemById("users", USER_ID).
        then(result => setUser(result.data))
        .catch(error => console.log(error));
    });

    // If user is removed, return error message.
    // Otherwise, return the matching child route.
    return user.Deleted ? <h1>User has been removed.</h1> : <Outlet />
}

export default NonDeletedRoutes;