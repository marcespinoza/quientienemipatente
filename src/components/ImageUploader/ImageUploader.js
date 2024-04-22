import React, { useState, useRef } from 'react';
import { storage, textDB } from '../../Firebase/firebase';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { collection } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc } from '@firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Row } from "react-bootstrap";
import Resizer from "react-image-file-resizer";


export function ImageUploader() {

    const [image, setImage] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    const [previewImage, setPreviewImage] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [showImg, setShowImg] = useState(false);
    const [celular, setCelular] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [nroPatente, setNroPatente] = React.useState('');
    const [showLoader, setShowLoader] = React.useState('');
    const formRef = useRef(null);

    async function uploadImage() {
        if (imageUpload == null) {
          
        } else {
          const uri = await resizeFile(imageUpload);

          const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
          return await uploadString(imageRef, uri, 'data_url').then(data => {
            getDownloadURL(data.ref).then(val =>{
              const valRef = collection(textDB, 'patentes')
              addDoc(valRef, {nro_patente:nroPatente,
                              provincia:"Formosa",
                              fecha:new Date().toLocaleString(),
                              celular:celular, 
                              correo:correo, 
                              imgUrl: val})
            })
          })
       }
      }             

      const handleSubmit = (event) => {
        event.preventDefault();
        const isFormValid = formRef.current.checkValidity();    
        if (isFormValid) {
          setShowLoader(true)
          const result = uploadImage()
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
          Resizer.imageFileResizer(file, 300, 300, "JPEG", 25, 0, uri => {
            resolve(uri);
          });
      });

      const nroPatenteChangeHandler = ({ event }) => {
        event.preventDefault();

        setNroPatente(event.target.value.toUpperCase())
      }

    return (
      <div>
      <Container fluid className="resume-section">
      <form ref={formRef} onSubmit={handleSubmit}>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="col-md-5 mx-auto d-flex flex-column text-center">
              <input
                required
                type="file"
                id='selectFile'
                accept="image/*"
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  setImageUpload(e.target.files[0]);
                  setShowImg(!showImg)
                }}
                className="form-control mt-5 mb-2"
              />
              {showImg && <img id="previewImage" src={previewImage} alt="image"/>}            
              <>
              <div className="col-md-6 mx-auto text-center">
                <hr />
                <input required type="text"  className="form-control text-center" onChange={event => setNroPatente(event.target.value.toUpperCase())} placeholder="Nro. patente"/>
              <hr />
                <input  required type="text" 
                        name="celular" 
                        pattern="[0-9]{10}" 
                        className="form-control text-center" 
                        onChange={(e) => { setCelular(e.target.value) }} 
                        placeholder="Celular"
                        onInvalid={e => e.target.setCustomValidity('Mínimo 10 caracteres')}
                        onInput={e => e.target.setCustomValidity("")}
                  />
              <hr />
                <input required type="email" name="correo"  className="form-control text-center" onChange={(e) => { setCorreo(e.target.value) }} placeholder="Correo"  />
              <input
                id="submit"
                type="submit"
                disabled={!showImg}
                className="btn btn-primary mt-5"
                value="Guardar"
              />
              </div>
            </>
        </div>
        </Row>
       </form> 
       </Container>
    </div>
    );
}

export default ImageUploader;