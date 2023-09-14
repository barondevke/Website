import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

const CreateAd = () => {
  const [cookies] = useCookies(["user"]);
  const [createBtnClicked, setCreateBtnClicked] = useState(true);
  const [dataReceived, setDataReceived] = useState([]);
  const [selectedAdIndex, setSelectedAdIndex] = useState(null); // Track the index of the selected ad
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [businessData, setBusinessData] = useState({
    name: "",
    keywords: "",
    address: "",
    email: "",
    telephone: "",
    pricing: "",
    website: "",
    details: "",
    AdID: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessData({
      ...businessData,
      [name]: value,
    });
  };
  const getAdData = async () => {
    try {
      const value = await cookies.user.UserID;
      setUserID(value);
      const value2 = await cookies.user.UserName;
      setUserName(value2);
      const response = await axios.get(
        `http://192.168.0.105:3000/getPersonalAdData/${value}`
      );
      setDataReceived(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdData();
  }, []);
  const handleAdClick = (index) => {
    setCreateBtnClicked(false);
    setSelectedAdIndex(index);
    const selectedAd = dataReceived[index];

    // Populate the businessData state with selected ad data
    setBusinessData({
      name: selectedAd.Name || "",
      keywords: selectedAd.KeyWords || "",
      address: selectedAd.Location || "",
      email: selectedAd.Contact || "",
      pricing: selectedAd.Pricing || "",
      website: selectedAd.Link || "",
      details: selectedAd.Details || "",
      AdID: selectedAd._id || "",
    });
  };

  const handleCreateAdClick = () => {
    setCreateBtnClicked(true);
    setSelectedAdIndex(null);
    // Clear the form when creating a new ad
    setBusinessData({
      name: "",
      keywords: "",
      address: "",
      email: "",
      pricing: "",
      website: "",
      details: "",
    });
  };

  // ... Your existing code for handleSubmit ...
  const handleSubmit = (event) => {
    event.preventDefault();
    const removeTrailingWhitespace = (str) => {
      let i = str.length - 1;

      while (i >= 0 && str.charAt(i) === " ") {
        i--;
      }

      return str.slice(0, i + 1);
    };
    const today = new Date();
    const nextWeekTime = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const currentTime = new Date(today.getTime());

    if (createBtnClicked) {
      axios
        .post(`http://192.168.0.105:3000/uploadAdData`, {
          Name: removeTrailingWhitespace(businessData.name),
          KeyWords: removeTrailingWhitespace(businessData.keyWords),
          Location: removeTrailingWhitespace(businessData.address),
          Pricing: businessData.pricing,
          Paid: false,
          Plan: "None",
          Contact: businessData.email,
          Link: businessData.website,
          Details: businessData.details,
          Coordinates: {
            coordinates: {},
          },
          UserID: userID,
          UserName: userName,
          ImageUrl: [],
          ExpiryDate: null,
          Rating: 0,
          NumRated: 0,
          AverageRating: 0,
          DateCreated: currentTime,
          Enabled: true,
        })
        .then((res) => {
          console.log(res.data);
        });
    } else {
      axios
        .put(`http://192.168.0.105:3000/uploadAdData`, {
          Name: businessData.name,
          KeyWords: businessData.keyWords,
          Location: businessData.address,
          Pricing: businessData.pricing,
          Paid: false,
          Plan: "None",
          Contact: businessData.email,
          Link: businessData.website,
          Details: businessData.details,
          Coordinates: {
            coordinates: {},
          },
          UserID: userID,
          UserName: userName,
          ImageUrl: [],
          ExpiryDate: null,
          Rating: 0,
          NumRated: 0,
          AdID: businessData.AdID,
          AverageRating: 0,
          DateCreated: currentTime,
          Enabled: true,
        })
        .then((res) => {
          console.log(res.data);
          alert("Ad successfully edited!");
        });
    }

    console.log("Submitted data:", businessData);
  };
  return (
    <div className="createAdDiv">
      {cookies.user == undefined ? (
        <h2>Please Sign In</h2>
      ) : (
        <>
          <div className="adButtons">
            <Button onClick={handleCreateAdClick}>Create Ad</Button>

            {dataReceived.map((item, index) => (
              <Button key={index} onClick={() => handleAdClick(index)}>
                {item.Name}
              </Button>
            ))}
          </div>
          <Row>
            {selectedAdIndex !== null && (
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={businessData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="keywords">
                    <Form.Control
                      type="text"
                      name="keywords"
                      placeholder="KeyWords"
                      value={businessData.keywords}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={businessData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={businessData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="pricing">
                    <Form.Control
                      type="text"
                      name="pricing"
                      placeholder="Pricing"
                      value={businessData.pricing}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="website">
                    <Form.Control
                      type="text"
                      name="website"
                      placeholder="Website"
                      value={businessData.website}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="details">
                    <Form.Control
                      as="textarea"
                      name="details"
                      placeholder="Details"
                      value={businessData.details}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <br />

                  <Button onSubmit={handleSubmit} type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            )}

            {createBtnClicked && (
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={businessData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="keywords">
                    <Form.Control
                      type="text"
                      name="keywords"
                      placeholder="KeyWords"
                      value={businessData.keywords}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={businessData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={businessData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="pricing">
                    <Form.Control
                      type="text"
                      name="pricing"
                      placeholder="Pricing"
                      value={businessData.pricing}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="website">
                    <Form.Control
                      type="text"
                      name="website"
                      placeholder="Website"
                      value={businessData.website}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="details">
                    <Form.Control
                      as="textarea"
                      name="details"
                      placeholder="Details"
                      value={businessData.details}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <br />

                  <Button onSubmit={handleSubmit} type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default CreateAd;
