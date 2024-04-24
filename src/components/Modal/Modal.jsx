import React from 'react';
import '../Modal/modal.css'

const Modal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <h3>No se encontró ninguna patente</h3>
            <p>Recordá que debes ingresar el número de patente completo.</p>
          </div>
          <div className='btnContainer'>
            <button className='btnOutline' onClick={onClose}>
              <span className='bold'>Entiendo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;