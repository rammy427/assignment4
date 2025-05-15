import { useEffect, useState } from "react";
import { getItemById } from "../services/api";

function Home() {
    const [user, setUser] = useState({});

    const getUser = () =>
    {
        getItemById("users", 159)
        .then(result => setUser(result.data))
        .catch(error => console.log(error));
    }

    // Get user with API when the page is loaded.
    useEffect(() => getUser(), []);

    return (
        <>
            <h1>{user.FirstName} {user.LastName}</h1>
            {/* <h1>Sebastián Ramírez</h1> */}
            <img src="/src/assets/logo.jpeg" className="w-25 mt-3 mb-3 rounded-circle align-self-center"></img>
            <h2>{user.Role}</h2>
            {/* <p className="col-8 mx-auto">My name is Sebastián Andrés Ramírez González, and I am currently a third-year student studying Computer Science at the University of Puerto Rico's Río Piedras campus. Throughout my academic career, I have had the opportunity to explore various branches of computer science. I have served as a programming tutor, a web developer at the CDCC, and a student researcher at the Astrophysical Circle of Puerto Rico. I have also served on the AECC staff board as a public relations officer and secretary. One of my goals has been to use our AECC workshops and my tutoring sessions to motivate other students in programming and mathematics so they can overcome their fear and turn their ideas into reality. Overall, I want all the work I do to be useful and serve as motivation for the community. I aspire to become a software engineer, and while I haven't decided if I actually want to pursue graduate school, I would like to educate and inspire the next generation in the not-too-distant future. Some of my hobbies include playing (and programming!) video games, playing the flute, and listening to ear-splitting music (my favorite genres are metalcore and others).</p> */}
            <p className="col-8 mx-auto">{user.Description}</p>

            {/* Put all languages in a container.
            <div className="container bg-secondary p-2 rounded-3 text-center mb-5">
                <h3>Programming Languages and Frameworks</h3>
                <div className="row">
                    {
                        // Iterate through all the languages.
                        langs.map((str, index) => (
                            <div key={index} className="col-12 col-sm-6 col-lg-4">{str}</div>
                        ))
                    }
                </div>
            </div> */}
        </>
    );
}

export default Home;