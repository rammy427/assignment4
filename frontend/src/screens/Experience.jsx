import ClassList from "../components/ClassList";
import JobList from "../components/JobList";
import ProjectList from "../components/ProjectList";

function Experience(){
    return (
        <>
            <h1>Experience</h1>
            {/* Accordion containing all the elements. */}
            <div className="accordion accordion-flush col-12 col-sm-6 mx-auto" id="flushAccordion">
                {/* Class accordion. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed rounded-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Courses
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body">
                            <ClassList />
                        </div>
                    </div>
                </div>
                {/* Work and research accordion. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Work and Research
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body">
                            <JobList />
                        </div>
                    </div>
                </div>
                {/* Project accordion with carousel. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed rounded-bottom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Projects
                        </button>
                    </h2>
                    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
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