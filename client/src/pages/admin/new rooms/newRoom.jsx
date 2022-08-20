import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/navbar";

import { useState } from "react";
import { roomInputs } from "../../../formSource";

import useFetch from "../../../hooks/useFetch";
import axios from "axios";

import "./newRoom.scss";

const NewRoomAdmin = ({ title }) => {
  const [info, setInfo] = useState({});
  const [hotelID, setHotelID] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading } = useFetch("/api/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelID}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form action="">
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.type}
                    type={input.type}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelID"
                  onChange={(e) => {
                    setHotelID(e.target.value);
                  }}
                >
                  {loading
                    ? "Loading..."
                    : data &&
                      data.map((hotel) => {
                        return (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
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

export default NewRoomAdmin;
