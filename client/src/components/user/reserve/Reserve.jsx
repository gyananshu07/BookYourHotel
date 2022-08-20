import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import useFetch from "../../../hooks/useFetch";

import "./reserve.css";

const Reserve = ({ setOpenModal, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`);

  const { dates } = useContext(SearchContext);

  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDate.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      axios.get("/booking/createSession");
      setOpenModal(false);
    } catch (err) {}
  };
  return (
    <>
      <div className="reserve">
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpenModal(false)}
          />
          <span>Select Your Rooms:</span>
          {data.map((item) => {
            return (
              <div className="rItem">
                <div className="rItemInfo">
                  <div className="rTitle">Room Name: {item?.title}</div>
                  <div className="rDesc">
                    Description of Room: {item?.description}
                  </div>
                  <div className="rMax">
                    Max People: <b>{item?.maxPeople}</b>
                  </div>
                  <div className="rPrice">
                    Price: <b>{item?.price}</b>
                  </div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => {
                    return (
                      <div className="room">
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={handleChange}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    );
                  })}
                </div>

                <button onClick={handleClick} className="rButton">
                  Reserve Now!
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Reserve;
