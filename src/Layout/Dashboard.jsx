import { Link, Outlet } from "react-router-dom";
import { FiSidebar } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { FaRegClipboard } from "react-icons/fa";
import {
  FcContacts,
  FcInspection,
  FcAddRow,
  FcDataConfiguration,
  FcConferenceCall,
  FcCurrencyExchange,
} from "react-icons/fc";
import useGetDbUser from "../hooks/useGetDbUser";

const Dashboard = () => {
  const [dbUser] = useGetDbUser();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-end justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button mr-8 mt-4 lg:hidden"
        >
          <FiSidebar />
        </label>
        <Outlet />
      </div>
      <div className="drawer-side bg-[#00b0e4] text-red-700">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-black text-lg">
          {/* Sidebar content here */}
          {dbUser[0]?.role === "student" && (
            <>
              <li>
                <Link to="/dashboard/carts">
                  <FcInspection className="text-2xl" /> My selected class
                </Link>
              </li>
              <li>
                <Link to="/dashboard/enrolled-classes">
                  <FcContacts className="text-2xl" />
                  My enrolled class
                </Link>
              </li>
              <li>
                <Link to="/dashboard/payment-history">
                  <FcCurrencyExchange className="text-2xl" />
                  Payment history
                </Link>
              </li>
            </>
          )}
          {dbUser[0]?.role === "instructor" && (
            <>
              <li>
                <Link to="/dashboard/add-class">
                  <FcAddRow className="text-2xl" />
                  Add class
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-classes">
                  <FcContacts className="text-2xl" />
                  My classes
                </Link>
              </li>
            </>
          )}
          {dbUser[0]?.role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/manage-classes">
                  <FcDataConfiguration className="text-2xl" />
                  Manage classes
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-users">
                  <FcConferenceCall className="text-2xl" />
                  Manage users
                </Link>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <Link to="/">
              <ImHome className="text-2xl" /> Home
            </Link>
          </li>
          <li>
            <Link to="/instructors">
              <GiTeacher className="text-2xl" />
              Instructors
            </Link>
          </li>
          <li>
            <Link to="/classes">
              <FaRegClipboard className="text-2xl" />
              Classes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
