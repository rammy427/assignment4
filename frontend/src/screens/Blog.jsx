import PostCard from "../components/PostCard";
import { posts } from "../data/posts";

function Blog() {
    return (
        <>
            <h1>Blog</h1>
            <div className="container">
                <div className="row gap-3 mx-auto">
                    {
                        // Render all the post cards.
                        posts.map((post) => (
                            <PostCard key={post.id} info={post} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Blog;