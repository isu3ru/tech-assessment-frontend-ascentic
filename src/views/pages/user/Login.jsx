import { Link } from "react-router-dom";
import "../../../css/auth.css";

function Login() {
  return (
    <main
      className="form-signin w-100 mx-auto"
      style={{
        marginTop: "30vh",
      }}
    >
      <form>
        <h1 className="mb-3 fw-normal text-center">IBAN Validator</h1>
        <h2 className="h4 mb-3 text-center">Please sign in</h2>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Your Email Address"
            autoFocus
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Your Password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>

        <Link to="/signup" className="mt-3 d-block text-center">
          No account? Create one.
        </Link>

        <p className="mt-3 mb-3 text-body-secondary text-center">
          &copy; 2023 - Isuru Ranawaka
        </p>
      </form>
    </main>
  );
}

export default Login;
