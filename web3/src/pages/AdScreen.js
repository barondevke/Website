import React from "react";
import { useAdContext } from "../components/AdContext";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";

const AdScreen = () => {
  const [message, setMessage] = useState();
  function getRating(number) {
    let rating = "";
    for (let iteration = 0; iteration < number; iteration++) {
      rating += "⭐";
    }
    console.log(rating);
    return rating;
  }
  const { adInfo } = useAdContext();
  console.log(adInfo);
  return (
    <Row>
      <Col md={6}>
        <div className="adDetails">
          {adInfo.Paid === true && (
            <div className="crownDiv">
              <img
                id="crown"
                className="socialsIcon"
                src={require("../assets/crown.png")}
                alt="Crown Icon"
              />
            </div>
          )}

          <div className="adScreenimgDiv">
            <img
              src={adInfo.ImageUrl[0]}
              alt={`Ad`}
              className="adScreenimg-fluid"
            />
          </div>

          <div className="adName">{adInfo.Name}</div>
          <h4 className="adUserName">@{adInfo.UserName}</h4>
          <h5>{adInfo.Details}</h5>
          <h4 className="adLocation">{adInfo.Location}</h4>
          <h3 className="adRating">
            {adInfo.AverageRating === 0 ? (
              <h4>Not Rated ⭐</h4>
            ) : (
              getRating(adInfo.AverageRating)
            )}
          </h3>

          <h6>{adInfo.Ago}</h6>
          <div className="commentBox">
            <h3>Comments</h3>
            <h5>@user123</h5>
            <h7>Nice Service!</h7>
          </div>
        </div>
      </Col>
      <Col>
        <div className="messageBox">
          <h4>@user123</h4>
          <form className="form">
            <div className="messageForm">
              <input
                className="form-control mr-sm-2"
                type="message"
                placeholder="Type a message"
                aria-label="Type a message"
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="mapsImage">
          <img
            className="map"
            src="https://www.kachwanya.com/wp-content/uploads/2015/11/kachtech4.jpg"
          />
        </div>

        <div className="rateContainer">
          <h4>Rate this Place</h4>
          <h5>⭐⭐⭐⭐⭐</h5>
        </div>
      </Col>
    </Row>
  );
};

export default AdScreen;
