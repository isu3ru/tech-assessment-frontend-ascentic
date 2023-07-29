import {Link} from "react-router-dom";
import "../../../css/auth.css";
import {useRef, useState} from "react";
import axiosClient from "../../../axios-client";
import {useStateContext} from "../../../contexts/AuthContextProvider.jsx";

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const handleSignupSubmit = (ev) => {
    ev.preventDefault();

    // clear any existing errors, if not null
    if(errors) {
      setErrors(null);
    }

    const requestData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient.post("/signup", requestData)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      }).catch(error => {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    });
  };

  return (
    <main
      className="form-signup w-100 mx-auto mt-5"
      style={{
        marginTop: "30vh",
      }}
    >
      <form onSubmit={handleSignupSubmit}>
        <h1 className="mb-3 fw-normal text-center">IBAN Validator</h1>
        <h2 className="h4 mb-3 text-center">Create Your Account</h2>

        {errors && <div className="alert alert-danger">
          <ul className="m-0 list-unstyled">
          {Object.keys(errors).map(key => (
            <li key={key}>{errors[key][0]}</li>
          ))}
          </ul>
        </div>}

        <div className="mb-3">
          <label htmlFor="name" className="mb-2">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your Name"
            autoFocus
            ref={nameRef}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Your Email Address"
            ref={emailRef}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
            required
          />
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign Up
        </button>

        <p className="mt-3 text-center">
          Already Registered? <Link to="/login">Sign in</Link>.
        </p>

        <p className="mt-3 mb-3 text-body-secondary text-center">
          &copy; 2023 - Isuru Ranawaka
        </p>
      </form>
    </main>
  );
}

export default Signup;
