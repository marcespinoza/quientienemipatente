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
import Cookies from 'universal-cookie';
import FormFields from '../FormField/FormField';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function LicensePlateUploader() {

    const [progress, setProgress] = React.useState(0);
    const [previewImage, setPreviewImage] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showImg, setShowImg] = useState(false);
    const [showLoader, setShowLoader] = React.useState(false);
    const [showModal, setShowModal] = useState(false);
    const formRef = useRef(null);

      const updateParentVariable = (newValue) => {
        formRef.current.reset()
        setShowImg(false)
        setImageUpload(null)
      };

      const showToastError = () => {
        console.log('call toast')
        toast.warn('Falta seleccionar imagen', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      };

      const handleModalOptions = () => {
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
        <ToastContainer/>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Row>
        <Col md="12" className="warning">
            <h5>Antes de subir la foto de la patente que encontraste, fijate en el buscador si alguien
              ya lo reportó.</h5>
          </Col>
      </Row>    
      <form ref={formRef} >    
        <div className="col-md-5 mx-auto d-flex flex-column text-center">
              <input
                required
                type="file"
                id='selectFile'
                accept="image/*"
                onChange={(e) => {
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  setImageUpload(e.target.files[0]);
                  setShowImg(!showImg)
                }}
                className="form-control mt-5 mb-2"
              />
               {showImg && <img id="previewImage" src={previewImage} alt="image"/>}           
        </div>
        </form> 
        <FormFields licensePlate={{ imageName: imageUpload}} 
                    caller= 'uploader' 
                    updateParentVariable={updateParentVariable}
                    toastError={showToastError}/>
        </Row>
       </Container>
    </div>
    );
}

export default LicensePlateUploader;