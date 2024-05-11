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

    async function subirPatenteConImagen() {
        if (imageUpload == null) {
          
        } else {
          const uri = await resizeFile(imageUpload);
          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
          return await uploadString(imageRef, uri, 'data_url').then(data => {
            getDownloadURL(data.ref).then(val =>{
              const valRef = collection(textDB, 'patentes')
              try {
                addDoc(valRef, {nro_patente:nroPatente,
                                provincia:"Formosa",
                                fecha:new Date().toLocaleString(),
                                celular:celular, 
                                correo:correo, 
                                imgUrl: val})
                console.log('Imagen subida correctamente')               
              } catch {
                console.log('Error subiendo imagen')
              }
            }).catch(error => {
              console.error("Error saving post : ", error);
          })
          }).catch(error => {
            console.error("Error saving post : ", error);
        })
       }
      }             

      const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = formRef.current.checkValidity();    
        if (isFormValid) {
          setShowLoader(true)
          const result = subirPatenteConImagen()
          setShowLoader(false)
          console.log('Form is valid! Submitting...'+result);
          setShowImg(!showImg)
          formRef.current.reset();
        } else {
          console.log('Form is not valid. Please check your inputs.');
        }
      };

      const resizeFile = file =>
        new Promise(resolve => {
          Resizer.imageFileResizer(file, 400, 400, "JPEG", 25, 0, uri => {
            resolve(uri);
          });
      });

      const handleModalOptions = () => {
        setShowModal(false)
      };

      const encontrePatente = () => {
        setHideImageInput(true)
        setShowModal(false)
      };

      const buscoPatente = () => {
        setShowModal(false)
      };

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