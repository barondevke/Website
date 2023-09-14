import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    axios
      .post("http://192.168.0.105:3000/signIn", {
        Email: email,
        Password: password,
      })
      .then((response) => {
        const res = response.data;

        if (res.proceed) {
          console.log("Success");
          setCookie(
            "user",
            {
              Email: res.data.Email,
              Name: res.data.Name,
              UserID: res.data.UserID,
              UserImageUrl: res.data.UserImageUrl,
              UserName: res.data.UserName,
            },
            { path: "/" }
          );
          alert("Login Successful");
          console.log(cookies.user);
          navigate("/");
        } else {
          setErrorMessage(res.message);
          console.log("Error:", res.message);
          // Handle sign-in error here, show error message or take appropriate action
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setErrorMessage("A RARE ERROR OCCURRED");
        // Handle other types of errors here
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign In</h3>
              <form onSubmit={handleSignIn}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </form>
              {errorMessage && (
                <div className="text-danger mt-3">{errorMessage}</div>
              )}
              <div>
                <Link to="/signUp">Don't have an account? Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
