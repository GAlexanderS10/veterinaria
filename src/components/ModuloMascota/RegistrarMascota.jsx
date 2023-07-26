import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/RegistrarStyles.css';

const RegistrarMascota = ({ fetchMascotasPorIdCliente }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: '',
    TipoMascota: '',
    Raza: '',
    Sexo: '',
    Color: '',
    FechaNacimiento: '',
    Foto: null,
    ClienteId: localStorage.getItem('clienteId') || '', // Establecer el valor del clienteId desde el localStorage o un string vacío si no está disponible
  });

  useEffect(() => {
    // Obtenemos el clientId desde el localStorage al cargar el componente
    const clientIdFromLocalStorage = localStorage.getItem('clienteId');
    if (clientIdFromLocalStorage) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ClienteId: parseInt(clientIdFromLocalStorage, 10),
      }));
    }
  }, []); // Se ejecutará solo una vez al cargar el componente

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
    setFormData({ ...formData, Foto: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataWithFile = new FormData();
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }
    axios.post('https://localhost:7266/api/Mascota', formDataWithFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        closeModal();
        fetchMascotasPorIdCliente(formData.ClienteId); // Llama a la función para actualizar las mascotas en el componente que muestra la lista de mascotas
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button className="btn-modal" onClick={openModal}> + Agregar Mascota</button>
      <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-content">
          <span className="close-modal" onClick={closeModal}>&times;</span>
          <div className="contenedor-registro-cliente">
            <h1 className="titulo-registro-cliente">Registro de Mascota</h1>
            <form className="formulario-cliente" onSubmit={handleSubmit}>
              <div className="details-clientes">
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
                  <span className="nombres-inputs">Especie</span>
                  <select
                    name="TipoMascota"
                    value={formData.TipoMascota}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Seleccionar Especie</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Raza</span>
                  <input
                    type="text"
                    name="Raza"
                    value={formData.Raza}
                    onChange={handleInputChange}
                    placeholder="Ingresar Raza"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Sexo</span>
                  <select
                    name="Sexo"
                    value={formData.Sexo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Seleccionar Sexo</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Color</span>
                  <input
                    type="text"
                    name="Color"
                    value={formData.Color}
                    onChange={handleInputChange}
                    placeholder="Ingresar Color"
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Fecha de Nacimiento</span>
                  <input
                    type="date"
                    name="FechaNacimiento"
                    value={formData.FechaNacimiento}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">Foto</span>
                  <input
                    type="file"
                    name="Foto"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="input-box-cliente">
                  <span className="nombres-inputs">ID del Cliente</span>
                  <input
                    type="number"
                    name="ClienteId"
                    value={formData.ClienteId}
                    onChange={handleInputChange}
                    placeholder="Ingresar ID del Cliente"
                    readOnly // Hacemos el campo de solo lectura
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

export default RegistrarMascota;
