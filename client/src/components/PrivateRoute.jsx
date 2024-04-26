import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const currentUser = useSelector((state) => state.user);

  // If the user is logged in, we will display the profile page, else we will redirect the user to the sign in page
  // Outlet is used to render the child routes of the parent route(PrivateRoute is the parent route and profile is the child route)
  if (currentUser === true) {
    return <Outlet />;
  } else {
    return <Navigate to='/sign-in' />;
  }
}

export default PrivateRoute;
