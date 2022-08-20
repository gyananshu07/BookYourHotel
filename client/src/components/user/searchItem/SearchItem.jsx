import { useState } from "react";
import { Link } from "react-router-dom";
import ReadMore from "../readmore/readmore";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <>
      <div className="cardContainer">
        <div className="topPart">
          <img src={item.photos[0]} alt="" className="siImg" />
        </div>
        <div className="contentPart">
          <div className="headerPart">
            <h1 className="siTitle">{item.name}</h1>
            <div className="siRating">
              {item.rating && (
                <>
                  <span>Excellent</span>
                  <button>{item.rating}</button>
                </>
              )}
            </div>
          </div>
          <div className="siDesc">
            <span className="siDistance">{item.distance} from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">{item.title}</span>
            <span className="siFeatures">
              <ReadMore>{item.description}</ReadMore>
            </span>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        </div>
        <div className="bottomPart">
          <div className="smallImages">
            {item.photos?.map((photo, i) => (
              <div className="smallImgWrapper" key={i}>
                <img src={photo} alt="" className="smallImage" />
              </div>
            ))}
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">Rs. {item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className="siCheckButton">See availability</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchItem;
