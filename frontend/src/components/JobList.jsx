import { jobs } from "../data/jobs";

function JobList() {
    return (
        <>
            <ul className="list-group">
                {
                    // Render all the jobs.
                    jobs.map(job => (
                        <li key={job.id} className="list-group-item">
                            <h2>{job.title}</h2>
                            <h3 className="fs-4">{job.employer}</h3>
                            <p className="lh-lg">{job.description}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default JobList;