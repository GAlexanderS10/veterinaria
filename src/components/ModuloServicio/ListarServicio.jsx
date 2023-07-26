import React, { useState, useEffect } from 'react';
import '../../styles/Servicios.css';

const ListarServicio = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const response = await fetch('https://localhost:7266/api/Servicio');
        if (!response.ok) {
          throw new Error('Error al obtener los servicios.');
        }
        const data = await response.json(); 
        setServicios(data); 
      } catch (error) {
        console.error(error);
      }
    };

    obtenerServicios();
  }, []);

  return (

    <div>
      <div className="titulo-servicios">
        <h1  className='titulo-mascotas-cl'>Servicios que Ofrecemos</h1>
        <hr/>
      </div>
      <div className="contenedor-servicio">
        {servicios.map((servicio) => (
          <div key={servicio.servicioId} className="detalle-servicio">
            <figure>
              <img src={`https://localhost:7266/Uploads/${servicio.imagen}`} alt="" />
            </figure>
            <div className="contenido-card">
              <h3>{servicio.nombre}</h3>
              <div className='cuadro-card-detalle'>
              <p>{servicio.descripcion}</p>
              </div>
              <hr/>
              <br/>
              <div className='cuadro-card-precio'>
              <h4>Desde S/. {servicio.precio}0</h4>
              </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarServicio;
