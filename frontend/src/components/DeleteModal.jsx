import { useNavigate } from "react-router-dom";
import { USER_ID } from "../constants/constants";
import { deleteItem } from "../services/api";

function DeleteModal({type, id})
{
    const str = String(type).charAt(0).toUpperCase() + String(type).slice(1);
    const navigate = useNavigate();

    const removeItem = () =>
    {
        deleteItem(`${type}/${USER_ID}`, id)
        .then(() =>
        {
            alert(`Successfully deleted ${type}.`);
            // Redirect to the edit skills page.
            navigate("/edit-skills");
        })
        .catch(error => console.log(error));
    }

    return (
        <>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Delete
        </button>

        {/* Modal */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete {str}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={removeItem}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default DeleteModal;