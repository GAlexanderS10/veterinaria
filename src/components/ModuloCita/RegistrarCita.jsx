import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/RegistrarCita.css';

const RegistrarCita = ({ fetchCitasConMascota }) => {
  const [estadoCita, setEstadoCita] = useState('Espera');

  const [modalOpen, setModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [mascotas, setMascotas] = useState([]);


  const clienteId = localStorage.getItem('clienteId') || '';

  const [formData, setFormData] = useState({
    ClienteId: clienteId,
    MascotaId: '',
    TipoServicio: '',
    FechaCita: '',
    Hora: '',
    Estado: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7266/api/Cita/crearCita', {
        ...formData,
        Estado: estadoCita,
      });
      console.log('Cita creada exitosamente.');
      closeModal();
      fetchCitasConMascota();
      setEstadoCita('Espera');
    } catch (error) {
      console.error('Error al crear la cita:', error);
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

  useEffect(() => {
    const fechaHoraCita = new Date(formData.FechaCita + ' ' + formData.Hora);
    const fechaActual = new Date();
    if (fechaHoraCita < fechaActual) {
      setEstadoCita('Expirado');
    } else {
      setEstadoCita('Espera');
    }
  }, [formData.FechaCita, formData.Hora]);

  return (
    <div>
      <button className="btn-modal" onClick={openModal}>
        + Agregar Cita
      </button>
      <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-content">
          <span className="close-modal" onClick={closeModal}>
            &times;
          </span>
          <div className="contenedor-registro-cita">
            <h1 className="titulo-registro-cita">Registro de Cita</h1>
            <form className="formulario-cita" onSubmit={handleSubmit}>
              <div className="details-citas">
                <div hidden className="input-box-cita">
                  <span className="nombres-inputs">ClienteId</span>
                  <input
                    type="text"
                    name="ClienteId"
                    value={formData.ClienteId}
                    onChange={handleInputChange}
                    placeholder="ClienteId"
                    required
                    readOnly
                  />
                </div>
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
                <input type="submit" value="REGISTRAR" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarCita;
