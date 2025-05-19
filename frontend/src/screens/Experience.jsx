import { Link } from "react-router-dom";
import ClassList from "../components/ClassList";
import EducationTable from "../components/EducationTable";
import JobList from "../components/JobList";
import ProjectList from "../components/ProjectList";
import { isLoggedIn } from "../services/api";

function Experience(){
    return (
        <>
            <h1>Experience</h1>
            {/* Accordion containing all the elements. */}
            <div className="accordion accordion-flush col-12 col-sm-6 mx-auto" id="flushAccordion">
                {/* Education accordion. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed rounded-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Education
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body">
                            {
                                // If logged in, display edit button.
                                isLoggedIn() &&
                                <Link to="/edit-educations">
                                    <button className="btn btn-primary text-white mb-3">Edit</button>
                                </Link>
                            }
                            <EducationTable />
                        </div>
                    </div>
                </div>
                {/* Class accordion. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed rounded-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Courses
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body">
                            <ClassList />
                        </div>
                    </div>
                </div>
                {/* Work and research accordion. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Work and Research
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body">
                            <JobList />
                        </div>
                    </div>
                </div>
                {/* Project accordion with carousel. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed rounded-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            Projects
                        </button>
                    </h2>
                    <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body mb-5">
                            <ProjectList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Experience;