import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Eliminar.css'; 

const EliminarCita = ({ nroCita, onClose, handleDeleteCita }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    axios.delete(`https://localhost:7266/api/Cita/eliminarCita/${nroCita}`)
      .then((response) => {
        console.log(response.data); 
        closeModal();
        handleDeleteCita(nroCita) 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button className="btn-eliminar-cliente" onClick={openModal}>
        <i className='bx bx-message-alt-x'></i>
      </button>
      <div className={`mdl ${modalOpen ? 'mdl-open' : ''}`}>
        <div className="mdl-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="contenedor-mensaje">
            <div className="mensaje-eliminar">¿Desea eliminar esta cita?</div>
            <div className="btn-container">
              <button className="btn-confirmar-eliminar" onClick={handleDelete}>Confirmar</button>
              <button className="btn-cancelar-eliminar" onClick={closeModal}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliminarCita;
