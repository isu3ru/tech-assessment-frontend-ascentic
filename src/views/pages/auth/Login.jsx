import {Link} from "react-router-dom";
import "../../../css/auth.css";
import {useRef, useState} from "react";
import {useStateContext} from "../../../contexts/AuthContextProvider.jsx";
import axiosClient from "../../../axios-client.js";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();

  const handleSignInSubmit = (ev) => {
    ev.preventDefault();

    // clear any existing errors, if not null
    if (errors) {
      setErrors(null);
    }

    const requestData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient.post("/signin", requestData)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      }).catch(error => {
      const response = error.response;

      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } else {
        setErrors({
          email: ['Invalid credentials. Failed to sign in.'],
        })
      }
    });
  };

  return (<main
    className="form-signin w-100 mx-auto"
    style={{
      marginTop: "30vh",
    }}
  >
    <form onSubmit={handleSignInSubmit}>
      <h1 className="mb-3 fw-normal text-center">IBAN Validator</h1>
      <h2 className="h4 mb-3 text-center">Please sign in</h2>

      {errors && <div className="alert alert-danger">
        <ul className="m-0 list-unstyled">
          {Object.keys(errors).map(key => (
            <li key={key}>{errors[key][0]}</li>
          ))}
        </ul>
      </div>}

      <div className="form-floating">
        <input type="email" className="form-control" id="email"
               placeholder="Your Email Address" autoFocus ref={emailRef} required/>
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" id="password"
               placeholder="Your Password" ref={passwordRef} required/>
        <label htmlFor="password">Password</label>
      </div>

      <button className="btn btn-primary w-100 py-2" type="submit">
        Sign in
      </button>

      <p className="mt-3 text-center">
        Not Registered? <Link to="/signup">Sign Up</Link>.
      </p>

      <p className="mt-3 mb-3 text-body-secondary text-center">
        &copy; 2023 - Isuru Ranawaka
      </p>
    </form>
  </main>);
}

export default Login;
