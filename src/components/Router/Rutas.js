import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firestore'; // Importa la configuración de Firebase
import PostContent from '../PostContent';
import PostsMain from '../PostsMain';
import AgregarPost from '../AgregarPost';
import Login from '../Login';
import { EditarPost } from '../EditarPost';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return user ? children : <Navigate to="/login" />;
};

export const Rutas = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to="/postmain" />} />
        <Route path='/postmain' element={<PostsMain />} />
        <Route path='/postcontent/:id' element={<PostContent />} />
        {/* Rutas protegidas */}
        <Route path='/agregarpost' element={<PrivateRoute><AgregarPost /></PrivateRoute>} />
        <Route path='/editarpost/:id' element={<PrivateRoute><EditarPost /></PrivateRoute>} />
        {/* Ruta de login */}
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default Rutas;
