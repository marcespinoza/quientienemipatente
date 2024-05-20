import React, { useState, useRef, useEffect } from 'react';
import { storage, textDB, } from '../../Firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { collection, where, query, getDocs } from 'firebase/firestore'
import { v4 } from "uuid";
import { addDoc } from '@firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Row, Col } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { ToastContainer, toast, Slide } from 'react-toastify';


export  default function FormFields({licensePlate, caller, updateParentVariable, toastError}) {

  
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
  const [showModal, setShowModal] = useState(false);
  const [hideImageInput, setHideImageInput] = useState(false);
  const formRef = useRef(null);
  const cookies = new Cookies('registered');
  const imageErrorToast = () => toast("Falta cargar una imagen!");


  async function uploadLicensePlateImage() {
        const uri = await resizeFile(licensePlate.imageName);
        const imageRef = ref(storage, `images/${licensePlate.imageName.name + v4()}`);
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
    
    async function uploadReportedLicensePlate() {
      const citiesRef = collection(textDB, "patentes_perdidas");
     const q = query(citiesRef, where("nro_patente", "==", nroPatente));
     const querySnapshot = await getDocs(q);
     if(querySnapshot.empty) {
      console.log("nichts");
    }
     querySnapshot.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
     });
      
          
      /* try {
        let docRef = valRef.where('nro_patente', '==', nroPatente);

        addDoc(valRef, {nro_patente:nroPatente,
                        provincia:"Formosa",
                        fecha:new Date().toLocaleString(),
                        celular:celular, 
                        correo:correo})
        console.log('Imagen subida correctamente')               
      } catch {
        console.log('Error subiendo imagen')
      } */
    } 

    function checkFormValidity() {
      if(caller==='reporter' && formRef.current.checkValidity())
        return true
      else if(caller==='uploader' && formRef.current.checkValidity()){
        if(licensePlate.imageName==null){
          toastError()
          return false
        } else {
          console.log(licensePlate)
          return true
        }
      }
      else 
        return false
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const isFormValid = checkFormValidity();    
      if (isFormValid) {
        setShowLoader(true)
        if(caller==='reporter')
          uploadReportedLicensePlate()
        else {
          uploadLicensePlateImage()
          updateParentVariable('')
        }
        setShowLoader(false)
        console.log('Form is valid! Submitting...');
        setShowImg(!showImg)
        formRef.current.reset();
        setNroPatente('')
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
      <Container fluid >
      <form ref={formRef} onSubmit={handleSubmit}>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>      
        <div className="col-md-5 mx-auto d-flex flex-column text-center">
              <>
              <div className="col-md-6 mx-auto text-center">
                <hr />
                <input required type="text"  className="form-control text-center" onChange={event => setNroPatente(event.target.value.toUpperCase().trim())} placeholder="Nro. patente"/>
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
