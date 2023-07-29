import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/AuthContextProvider";
import {useEffect} from "react";
import axiosClient from "../../axios-client.js";

function MasterLayout() {
  const {user, token, setUser, setToken} = useStateContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      });
  }, []);

  // check if the token is set
  if (!token) {
    // token is not set, redirect to login page
    return <Navigate to="/login"/>;
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    if (confirm('You are about to be logged out.\nAre you sure?')) {
      axiosClient.post('/signout')
        .then(() => {
          setUser(null);
          setToken(null);
        });
    }
  }

  return (<main id="master_layout">
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
                <a className="nav-link" href="/validate">
                  Validate
                </a>
              </li>

              {user.role === 'admin' && (
                <li className="nav-item">
                  <a className="nav-link" href="/validations">
                    Validations
                  </a>
                </li>
              )}
            </ul>
            <li className="nav-item mx-3">
              <a className="nav-link text-light" href="#">
                Welcome {user && user.name}!
              </a>
            </li>
            <button className="btn btn-sm btn-outline-danger" type="button" onClick={onLogout}>Sign Out</button>
          </div>
        </div>
      </nav>

      <Outlet />
    </main>
  );
}

export default MasterLayout;
