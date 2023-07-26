import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ListarMascota.css';

const BuscarMascota = () => {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Función para obtener las mascotas por clienteId
    const obtenerMascotasPorIdCliente = async () => {
      try {
        const clienteId = localStorage.getItem('clienteId'); // Obtener el clienteId almacenado en el localStorage
        const response = await axios.get(`https://localhost:7266/api/Mascota/cliente/${clienteId}`);
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas del cliente:', error);
      }
    };

    obtenerMascotasPorIdCliente();
  }, []);

  return (
    <>
    <h1 className='titulo-mascotas-cl'>MIS MASCOTAS</h1>
    <div className="contenedor-card-mascota">
      {Array.isArray(mascotas) && mascotas.map((mascota) => (
        <div key={mascota.mascotaId} className="card-contenido-mascota">
          <div className="imagen-card-mascota">
            {/* Aquí puedes mostrar la foto de la mascota */}
            <img
              src={`https://localhost:7266/Uploads/${mascota.foto}`}
              alt={`Foto de ${mascota.nombre}`}
              
            />
          </div>
          <div className="detalle-card-mascota">
            <div className="detalle-texto-mascota">
              <h1 className='titulo-mascota-card'>Carnet de Mascota</h1>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">ID:</span> <span className="campos-card">{mascota.mascotaId}</span>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">Nombre:</span> <span className="campos-card">{mascota.nombre}</span>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">Especie:</span> <span className="campos-card">{mascota.tipoMascota}</span>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">Raza:</span> <span className="campos-card">{mascota.raza}</span>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">Sexo:</span> <span className="campos-card">{mascota.sexo}</span>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">Color:</span> <span className="campos-card">{mascota.color}</span>
            </div>
            <div className="detalle-texto-mascota">
              <span className="subtitulo-mascota">Fecha de Nacimiento:</span> <span className="campos-card">{new Date(mascota.fechaNacimiento).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default BuscarMascota;
