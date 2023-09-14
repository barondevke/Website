import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const StyledNavLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    position: relative;

    &.current {
      border-bottom: 3px solid red;
    }
  `;

  const handleSignOut = async () => {
    navigate("/signIn");
    removeCookie("user", [], { path: "/" });
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <Nav.Link>
              <StyledNavLink to="/" activeClassName="current" exact>
                ADINFINITE
              </StyledNavLink>
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link>
                <StyledNavLink to="/createAd" activeClassName="current" exact>
                  Your Ads
                </StyledNavLink>
              </Nav.Link>
              <Nav.Link>
                <StyledNavLink to="/search" activeClassName="current" exact>
                  Search
                </StyledNavLink>
              </Nav.Link>

              {cookies.user == undefined ? (
                <Nav.Link>
                  <StyledNavLink to="/signIn" activeClassName="current" exact>
                    Sign In
                  </StyledNavLink>
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link>
                    <StyledNavLink
                      onClick={handleSignOut}
                      activeClassName="current"
                      exact
                    >
                      Sign Out
                    </StyledNavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <StyledNavLink
                      to="/userProfile"
                      activeClassName="current"
                      exact
                    >
                      My Profile
                    </StyledNavLink>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
