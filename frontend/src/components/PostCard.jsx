import { Link } from "react-router-dom";

function PostCard({info}) {
    return (
        <>
            <div className="card col-lg-5 col-xl align-items-center">
                <img src={info.url} className="card-img-top h-50 w-75 p-3" alt={"Image for " + info.title}></img>
                <div className="card-body text-center">
                    <h5 className="card-header mb-3">{info.title}</h5>
                    <Link to={"/post/" + info.id} className="btn btn-secondary mt-3">View Post</Link>
                </div>
            </div>
        </>
    );
};

export default PostCard;