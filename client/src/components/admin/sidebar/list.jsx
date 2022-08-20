import DashboardIcon from "@mui/icons-material/Dashboard";

import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import "./list.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const List = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      await axios.get("/auth/logout");
      navigate("/admin/login");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <ul>
      <p className="title">MAIN</p>
      <Link className="link" to="/admin">
        <li>
          <DashboardIcon className="icon" />
          <span>Dashboard</span>
        </li>
      </Link>
      <p className="title">LIST</p>

      <Link className="link" to="/admin/users">
        <li>
          <CategoryIcon className="icon" />
          <span>Users</span>
        </li>
      </Link>

      <Link className="link" to="/admin/hotels">
        <li>
          <CategoryIcon className="icon" />
          <span>Hotels</span>
        </li>
      </Link>

      <Link className="link" to="/admin/rooms">
        <li>
          <CreditCardIcon className="icon" />
          <span>Rooms</span>
        </li>
      </Link>

      <p className="title">USER</p>
      <li>
        <AccountCircleIcon className="icon" />
        <span>Profile</span>
      </li>
      <li>
        <LogoutIcon className="icon" />
        <span onClick={handleLogout}>Logout</span>
      </li>
    </ul>
  );
};

export default List;
