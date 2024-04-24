import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            <br />
            Que fotos o imágenes puedo subir?
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Fotos o imágenes de patentes que encontraste, no de aquella que estás buscando.
            </li>
          </ul>
          <p style={{ textAlign: "justify" }}>
            <br />
            Como busco una patente?
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Para buscar una patente tenés que ingresar todos los números y letras, no se realiza una búsqueda
              parcial (Por ejemplo ingresando solo los números)
            </li>
          </ul>
          <p style={{ textAlign: "justify" }}>
            <br />
            Porque me pide celular y correo?
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> El celular y correo sirven para que te pueda contactar el dueño de la patente. No se utiliza
              para otros fines.
            </li>
          </ul>
          <p style={{ textAlign: "justify" }}>
            <br />
            Que pasa si ingreso mal algún dato?
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Para este caso y cualquier otra duda podes escribirme a marceloespinoza00@gmail.com
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
