import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Homepage from "./HomePage";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const [expectedCode, setExpectedCode] = useState();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const removeTrailingWhitespace = (str) => {
      let i = str.length - 1;

      while (i >= 0 && str.charAt(i) === " ") {
        i--;
      }

      return str.slice(0, i + 1);
    };

    // Handle form submission, e.g., send data to the server
    axios
      .post("http://192.168.0.105:3000/verify", {
        Name: removeTrailingWhitespace(name),
        UserName: removeTrailingWhitespace(userName),
        Email: removeTrailingWhitespace(email),
        Password: removeTrailingWhitespace(password),
        DateCreated: currentDate,
        UserImageUrl: "",
        Contact: removeTrailingWhitespace(contact),
      })
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (res.proceed) {
          setSignedUp(true);
          setExpectedCode(res.verificationCode);
        } else {
          setErrorMessage(res.message);
        }
      });
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    console.log(verificationCode);
    if (verificationCode == expectedCode) {
      alert("Welcome to Adinfinite");
      navigate("/");

      // You can redirect the user to the dashboard or perform other actions upon successful verification.
    } else {
      setErrorMessage("Invalid verification code. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {signedUp ? (
        <div>
          <Alert variant="success">
            Sign up successful! Please enter your verification code.
          </Alert>
          <Form onSubmit={handleVerificationSubmit}>
            <Form.Group controlId="verificationCode">
              <Form.Control
                type="number"
                placeholder="Enter your verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Verify
            </Button>
          </Form>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="userName">
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="contact">
            <Form.Control
              type="text"
              placeholder="Enter your contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      )}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
};

export default SignUp;
