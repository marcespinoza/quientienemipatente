import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { SiGooglehome } from "react-icons/si";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsQuestionSquare } from "react-icons/bs";
import { BsMegaphoneFill } from "react-icons/bs";


function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <SiGooglehome />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">         
          <Nav.Item>
            <Nav.Link as={Link} to="/licenseplateuploader" onClick={() => updateExpanded(false)}>
              <FaArrowAltCircleUp style={{ marginBottom: "2px" }} /> Subir imagen patente
            </Nav.Link>
          </Nav.Item>  
          <Nav.Item>
            <Nav.Link as={Link} to="/licenseplatereporter" onClick={() => updateExpanded(false)}>
              <BsMegaphoneFill style={{ marginBottom: "2px" }} /> Reportar mi patente
            </Nav.Link>
          </Nav.Item>      
          <Nav.Item>
              <Nav.Link
                as={Link} to="/about"  onClick={() => updateExpanded(false)}>
                <BsQuestionSquare style={{ marginBottom: "2px" }} />Preguntas frecuentes
              </Nav.Link>
          </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
