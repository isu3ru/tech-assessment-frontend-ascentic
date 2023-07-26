import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/AuthContextProvider";

function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default GuestLayout;
