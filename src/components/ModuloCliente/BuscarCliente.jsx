import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PerfilCliente.css';

const BuscarCliente = () => {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del cliente por DNI
    const obtenerClientePorDNI = async () => {
      const dniUsuario = localStorage.getItem('dni');
      try {
        const response = await axios.get(`https://localhost:7266/api/Cliente/Dni/${dniUsuario}`);
        setCliente(response.data);

        // Almacenar el ID del cliente en el localStorage
        localStorage.setItem('clienteId', response.data.clienteId);
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
      }
    };

    obtenerClientePorDNI();
  }, []);

  return (
    <div>
      {cliente ? (
        <div>
          <h1 className="titulo-cliente-cl">BIENVENIDO</h1>
          <div className="card_datos_cliente">
            <div className="card__perfil">
              <div className="card__nombre">
                <img className="img-cliente" src="https://www.markuptag.com/images/user-img-1.jpg" alt="" />
              </div>
              <div className="card__descripcion">
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">ID:</span> <span className="campos-card">{cliente.clienteId}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Nombres:</span> <span className="campos-card">{cliente.nombres}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Apellidos:</span> <span className="campos-card">{cliente.apellidos}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Dni:</span> <span className="campos-card">{cliente.dni}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Celular:</span> <span className="campos-card">{cliente.celular}</span>
                </div>
                <div className="detalle-texto-cliente">
                  <span className="subtitulo-cliente">Email:</span> <span className="campos-card">{cliente.email}</span>
                </div>
              </div>
              <hr />
              <div className="card__button">
                <button className="btn-editar-cliente">
                  <i className='bx bx-edit'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default BuscarCliente;
