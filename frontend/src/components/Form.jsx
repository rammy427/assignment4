
import React, { useState } from "react";
import { ALPHANUMERIC_REGEX, EMAIL_REGEX } from "../constants/constants";

function Form() {
    let subscribed = false;

    const [data, setData] = useState({
      email: "",
      message: ""
    });

    const [error, setError] = useState({
      email: "",
      message: ""
    });

    const toggleSubscribe = () => {
      subscribed = !subscribed;
      console.log(subscribed);
    }

    const handleOnChange = (name, value, regex) => {
      setError({...error, [name]: !regex.test(value)? "Incorrect format!" : ""});
      setData({...data, [name]:value});
      console.log(error);
      console.log(data);
      console.log(regex.test(value));
    };
    
    // Alert user depending on whether they signed up for the newsletter.
    const handleSubmit = (event) => {
      event.preventDefault();
      if (subscribed)
        alert("Thank you for subscribing!");
      else
        alert("Thank you for your information. If you wish to subscribe, please submit again.");
      console.log("Data submitted:", data);
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
              <label htmlFor="message">Message <span className="text-danger">*</span></label>
              <br />
              <textarea id="message" name="message" className="form-control bg-white" value={data.message} 
                onChange={(e) => handleOnChange(e.target.name, e.target.value, ALPHANUMERIC_REGEX)} required/>
              { error.message && 
                <>
                  <span className="text-danger">{error.message}</span>
                </>
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="newsletter" onClick={() => toggleSubscribe()}></input>
                <label className="form-check-label" htmlFor="newsletter">Sign up for newsletter</label>
              </div>
            </div>
            <div className="col-6">
              <button type="submit" className="bg-secondary text-dark rounded w-100">Submit</button>
            </div>
          </div>
        </form>
      </>
    );
}

export default Form;