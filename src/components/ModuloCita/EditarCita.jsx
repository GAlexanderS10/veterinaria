import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/RegistrarCita.css';

const ActualizarCita = ({ cita, isOpen, onClose, handleUpdateCita }) => {
  const [estadoCita, setEstadoCita] = useState('Espera');
  const [services, setServices] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  const clienteId = localStorage.getItem('clienteId') || '';

  const [formData, setFormData] = useState({
    MascotaId: cita.MascotaId,
    TipoServicio: cita.TipoServicio,
    FechaCita: cita.FechaCita,
    Hora: cita.Hora,
    Estado: cita.Estado,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7266/api/Cita/actualizarCita/${cita.NroCita}`, formData);
      handleUpdateCita(formData); 
      onClose(); 
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get('https://localhost:7266/api/Servicio');
        setServices(response.data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    const getMascotasCliente = async () => {
      try {
        const response = await axios.get(`https://localhost:7266/api/Mascota/cliente/${clienteId}`);
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas del cliente:', error);
      }
    };

    getServices();
    getMascotasCliente();
  }, [clienteId]);

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>
          &times;
        </span>
        <div className="contenedor-actualizar-cita">
          <h1 className="titulo-actualizar-cita">Actualizar Cita</h1>
          <form className="formulario-cita" onSubmit={handleSubmit}>
            <div className="details-citas">
              <div className="input-box-cita">
                <span className="nombres-inputs">Mascota</span>
                <select
                  name="MascotaId"
                  value={formData.MascotaId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Seleccione a su mascota
                  </option>
                  {mascotas.map((mascota) => (
                    <option key={mascota.mascotaId} value={mascota.mascotaId}>
                      {mascota.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box-cita">
                <span className="nombres-inputs">Tipo de Servicio</span>
                <select
                  name="TipoServicio"
                  value={formData.TipoServicio}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Seleccione un servicio
                  </option>
                  {services.map((service) => (
                    <option key={service.servicioId} value={service.nombre}>
                      {service.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box-cita">
                <span className="nombres-inputs">Fecha de Cita</span>
                <input
                  type="date"
                  name="FechaCita"
                  value={formData.FechaCita}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box-cita">
                <span className="nombres-inputs">Hora</span>
                <input
                  type="time"
                  name="Hora"
                  value={formData.Hora}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div hidden className="input-box-cita">
                <span className="nombres-inputs">Estado</span>
                <input
                  type="text"
                  name="Estado"
                  value={estadoCita} 
                  onChange={(event) => setEstadoCita(event.target.value)} 
                  placeholder="Estado"
                  required
                  readOnly
                />
              </div>
            </div>
            <div className="btn-cli-add">
              <input type="submit" value="ACTUALIZAR" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarCita;
