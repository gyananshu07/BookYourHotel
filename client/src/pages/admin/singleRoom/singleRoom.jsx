import "./singleRoom.scss";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/navbar";
import List from "../../../components/admin/table/Table";
import Charts from "../../../components/admin/charts/charts";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const SingleRoomAdmin = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`/api/${path}/${id}`);

  return (
    <div className="singleAdmin">
      <Sidebar />
      <div className="singleAdminContainer">
        <Navbar />
        <div className="topAdmin">
          <div className="leftAdmin">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={
                  data.photos ||
                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{data.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max People:</span>
                  <span className="itemValue">{data.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">Rs. {data.price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rightAdmin">
            <Charts aspect={4.2 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottomAdmin">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleRoomAdmin;
