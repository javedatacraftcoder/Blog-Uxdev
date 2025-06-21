import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firestore';
import { Helmet } from 'react-helmet';

const PostsMain = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = await getDocs(collection(db, 'posts'));
      const postsData = postsCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    };
    fetchPosts();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/postcontent/${id}`);
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <meta property="og:title" content="UXDev School - Cursos en Línea para Principiantes en Diseño UX, Web y Marketing Digital"/>
        <meta property="og:description" content="Transforma tu conocimiento con UXDev School. Cursos diseñados para principiantes en diseño UX, diseño web y marketing digital, ofreciendo una experiencia educativa envolvente que te capacita para aplicar lo aprendido en tu negocio o emprendimiento."/>
        <meta property="og:image" content="https://uxdevschool.com/uxdevschoologt.png"/>
      </Helmet>
      <h2>Posts1</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleReadMore(post.id)}>
                  Seguir leyendo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  );
};

export default PostsMain;
