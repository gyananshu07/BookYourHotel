import "./single.scss";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/navbar";
import List from "../../../components/admin/table/Table";
import Charts from "../../../components/admin/charts/charts";
import useFetch from "../../../hooks/useFetch";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const SingleAdmin = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`/${path}/${id}`);

  return (
    <div className="singleAdmin">
      <Sidebar />
      <div className="singleAdminContainer">
        <Navbar />
        <div className="topAdmin">
          <div className="leftAdmin">
            <Link to={`/admin/${path}/edit/${id}`}>
              <button className="editButton">Edit</button>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={data.profileImage} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.city}, {data.country}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rightAdmin">
            <Charts aspect={3.57 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleAdmin;
