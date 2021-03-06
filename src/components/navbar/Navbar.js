import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  if (loading) {
    return <h3>Loading...</h3>;
  }
  const menuItem = (
    <>
      <li>
        <Link to="/">Home</Link>{" "}
      </li>
      <li>
        <Link to="/products">Products</Link>{" "}
      </li>
      <li>
        <Link to="/portfolio">Portfolio</Link>{" "}
      </li>
      <li>
        <Link to="/blog">Blog</Link>{" "}
      </li>
      {admin && (
        <>
          <li>
            <Link to="/addPart">Add Part</Link>
          </li>
        </>
      )}
      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>{" "}
        </li>
      )}
      {user ? (
        <>
          <li>{user?.email}</li>
          <button
            onClick={logOut}
            className="btn btn-outline btn-primary hover:text-white"
          >
            Sign Out
          </button>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="container navbar bg-base-100 lg:justify-center">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
            tabIndex="0"
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {menuItem}
          </ul>
        </div>
        <a href="#" className="text-xl normal-case btn btn-ghost">
          <i> Global Manufacture</i>
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="p-0 menu menu-horizontal">{menuItem}</ul>
      </div>
      <div className="navbar-end lg:hidden">
        <label
          htmlFor="dashboard-sidebar"
          tabIndex="1"
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
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
      </div>
    </div>
  );
};

export default Navbar;
