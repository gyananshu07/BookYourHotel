import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { user, dispatch, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("/api/auth/logout");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  console.log(isAdmin);

  return (
    <div className="navContainer">
      <Link to="/" className="logo mx-auto">
        <div>BookYourHotel</div>
      </Link>
      {user ? (
        <div className="mx-auto nav-user">
          <img
            src={
              user.profileImage
                ? user.profileImage
                : "https://icon-library.com/images/profiles-icon/profiles-icon-0.jpg"
            }
            className="rounded-circle"
            style={{
              width: "50px",
              color: "white",
              border: "3px solid #fdc500",
            }}
            alt="user"
          />
          <span className="ms-2">{user?.username}</span>

          <button onClick={handleLogout} className="navButton">
            Logout
          </button>
          {isAdmin && (
            <Link to="/">
              <button className="navButton">Go to Dashboard</button>
            </Link>
          )}
        </div>
      ) : (
        <div className="navItems mx-auto">
          <Link to="/register">
            <button className="navButton">Register</button>
          </Link>

          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
