import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import AdContext from "../components/AdContext";
import { Link } from "react-router-dom";

function Homepage() {
  const [data, setData] = useState([]);
  const { setAdInfo } = useContext(AdContext);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://192.168.0.105:3000/HomeScreen/7"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getRating(number) {
    let rating = "";
    for (let iteration = 0; iteration < number; iteration++) {
      rating += "⭐";
    }

    return rating;
  }

  return (
    // ...

    <div className="adsContainer">
      <Row>
        {data.map((item, index) => (
          <Col key={index} md={4}>
            <div className="x" onClick={() => setAdInfo(item)}>
              <div className="adDetails">
                {item.Paid === true && (
                  <div className="crownDiv">
                    <img
                      id="crown"
                      className="socialsIcon"
                      src={require("../assets/crown.png")}
                      alt="Crown Icon"
                    />
                  </div>
                )}
                <Link to="/adScreen">
                  <div id={`img${index}`} className="imgDiv">
                    <img
                      src={item.ImageUrl[0]}
                      alt={`Ad ${index}`}
                      className="adImage"
                      height="400px"
                    />
                  </div>
                  <h1 className="adName">{item.Name}</h1>
                </Link>
                <h4 className="adUserName">@{item.UserName}</h4>
                <h4 className="adLocation">{item.Location}</h4>
                <h2 className="adRating">{getRating(item.AverageRating)}</h2>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <hr />
    </div>
  );
}

export default Homepage;
