import { Link } from "react-router-dom";
import Container from "../Container";
import logo from "../../../assets/logo/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
// TODO: conditional profile pic 
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructors">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <Container>
      {" "}
      <div className="navbar fixed z-10 bg-opacity-95 md:h-24 bg-black text-white left-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/">
            <img
              src={logo}
              style={{ width: "200px", height: "120px" }}
              alt=""
            />
          </Link>
          <Link className="normal-case text-xl hidden md:block p-0 m-0" to="/">
            Harmony Academy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn bg-[#00b0e4] text-white px-6"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn bg-[#00b0e4] text-white px-6">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
