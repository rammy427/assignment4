import { Link } from "react-router-dom";
import EducationTable from "../components/EducationTable";
import { getItemById, isLoggedIn } from "../services/api";
import { useEffect, useState } from "react";
import { USER_ID } from "../constants/constants";
import ExperienceTable from "../components/ExperienceTable";

function Experience(){
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [jobs, setJobs] = useState([]);

    const isProject = exp => exp.IsProject === true;
    const isCourse = exp => exp.IsProject === false && exp.Company === null;
    const isJob = exp => exp.IsProject === false && exp.Company !== null;

    const getExperiences = () =>
    {
        getItemById("experience", USER_ID)
        .then(result =>
        {
            setProjects(result.data.filter(isProject));
            setCourses(result.data.filter(isCourse));
            setJobs(result.data.filter(isJob));
        })
        .catch(error => console.log(error));
    }

    useEffect(getExperiences, [projects, courses, jobs]);

    return (
        <>
            <h1>Experience</h1>
            {/* Accordion containing all the elements. */}
            <div className="accordion accordion-flush col-12 col-sm-9 mx-auto" id="flushAccordion">
                {/* Education accordion. */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed rounded-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Education
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#flushAccordion">
                        <div className="accordion-body">
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
                            <ExperienceTable experiences={courses} />
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
                            <ExperienceTable experiences={jobs} />
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
                            <ExperienceTable experiences={projects} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Experience;