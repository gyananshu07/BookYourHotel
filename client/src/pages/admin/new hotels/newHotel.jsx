import "./newHotel.scss";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { hotelInputs } from "../../../formSource";

const NewHotelAdmin = ({ title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch("/api/rooms");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadResponse = axios.post(
            "https://api.cloudinary.com/v1_1/daxilgrvn/image/upload",
            file
          );

          const { url } = uploadResponse.data;

          return url;
        })
      );
      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newHotel);
    } catch (error) {}
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  return (
    <div className="newAdmin">
      <Sidebar />
      <div className="newAdminContainer">
        <Navbar />
        <div className="topAdmin">
          <h1>{title}</h1>
        </div>
        <div className="bottomAdmin">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    onChange={handleChange}
                    id={input.id}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select name="featured" id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select
                  name="rooms"
                  multiple
                  id="rooms"
                  onChange={handleSelect}
                >
                  {loading
                    ? "Loading..."
                    : data &&
                      data.map((room) => {
                        return (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        );
                      })}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotelAdmin;
