import { useParams } from "react-router-dom";
import { posts } from "../data/posts";

function Post() {
    const {id} = useParams();
    // Get info of the post corresponding to this ID.
    const info = posts.find(post => post.id == id);

    return (
        <>
            <h1>{info.title}</h1>
            <img className="img-fluid mx-auto mb-3" src={info.url}></img>
            <p className="text-start mb-3">{info.text}</p>
        </>
    );
}

export default Post;