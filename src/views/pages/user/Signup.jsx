import { Link } from "react-router-dom";
import "../../../css/auth.css";

function Signup() {
  return (
    <main className="form-signup w-100 mx-auto mt-5">
      <form>
        <h1 className="mb-3 fw-normal text-center">IBAN Validator</h1>

        <h2 className="h4 mb-3 text-center">Create Your Account</h2>

        <div className="mb-3">
          <label htmlFor="firstname" className="mb-2">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            placeholder="Your First Name"
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastname" className="mb-2">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Your Last Name"
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
          />
        </div>

        <div className="mb-3">
          <label for="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your Password"
          />
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign Up
        </button>

        <Link to="/login" className="mt-3 d-block text-center">
          Have account here? Please sign in.
        </Link>

        <p className="mt-3 mb-3 text-body-secondary text-center">
          &copy; 2023 - Isuru Ranawaka
        </p>
      </form>
    </main>
  );
}

export default Signup;
