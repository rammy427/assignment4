
import React, { useState } from "react";
import { ALPHANUMERIC_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "../constants/constants";
import {createItem} from "../services/api";
import { useNavigate } from "react-router-dom";

function Form()
{
    const navigate = useNavigate();

    const [data, setData] = useState({
      email: "",
      // message: ""
      password: ""
    });

    const [error, setError] = useState({
      email: "",
      // message: ""
      password: ""
    });

    // const toggleSubscribe = () => {
    //   subscribed = !subscribed;
    //   console.log(subscribed);
    // }

    const handleOnChange = (name, value, regex) => {
      setError({...error, [name]: !regex.test(value)? "Incorrect format!" : ""});
      setData({...data, [name]:value});
    };
    
    // Alert user depending on whether they signed up for the newsletter.
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Data submitted:", data);
      // Check for formatting errors.
      for (const key in error)
        if (error.hasOwnProperty(key))
        {
          const value = error[key];
          console.log(value);
          // Exit the function if we found an error.
          if (value) return;
        }

      // If no errors occurred, send request with the API.
      // Create item with the "auth" path will send the POST login request.
      createItem("auth/login", data).then((res) =>
      {
        alert("You have successfully logged in!");
        const token = res.data.token;
        console.log(token);
        // Redirect to the home page.
        navigate("/");
      }).catch((error) =>
      {
        alert("Invalid credentials!");
        setData({email: "", password: ""});
        setError({email: "", password: ""});
        console.log(error);
      });
    };
  
    return (
      <>
        <form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label htmlFor="email">Email <span className="text-danger">*</span></label>
              <br />
              <input id="email" name="email" type="email" className="form-control bg-white" value={data.email} maxLength={320}
                onChange={(e) => handleOnChange(e.target.name, e.target.value, EMAIL_REGEX)} required/>
              { error.email && 
                <span className="text-danger pb-2">{error.email}</span>
              }
            </div>
          </div>
          <div className="row">
            <div className="col">
              {/* <label htmlFor="message">Message <span className="text-danger">*</span></label>
              <br />
              <textarea id="message" name="message" className="form-control bg-white" value={data.message} 
                onChange={(e) => handleOnChange(e.target.name, e.target.value, ALPHANUMERIC_REGEX)} required/>
              { error.message && 
                <>
                  <span className="text-danger">{error.message}</span>
                </>
              } */}
              <label htmlFor="password">Password <span className="text-danger">*</span></label>
              <br />
              <input id="password" name="password" type="password" className="form-control bg-white" value={data.password} maxLength={320}
              onChange={(e) => handleOnChange(e.target.name, e.target.value, PASSWORD_REGEX)} required/>
              { error.password &&
                <span className="text-danger pb-2">{error.password}</span>
              }
            </div>
          </div>
          <br />
          <div className="row">
            {/* <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="newsletter" onClick={() => toggleSubscribe()}></input>
                <label className="form-check-label" htmlFor="newsletter">Sign up for newsletter</label>
              </div>
            </div> */}
            <div className="col-6">
              <button type="submit" className="bg-secondary text-dark rounded w-100">Submit</button>
            </div>
          </div>
        </form>
      </>
    );
}

export default Form;