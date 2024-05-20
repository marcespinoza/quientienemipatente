import React, { useState, useRef, useEffect } from 'react';
import { storage, textDB } from '../../Firebase/firebase';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { collection } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc } from '@firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Row, Col } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import FormFields from '../FormField/FormField';

export function LicensePlateReporter() {

    const [image, setImage] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    const [previewImage, setPreviewImage] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showImg, setShowImg] = useState(false);
    const [celular, setCelular] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [nroPatente, setNroPatente] = React.useState('');
    const [showLoader, setShowLoader] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hideImageInput, setHideImageInput] = useState(false);
    const formRef = useRef(null);
    const cookies = new Cookies('registered');


      const resizeFile = file =>
        new Promise(resolve => {
          Resizer.imageFileResizer(file, 400, 400, "JPEG", 25, 0, uri => {
            resolve(uri);
          });
      });

      useEffect(()=>{
        /* if (cookies.get('registered')) {
          setShowModal(false); //Modal does not open if cookie exists
        } else if (!cookies.get('registered')) {
           cookies.set('registered', 'true', {
            path: '/',
           }); */
           setShowModal(true); //Creates a cookie and shows modal.
        
      },[])

    return (
      <div>
      <Container fluid className="resume-section">
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Row>
        <Col md="12" className="warning">
            <h5>Antes de reportar tu patente, usá el buscador para ver si alguien ya la encontró.</h5>
        </Col>
      </Row>        
        <FormFields caller= 'reporter'/>
        </Row>
       </Container>
    </div>
    );
}

export default LicensePlateReporter;