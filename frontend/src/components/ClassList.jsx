import { courses } from "../data/courses";

function ClassList() {
    return (
        <>
            <ul className="list-group">
                {
                    // Render all the courses.
                    courses.map((course, index) => (
                        <li key={index} className="list-group-item">{course}</li>
                    ))
                }
            </ul>
        </>
    );
}

export default ClassList;