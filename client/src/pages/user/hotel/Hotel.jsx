import "./hotel.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../../components/user/navbar/Navbar";
import Header from "../../../components/user/header/Header";
import MailList from "../../../components/user/mailList/MailList";
import Reserve from "../../../components/user/reserve/Reserve";

import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useFetch from "../../../hooks/useFetch";
import { SearchContext } from "../../../context/SearchContext";
import { AuthContext } from "../../../context/AuthContext";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`/hotels/${id}`);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(start, end) {
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBook = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="hotelContainer container">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <div className="hotel-head">
                <button className="bookNow" onClick={handleBook}>
                  Reserve or Book Now!
                </button>
                <h1 className="hotelTitle">{data.name}</h1>
              </div>
              <div className="hotelAddress">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "red" }}
                />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                {data.distance} m from Center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over <b>Rs. {data.cheapestPrice} </b>at this
                property and get a free airport taxi!
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.description}</p>
                </div>
                <div className="hotelDetailsPrice mx-auto">
                  <h1>Perfect for {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>Rs. {days * data.cheapestPrice * options.room}</b> (
                    {days} nights)
                  </h2>
                  <button onClick={handleBook}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
          </div>
          <MailList />
        </>
      )}
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
