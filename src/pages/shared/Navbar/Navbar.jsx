import { Link } from "react-router-dom";
import Container from "../Container";
import logo from "../../../assets/logo/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import useGetDbUser from "../../../hooks/useGetDbUser";
import { RiShoppingCart2Fill } from "react-icons/ri";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbUser] = useGetDbUser();
  const [cart] = useCart();

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
      {/* <li>
        <Link to="/dashboard">Dashboard</Link>
      </li> */}
      {dbUser[0]?.role === "student" && (
        <>
          <li>
            <Link to="/dashboard/carts">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/carts">
              <RiShoppingCart2Fill className="text-3xl" />
              <span className="badge badge-secondary -ml-3 -mt-3">
                {cart.length}
              </span>
            </Link>
          </li>
        </>
      )}
      {dbUser[0]?.role === "instructor" && (
        <li>
          <Link to="/dashboard/add-classes">Dashboard</Link>
        </li>
      )}
      {dbUser[0]?.role === "admin" && (
        <li>
          <Link to="/dashboard/manage-classes">Dashboard</Link>
        </li>
      )}{" "}
    </>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
      })
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-black rounded-box w-52"
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
            <>
              <div className="avatar">
                <div className="w-16 mr-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="btn bg-[#00b0e4] text-white px-6"
              >
                Logout
              </button>
            </>
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
