import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firestore';

const PostContent = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    const fetchComments = () => {
      const commentsRef = collection(db, 'posts', id, 'comments');
      const q = query(commentsRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      });
    };

    fetchPost();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (post && contentRef.current) {
      // Asegurarse de que todos los enlaces se abran en una nueva ventana
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        const url = link.getAttribute('href');
        if (url && !url.startsWith('http')) {
          link.setAttribute('href', `http://${url}`);
        }
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer'); // Agregar rel para seguridad
      });
    }
  }, [post]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment.trim() === '') return;

    try {
      const commentsRef = collection(db, 'posts', id, 'comments');
      await addDoc(commentsRef, {
        text: newComment,
        createdAt: new Date(),
      });
      setNewComment(''); // Limpiar el campo de comentario
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container mt-4 border p-4">
      {post.mediaUrl && (
        <img src={post.mediaUrl} alt={post.title} className="img-fluid mb-3" />
      )}
      <h2>{post.title}</h2>
      <p><strong>Autor:</strong> {post.author}</p>
      <p><strong>Fecha:</strong> {new Date(post.createdAt.toDate()).toLocaleDateString()}</p>
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: post.content }}></div>

      {/* Sección de Comentarios */}
      <div className="mt-4 border p-4">
        <h4>Comentarios</h4>
        <form onSubmit={handleAddComment} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="form-control"
            rows="3"
            placeholder="Escribe un comentario..."
          />
          <button type="submit" className="btn btn-primary mt-2">Agregar Comentario</button>
        </form>

        {comments.length > 0 ? (
          <ul className="list-group">
            {comments.map((comment) => (
              <li key={comment.id} className="list-group-item">
                <p>{comment.text}</p>
                <small className="text-muted">
                  {new Date(comment.createdAt.seconds * 1000).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
};

export default PostContent;
