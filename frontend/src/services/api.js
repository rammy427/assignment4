import axios from "axios";

const api = axios.create(
    {
        baseURL: "http://localhost:3000/api/v1/",
        headers:
        {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Api-Key": "testkey"
        }
    }
);

// GET request.
export const getItems = (resource) => api.get(resource);
// GET by ID request.
export const getItemById = (resource, id) => api.get(`${resource}/${id}`);
// POST request.
export const createItem = (resource, data) => api.post(resource, data);
// PUT request.
export const editItem = (resource, id, data) => api.put(`${resource}/${id}`, data);
// DELETE request.
export const deleteItem = (resource, id) => api.delete(`${resource}/${id}`);

// Set the authorization header for all requests.
export const applyAuthToken = () => api.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

export default api;