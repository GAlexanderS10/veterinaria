import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ListarMascota.css';
import EditarMascota from './EditarMascota';
import EliminarMascota from './EliminarMascota'

const BuscarMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(null); // Estado para la mascota seleccionada

  // Función para obtener las mascotas por clienteId
  const fetchMascotasPorIdCliente = async () => {
    try {
      const clienteId = localStorage.getItem('clienteId'); // Obtener el clienteId almacenado en el localStorage
      const response = await axios.get(`https://localhost:7266/api/Mascota/cliente/${clienteId}`);
      setMascotas(response.data);
    } catch (error) {
      console.error('Error al obtener las mascotas del cliente:', error);
    }
  };

  // Función para manejar la eliminación de una mascota
  const handleDeleteMascota = (mascotaId) => {
    // Realizar la solicitud DELETE para eliminar la mascota
    axios.delete(`https://localhost:7266/api/Mascota/${mascotaId}`)
      .then((response) => {
        console.log(response.data);
        // Filtrar la mascota eliminada de la lista de mascotas
        setMascotas((prevMascotas) =>
          prevMascotas.filter((mascota) => mascota.mascotaId !== mascotaId)
        );
      })
      .catch((error) => {
        console.error('Error al eliminar la mascota:', error);
      });
  };

  useEffect(() => {
    // Llama a la función para obtener las mascotas al cargar el componente
    fetchMascotasPorIdCliente();
  }, []);

  // Función para manejar la edición de una mascota
  const handleEditMascota = (mascotaId, editedMascota) => {
    // Actualizar la lista de mascotas con la mascota editada
    setMascotas((prevMascotas) =>
      prevMascotas.map((mascota) =>
        mascota.mascotaId === mascotaId ? { ...mascota, ...editedMascota } : mascota
      )
    );
    setSelectedMascota(null); // Cerrar la ventana modal de edición después de actualizar la mascota
  };

  return (
    <>
      <h1 className='titulo-mascotas-cl'>MIS MASCOTAS</h1>
      <hr/>
      <div className="mascotas-container">
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
              <div className="espacios-btn">
                <button
                  className="btn-editar-cliente"
                  onClick={() => setSelectedMascota(mascota)} // Establecer la mascota seleccionada en el estado
                >
                  <i className='bx bx-edit'></i>
                </button>
                <EliminarMascota mascotaId={mascota.mascotaId} fetchMascotasPorIdCliente={fetchMascotasPorIdCliente} onDelete={() => handleDeleteMascota(mascota.mascotaId)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMascota && (
        <EditarMascota
          mascota={selectedMascota}
          closeModal={() => setSelectedMascota(null)} // Función para cerrar la ventana modal
          fetchMascotasPorIdCliente={fetchMascotasPorIdCliente}
          onEdit={handleEditMascota} // Pasar la función para manejar la edición
        />
      )}
    </>
  );
};

export default BuscarMascota;
