import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Table.css';

const Cliente = () => {
  const [servicios, setServicios] = useState([]);


  const fetchServicios = () => {
    axios.get('https://localhost:7266/api/Servicio')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de servicios:', error);
      });
  };

  useEffect(() => {
    
    fetchServicios();
  }, []);

  return (
    <>
      <br />
      <br />
      <h1>Módulo Servicios</h1>
      <br />
      <hr/>
      <br />
      <table className="table-cliente">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.servicioId}>
              <td className="celda-cliente">{servicio.servicioId}</td>
              <td className="celda-cliente">{servicio.nombre}</td>
              <td className="celda-cliente">{servicio.descripcion}</td>
              <td className="celda-cliente">{servicio.precio}0</td>
              <td className="celda-cliente">
                {servicio.imagen && (
                  <img
                    src={`https://localhost:7266/Uploads/${servicio.imagen}`}
                    alt={`Foto de ${servicio.imagen}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </>
  );
};

export default Cliente;
