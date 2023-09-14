import debounce from "lodash/debounce"; // Import the debounce function
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { useAdContext } from "../components/AdContext";
import AdContext from "../components/AdContext";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Perform your search logic here using the query
  };
  const [searchValue, setSearchValue] = useState("ro");
  const [searchResults, setSearchResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const [numbers, setNumbers] = useState(10);
  const [noResults, setNoResults] = useState();
  const { setAdInfo } = useContext(AdContext);
  const [searchInProgress, setSearchInProgress] = useState(false);

  //const navigation = useNavigation();
  // const icon = require("../assets/search.png");
  // const magnifyGlass = require("../assets/magnifying-glass.gif");
  const crown = require("../assets/crown.png");

  const searchDb = async () => {
    const isBlank = /^\s*$|^\s{2,}/;
    if (!isBlank.test(searchValue)) {
      try {
        const number = 9;
        let searchURL = `http://192.168.0.105:3000/search/${searchValue}/${number}`;

        const response = await axios.get(searchURL);

        if (response.data.length !== 0) {
          const currentTime = new Date();
          const newData = response.data.map((item) => {
            const dateCreated = new Date(item.DateCreated);
            const timeDiff = currentTime.getTime() - dateCreated.getTime();
            const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Calculate the difference in hours

            let ago;
            if (hoursDiff === 0) {
              ago = "just now";
            } else if (hoursDiff === 24) {
              ago = "1 day ago";
            } else if (hoursDiff < 24) {
              ago = `${hoursDiff} hours ago`;
            } else {
              ago = dateCreated.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }

            return { ...item, Ago: ago };
          });
          if (searchValue !== "") {
            setSearchResults(newData);
          }
        } else {
          setNoResults(true);
          setSearchResults([]);
        }
      } catch (error) {
        // Handle error gracefully (e.g., display error message)
        console.error("Error searching items:", error);
      } finally {
        // Hide loading state here
      }
    } else {
      setSearchResults([]);
    }
  };
  const debouncedSearchDb = debounce(searchDb, 300);
  useEffect(() => {
    setNoResults(false);
    // Call the debounced function instead of searchDb directly
    debouncedSearchDb();
    // This cleanup function will cancel any pending debounced function calls
    return () => {
      debouncedSearchDb.cancel();
    };
  }, []);

  function getRating(number) {
    let rating = "";
    for (let iteration = 0; iteration < number; iteration++) {
      rating += "⭐";
    }
    console.log(rating);
    return rating;
  }

  console.log(searchResults);

  return (
    <div>
      <form className="form-inline my-2 my-lg-0">
        <div className="searchBarRow">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={searchDb}
          >
            Search
          </button>
        </div>
      </form>
      <Row className="searchRow">
        {searchResults.map((item, index) => (
          <Col className="searchCol" md={4}>
            <div className="adDetails">
              <Link to="/adScreen">
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

                <div
                  className="imgDiv"
                  onClick={() => {
                    setAdInfo(item);
                  }}
                >
                  <img
                    src={item.ImageUrl[0]}
                    alt={`Ad ${index}`}
                    className="img-fluid"
                  />
                </div>

                <div className="adName">{item.Name}</div>
              </Link>

              <h4 className="adUserName">@{item.UserName}</h4>
              <h4 className="adLocation">{item.Location}</h4>
              <h3 className="adRating">
                {item.AverageRating === 0 ? (
                  <h4>Not Rated ⭐</h4>
                ) : (
                  getRating(item.AverageRating)
                )}
              </h3>

              <h6>{item.Ago}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchPage;
