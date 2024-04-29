import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillInstagram,
  AiFillFacebook 
} from "react-icons/ai";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  
  return (
    <Container fluid className="footer">
      <Row>       
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="footer-copywright social-icons">
            <h3>Idea y desarrollo: Marcelo Espinoza</h3>

            </li>
            <li className="social-icons">
              <a
                href="https://www.facebook.com/groups/791116471254328/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillFacebook />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/quientienemipatente/?igsh=MWoyZHltaDQ3YzVpeQ%3D%3D"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Formosa - Argentina</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
