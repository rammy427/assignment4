import { Link } from "react-router-dom";
import { projects } from "../data/projects";

function ProjectList() {
    return (
        <>
            <div id="projectCarousel" className="carousel slide container-fluid">
                {/* Carousel containing all the projects. */}
                <div className="row">
                    {/* Button for previous project. */}
                    <button className="col-12 col-md-1 btn btn-primary rounded mb-3 mb-md-0" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    {/* Project content. */}
                    <div className="col-12 col-md-10">
                        {
                            // Render all the projects.
                            projects.map((project, index) => (
                                // Check if index is 0 to set the first project as active when mounting.
                                <div key={project.id} className={(index == 0 ? "active " : "") + "carousel-item float-none mx-auto container"}>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <img className="img-fluid" src={project.image_src} alt={project.title}></img>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <Link className="fs-1" to={project.link} target="_blank">{project.title}</Link>
                                            <p>{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* Button for next project. */}
                    <button className="col-12 col-md-1 btn btn btn-primary rounded" type="button" data-bs-target="#projectCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProjectList;