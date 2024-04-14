import React, { useEffect, useState } from 'react';
import { storage, textDB } from '../../Firebase/firebase';

import {Card, Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import {TextField, IconButton, Button} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import imagenPatente from '../../Assets/Projects/patente_bg.png'
import { collection, query, where } from 'firebase/firestore'
import {  getDocs } from '@firebase/firestore';
import ima from '../../Assets/about.png'
import Type from "./Type";


function Home() {

  const [enableSearchInput, setSearchInput] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [data, setData] = useState([]);

  const patentes = [
    { txtVal:'Russia', imgUrl:ima},
    { txtVal:'Japan', imgUrl:ima},
    { txtVal:'Japon', imgUrl:ima},
    { txtVal:'Russio', imgUrl:ima}
  ];

  const getData = async () => {
    console.log(searchText);

    const q = query(
      collection(textDB, 'patentes'),
      where('nro_patente', "==", searchText)
    );
    console.log("after");

    const dataDb = await getDocs(q)
    const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
    console.log(allData);

    setData(allData)
  }

  const onSearchChange = (e) => {
    if(e.target.value.length >= 6){
      e.preventDefault();
      setSearchInput(false);
      setSearchText(e.target.value);
    } else {
      setSearchInput(true)
      setSearchText(e.target.value)
    }
  };

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
        <Row className="justify-content-center align-items-center" style={{ position: 'relative', height: '50vh' }}>
          <Col md={5} className="d-flex justify-content-center align-items-center"
            style={{
              position: 'absolute',
              backgroundImage:`url(${imagenPatente})`, 
              backgroundPosition: "center", 
              backgroundRepeat:'no-repeat',
              backgroundSize: "contain", 
              width: "50%", // Modifica el ancho para que ocupe todo el ancho del Row
              height:'80%', 
              maxHeight: "450px",
              textAlign: 'center' 
            }}>  
          <div style={{ width: "35%" }}> {/* Contenedor que limita el ancho del TextField */}
              <div className="d-flex justify-content-center"> {/* Contenedor para centrar el TextField */}
              <Col>
                <TextField
                  id="nro_patente"
                  variant="standard"
                  value={searchText}
                  onChange={onSearchChange}
                  InputProps={{
                    style: {
                      width: "100%", // Reducción del ancho del TextField
                      fontSize: 35,
                      padding: 0,
                      
                      marginBottom:"2%",
                      textAlign: 'center'
                    },
                    endAdornment: (
                      <IconButton disabled={enableSearchInput}>
                        <SearchOutlined />
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  size="medium"
                  disabled={enableSearchInput}
                  onClick={getData}
                  >
                  Buscar
                </Button>
                </Col>
              </div>
            </div>
  </Col>
</Row>
  </Container>
  </Container>
  <Container fluid className="home-about-section" id="about" >
  <Container>
  <Row >    
        {data.map((image, idx) => {
            return (
                <Col key={idx} xs={6} md={4} lg={3} >
                  <Card className="border border-dark border-1" >
                    <Card.Img  variant="center" style={{ display:'inline-block', width: '200px', height:'200px', backgroundSize:'cover', backgroundPosition:'center center'}}src={image.imgUrl}/ >
                      <Card.Body>
                        <Card.Text>
                        {image.txtVal}
                        </Card.Text>
                        <Card.Text>
                        "Marcelo"
                        </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
            )
        })}
        </Row>
        </Container>
        </Container>
    </section>
  );
}

export default Home;
