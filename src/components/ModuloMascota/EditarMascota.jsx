import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/RegistrarStyles.css';

const EditarMascota = ({ mascota, closeModal, fetchMascotasPorIdCliente }) => {
  const [formData, setFormData] = useState({
    nombre: mascota.nombre,
    tipoMascota: mascota.tipoMascota,
    raza: mascota.raza,
    sexo: mascota.sexo,
    color: mascota.color,
    fechaNacimiento: mascota.fechaNacimiento.split('T')[0], // Formatea la fecha para el input date
    foto: null, // Campo para almacenar la nueva foto, inicializado como null
    clienteId: mascota.clienteId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, foto: file }); // Actualizar el campo de foto con la nueva imagen seleccionada
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataWithFile = new FormData();

    // Agregar los datos al FormData para enviar al servidor
    for (const key in formData) {
      formDataWithFile.append(key, formData[key]);
    }

    // Si no se seleccionó una nueva imagen, mantener la imagen actual
    if (!formData.foto) {
      formDataWithFile.append('foto', mascota.foto);
    }

    axios.put(`https://localhost:7266/api/Mascota/${mascota.mascotaId}`, formDataWithFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        closeModal();
        fetchMascotasPorIdCliente(formData.clienteId); // Llama a la función para actualizar las mascotas en el componente que muestra la lista de mascotas
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="contenedor-registro-cliente">
          <div className="tiulo-registro-cliente">Actualizar Datos de la Mascota</div>
          <form className="formulario-cliente" onSubmit={handleSubmit}>
            <div className="details-clientes">
              <div className="input-box-cliente">
                <span className="nombres-inputs">Nombre</span>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ingresar Nombre"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Tipo de Mascota</span>
                <input
                  type="text"
                  name="tipoMascota"
                  value={formData.tipoMascota}
                  onChange={handleInputChange}
                  placeholder="Ingresar Tipo de Mascota"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Raza</span>
                <input
                  type="text"
                  name="raza"
                  value={formData.raza}
                  onChange={handleInputChange}
                  placeholder="Ingresar Raza"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Sexo</span>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Seleccionar opción</option>
                  <option value="MACHO">Macho</option>
                  <option value="HEMBRA">Hembra</option>
                </select>
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Color</span>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Ingresar Color"
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Fecha de Nacimiento</span>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Foto Actual</span>
                <div>
                {mascota.foto && <img src={`https://localhost:7266/Uploads/${mascota.foto}`} alt={`Foto de ${mascota.nombre}`} style={{ width: '50px', height: '50px' }} className="foto-actual" />}
                </div>
              </div>
              <div className="input-box-cliente">
                <span className="nombres-inputs">Nueva Foto</span>
                <input
                  type="file"
                  name="foto"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div hidden className="input-box-cliente">
                <span className="nombres-inputs">ID del Cliente</span>
                <input
                  type="number"
                  name="clienteId"
                  value={formData.clienteId}
                  onChange={handleInputChange}
                  placeholder="Ingresar ID del Cliente"
                  readOnly // Hacemos el campo de solo lectura
                  required
                />
              </div>
            </div>
            <div className="btn-cli-add">
              <input type="submit" value="EDITAR" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarMascota;
