import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/RegistrarStyles.css';

const Registrar = ({ fetchServicios }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: '',
    Descripcion: '',
    Precio: 0,
    Imagen: null,
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, Imagen: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataWithFile = new FormData();
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }
      const response = await axios.post('https://localhost:7266/api/Servicio', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {

        console.log('Servicio registrado exitosamente.');
        closeModal();
        fetchServicios(); 
      } else {

        console.error('Error al registrar el servicio.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <button className="btn-modal" onClick={openModal}> + Agregar Servicio</button>
      <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="contenedor-registro-cliente">
            <div className="titulo-registro-cliente">Registro de Servicio</div>
            <form className="formulario-cliente" onSubmit={handleSubmit}>
              <div className="detalles-clientes">
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Nombre</span>
                  <input
                    type="text"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleInputChange}
                    placeholder="Ingresar Nombre"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Descripción</span>
                  <textarea
                    name="Descripcion"
                    value={formData.Descripcion}
                    onChange={handleInputChange}
                    placeholder="Ingresar Descripción"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Precio</span>
                  <input
                    type="number"
                    name="Precio"
                    value={formData.Precio}
                    onChange={handleInputChange}
                    placeholder="Ingresar Precio"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Imagen</span>
                  <input
                    type="file"
                    name="Imagen"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
              </div>
              <div className="btn-cli-add">
                <input type="submit" value="REGISTRAR" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrar;
