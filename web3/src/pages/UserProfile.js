import React from "react";
import { useCookies } from "react-cookie";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

const UserProfile = () => {
  const [cookies] = useCookies(["user"]);

  /*setUserID(cookies.user.UserID);
  setUserName(cookies.user.UserName);
  setName(cookies.user.Name);
  setUserEmail(cookies.user.Email);
*/
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={require("../assets/user copy.png")}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "300px" }}
                  fluid
                />
                <p
                  className="text-muted mb-1"
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  @{cookies.user == undefined ? "" : cookies.user.UserName}
                </p>
                <MDBBtn size="lg" outline rounded className="" color="#F3E5F5">
                  SAVE CHANGES
                </MDBBtn>{" "}
                <hr />
                <MDBBtn size="lg" outline rounded color="#800080">
                  LOG OUT
                </MDBBtn>
                <hr />
                <MDBBtn
                  size="lg"
                  outline
                  rounded
                  className="mx-2"
                  color="#800080"
                >
                  DELETE ACCOUNT
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    sm="3"
                    style={{
                      width: "15%",
                    }}
                  >
                    <MDBCardText
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      Name
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      style={{
                        fontSize: "2rem",
                      }}
                    >
                      {cookies.user == undefined ? "" : cookies.user.Name}{" "}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol
                    sm="3"
                    style={{
                      width: "15%",
                    }}
                  >
                    <MDBCardText
                      style={{
                        fontSize: "1.5rem",
                      }}
                    >
                      Email
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      style={{
                        fontSize: "2rem",
                      }}
                      className="text-muted"
                    >
                      {cookies.user == undefined ? "" : cookies.user.Email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default UserProfile;
