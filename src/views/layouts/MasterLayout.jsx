import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/AuthContextProvider";

function MasterLayout() {
  const { user, token } = useStateContext();

  // check if the token is set
  if (!token) {
    // token is not set, redirect to login page
    return <Navigate to="/login" />;
  }

  return (
    <main id="master_layout">
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-lg"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            IBAN Validator
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  My Validations
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </main>
  );
}

export default MasterLayout;
