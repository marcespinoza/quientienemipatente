import React, {useState } from 'react';
import {textDB } from '../../Firebase/firebase';

import {Card, Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import {TextField, Button} from '@mui/material';
import imagenPatente from '../../Assets/Projects/patente_bg.png'
import { collection, query, where, getDocs } from 'firebase/firestore'
import ima from '../../Assets/about.png'
import Modal from '../Modal/Modal';


function Home() {

  const [enableSearchInput, setSearchInput] = useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const patentes = [
    { txtVal:'Russia', imgUrl:ima},
    { txtVal:'Japan', imgUrl:ima},
    { txtVal:'Japon', imgUrl:ima},
    { txtVal:'Russio', imgUrl:ima}
  ];

  const getData = async () => {
    setData([])
    const q = query(
      collection(textDB, 'patentes'),
      where('nro_patente', "==", searchText)
    );
    const dataDb = await getDocs(q);
    if (!dataDb.empty) {
      const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
      console.log(allData)
      setData(allData)
    } else {
      console.log("No such document!")
      setOpenModal(true)
    }
  }

  const onSearchChange = (e) => {
    if(e.target.value.length >= 6){
      e.preventDefault();
      setSearchInput(false);
      setSearchText(("" + e.target.value).toUpperCase());
    } else {
      setSearchInput(true)
      setSearchText(("" + e.target.value).toUpperCase())
    }
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Modal 
          open={openModal} 
          onClose={() => setOpenModal(false)} />
        <Container className="home-content">
        <Row>
        <Col md="12" className="warning">
            <h5>Perdiste tu patente? Buscala acá</h5>
            <h5>Encontraste una patente? Subila acá.</h5>
        </Col>
        </Row>
        <Row className="justify-content-center align-items-center" style={{ position: 'relative', height: '30vh' }}>
          <Col md={5} className="d-flex justify-content-center align-items-center"
            style={{
              position: 'absolute',
              backgroundImage:`url(${imagenPatente})`, 
              backgroundPosition: "center", 
              backgroundRepeat:'no-repeat',
              backgroundSize: "contain", 
              width: "80%", 
              height:'80%', 
              textAlign: 'center' 
            }}>  
              <div className="d-flex justify-content-center"> 
              <div style={{ width: "65%" }}> 

              <Col className="d-flex justify-content-center align-items-center">
                <TextField
                  id="nro_patente"
                  autoComplete="off"
                  variant="standard"
                  value={searchText}
                  onChange={ e => onSearchChange(e)}
                  InputProps={{
                    style: {
                      width: "100%", 
                      height: "30%",
                      fontSize: 35,
                      padding: 0,                      
                      marginBottom:"2%",
                    },
                  }}
                />
                </Col>
              </div>
            </div>
  </Col>
  </Row>
    <Row className="justify-content-center align-items-center">
      <Col className="d-flex justify-content-center align-items-center">
        <Button
          className="search-button-mobile"
          variant="contained"
          onClick={getData}>
          Buscar
        </Button>
      </Col>
    </Row>
       <Container fluid className="home-about-section" id="about" >
        <Container>
        <Row className="d-flex justify-content-center">    
              {data.map((data, idx) => {
                  return (
                      <Col key={idx} xs={6} md={4} lg={3} >
                        <Card className="border border-dark border-1" style={{backgroundColor: "#212529"}} >
                          <Card.Img  variant="center" style={{ display:'inline-block', backgroundSize:'cover', backgroundPosition:'center center'}}src={data.imgUrl}/ >
                            <Card.Body>
                              <Card.Text>
                              {data.txtVal}
                              </Card.Text>
                              <Card.Text  style={{color: "white"}}>
                                {data.celular}
                              </Card.Text>
                              <Card.Text style={{color: "white"}}>
                                {data.correo}
                              </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                  )
              })}
              </Row>
        </Container>
        </Container>
  </Container>
  </Container>
  
    </section>
  );
}

export default Home;
