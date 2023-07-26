import React, { createRef, useState } from 'react';
import axios from 'axios';
import '../../styles/FormulariosStyles.css';
import ImgLogin from "../../assets/ImgIniciar.jpg";
import ImgRegistro from "../../assets/ImgRegistro.jpeg";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Formularios = () => {

    const navigate = useNavigate();

    // Estado para controlar los campos del formulario de inicio de sesión
  const [signInFormData, setSignInFormData] = useState({
    userName: '',
    password: '',
  });

  // Función para manejar el cambio de inputs en el formulario de inicio de sesión
  const handleSignInInputChange = (event) => {
    const { name, value } = event.target;
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });
  };

  // Función para iniciar sesión
  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost:7266/api/Autenticacion/Validar',
        signInFormData
      );
      
      const { token, dni } = response.data;

      // Guardar el token JWT en el Local Storage para su uso posterior
      localStorage.setItem('token', token);
      localStorage.setItem('dni', dni);
  
      // Mostrar el token y el DNI del usuario en la consola
      console.log('Token:', token);
      console.log('DNI del usuario:', dni);
  

      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido al sistema!',
      });

      // Limpiar los campos del formulario
      setSignInFormData({
        nombreUsuario: '',
        passw: '',
      });

      // Redireccionar a la página de menú
      navigate('/menu');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      // Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Revise los datos ingresados',
      });
    }
  };



    //----------------------------------------------------

  const containerRef = createRef();
  const formRef = createRef();
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    dni: '',
    celular: '',
    email: '',
    userName: '',
    password: ''
  });

  const handleSignUpClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add("sign-up-mode");
    }
  };
  
  const handleSignInClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove("sign-up-mode");
    }
  };
  

  const handleRegistroSubmit = async (event) => {
    event.preventDefault();

    try {
      const requiredFields = ['nombres', 'apellidos', 'dni', 'celular', 'email', 'userName', 'password'];

      // Verificar si algún campo requerido está vacío
      const isEmptyField = requiredFields.some((field) => !formData[field]);

      if (isEmptyField) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos del formulario.'
        });
        return;
      }

      // Enviar la solicitud de creación de usuario a la API
      const response = await axios.post('https://localhost:7266/api/Usuario/crearusuario', formData);
      const usuarioIdRecienCreado = response.data;

      console.log(`Usuario registrado con el UsuarioId: ${usuarioIdRecienCreado}`);

      // LIMPIAR LOS CAMPOS DEL FORMULARIO
      setFormData({
        nombres: '',
        apellidos: '',
        dni: '',
        celular: '',
        email: '',
        userName: '',
        password: ''
      });

      handleSignInClick();

      // ASIGNAR EL ROL "Cliente" AL USUARIO QUE SE REGISTRE CON ESTE FORMULARIO
      const asignarRolModel = {
        UsuarioId: usuarioIdRecienCreado,
        RolId: 4, // ROLID ESPECIFICO DEL ROL "Cliente"
      };

      await axios.post('https://localhost:7266/api/UsuarioRol/asignar-rol', asignarRolModel);

      console.log('Rol "Cliente" asignado al usuario exitosamente.');

      // Mostrar SweetAlert de éxito
      Swal.fire({
        icon: 'success',
        title: 'Registro de usuario exitoso',
        text: 'Ahora puede ingresar al sistema!'
      });

      handleSignInClick();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);

      // Mostrar SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el usuario',
        text: 'Revise los datos ingresados'
      });
    }
  };

  return (
    <div className="container-view-user">
      <div className="container" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">
          <form
  action="#"
  className={`sign-in-form ${showSignInForm ? 'visible' : ''}`}
  ref={formRef}
  onSubmit={handleSignInSubmit} // Asociamos el formulario con la función handleSignInSubmit
>
  {/* Formulario de inicio de sesión */}
  <h2 className="title">INICIAR SESIÓN</h2>
  <div className="input-field">
    <i className="fas fa-user"></i>
    <input
      type="text"
      placeholder="UserName"
      name="userName" 
      value={signInFormData.userName} 
      onChange={handleSignInInputChange} 
    />
  </div>
  <div className="input-field">
    <i className="fas fa-lock"></i>
    <input
      type="password"
      placeholder="Password"
      name="password" 
      value={signInFormData.password} 
      onChange={handleSignInInputChange} 
    />
  </div>
  <input type="submit" value="Ingresar" className="btn solid" />
</form>
            <form action="#" className={`sign-up-form ${showSignInForm ? '' : 'visible'}`} onSubmit={handleRegistroSubmit}>
              {/* Formulario de registro de usuario */}
              <h2 className="title">REGISTRO DE USUARIO</h2>
              <div className="input-field-grid">
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Nombres" name="nombres" required value={formData.nombres} onChange={(e) => setFormData({ ...formData, nombres: e.target.value })} />
                </div>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Apellidos" name="apellidos" required value={formData.apellidos} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} />
                </div>
              </div>
              <div className="input-field-grid">
                <div className="input-field">
                  <i className="fas fa-address-card"></i>
                  <input type="number" placeholder="Dni" name="dni" required value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} />
                </div>
                <div className="input-field">
                  <i className="fas fa-phone"></i>
                  <input type="number" placeholder="Celular" name="celular" required value={formData.celular} onChange={(e) => setFormData({ ...formData, celular: e.target.value })} />
                </div>
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" name="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="input-field-grid">
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="UserName" name="userName" required value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" name="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </div>
              </div>
              <input type="submit" className="btn" value="Registrate" id="btnRegistrar" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>¡BIENVENIDO!</h3>
              <p>¿Aún no ha registrado una cuenta con la cual ingresar al Sistema?</p>
              <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>Registrate</button>
            </div>
            <img src={ImgLogin} className="image" alt="ImgLogin" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>INGRESA AL SISTEMA</h3>
              <p>Ahora puede Iniciar Sesión al Sistema con la cuenta Registrada</p>
              <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>Ingresar</button>
            </div>
            <img src={ImgRegistro} className="image" alt="ImgRegistro" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formularios;
