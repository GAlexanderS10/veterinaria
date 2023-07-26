import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Table.css';
import ActualizarCita from './EditarCita'; 

const BuscarCita = () => {
  const [citasConMascota, setCitasConMascota] = useState([]);
  const [clienteId, setClienteId] = useState(null); 


  const [selectedCita, setSelectedCita] = useState(null);

  useEffect(() => {

    const clienteIdLocal = localStorage.getItem('clienteId');
    if (clienteIdLocal) {
      setClienteId(parseInt(clienteIdLocal)); 
    }
  }, []);

  useEffect(() => {
    if (clienteId !== null) {

      const obtenerCitasConMascota = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7266/api/cita/obtenerCitasConMascota/${clienteId}`
          );
          setCitasConMascota(response.data);
        } catch (error) {
          console.error('Error al obtener las citas con mascota:', error);
        }
      };

      obtenerCitasConMascota();
    }
  }, [clienteId]); 


  const handleSelectCita = (cita) => {
    setSelectedCita(cita);
  };

  const handleDeleteCita = (nroCita) => {
    axios.delete(`https://localhost:7266/api/Cita/eliminarCita/${nroCita}`)
      .then((response) => {
        console.log(response.data);
        setCitasConMascota((prevCitas) =>
          prevCitas.filter((cita) => cita.nroCita !== nroCita)
        );
      })
      .catch((error) => {
        console.error('Error al eliminar la cita:', error);
      });
  };

  return (
    <>
      <h1 className='titulo-mascotas-cl'>MIS CITAS</h1>
      <hr />
      <table className='table-cliente'>
        <thead>
          <tr>
            <th>Nro. Cita</th>
            <th>Nombre de Mascota</th>
            <th>Servicio</th>
            <th>Fecha de Registro</th>
            <th>Fecha de Cita</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citasConMascota.map((cita) => (
            <tr key={cita.nroCita}>
              <td className='celda-cliente'>{cita.nroCita}</td>
              <td className='celda-cliente'>{cita.nombreMascota}</td>
              <td className='celda-cliente'>{cita.tipoServicio}</td>
              <td className='celda-cliente'>
                {new Date(cita.fechaRegistro).toLocaleDateString()}
              </td>
              <td className='celda-cliente'>
                {new Date(cita.fechaCita).toLocaleDateString()}
              </td>
              <td className='celda-cliente'>{cita.hora}</td>
              <td className='celda-cliente'>{cita.estado}</td>
              <td>
                <button
                  className='btn-editar-cliente'
                  onClick={() => handleSelectCita(cita)} 
                >
                  <i className='bx bx-edit'></i>
                </button>
                <button
                  className='btn-eliminar-cliente'
                  onClick={() => handleDeleteCita(cita.nroCita)}
                >
                  <i className='bx bx-message-alt-x'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCita && (
        <ActualizarCita
          cita={selectedCita}
          isOpen={true} 
          onClose={() => setSelectedCita(null)} 
          handleUpdateCita={(updatedCita) => {
            setCitasConMascota((prevCitas) =>
              prevCitas.map((cita) =>
                cita.nroCita === updatedCita.nroCita ? { ...cita, ...updatedCita } : cita
              )
            );
          }}
        />
      )}
    </>
  );
};

export default BuscarCita;
