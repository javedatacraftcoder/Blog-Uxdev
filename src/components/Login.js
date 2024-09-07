import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from './firestore'; // Asegúrate de que esta función esté correctamente importada

const Login = () => {
  const navigate = useNavigate(); // Obtén el hook useNavigate

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/agregarpost'); // Redirige a /agregarpost después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Iniciar sesión</h2>
      <button className="btn btn-primary mt-3" onClick={handleSignIn}>
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
