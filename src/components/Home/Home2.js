import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from '@mui/material/Button';
import buyMeACoffee from '../../Assets/buymeacoffee.png'

function Home2() {
  return (
    <Container className="home-about-section" fluid >
      <Row>
        <Col md="12">
            <Button variant="text" size="small" >
                <img src={buyMeACoffee} width="150" alt="folder"/>
            </Button>
        </Col>
        </Row>
    </Container>
  );
}
export default Home2;