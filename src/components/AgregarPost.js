import React, { useState, useRef, useEffect } from 'react';
import { storage, db, auth } from './firestore'; // Firebase Storage, Firestore y Auth
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const AgregarPost = () => {
  const [title, setTitle] = useState(''); // Título del post
  const [author, setAuthor] = useState(''); // Nombre del autor
  const [content, setContent] = useState(''); // Contenido del post
  const [file, setFile] = useState(null); // Archivo seleccionado (imagen o video)
  const [mediaUrl, setMediaUrl] = useState(''); // URL del archivo subido
  const [progress, setProgress] = useState(0); // Progreso de la subida
  const [user, setUser] = useState(null); // Usuario autenticado
  const [posts, setPosts] = useState([]); // Posts del usuario
  const [editingPost, setEditingPost] = useState(null); // Post que se está editando
  const editorRef = useRef(null); // Referencia al área de escritura

  useEffect(() => {
    // Verificar estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserPosts(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setAuthor(editingPost.author);
      setContent(editingPost.content);
      setMediaUrl(editingPost.mediaUrl || '');
      if (editorRef.current) {
        editorRef.current.innerHTML = editingPost.content;
      }
    }
  }, [editingPost]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      alert("El archivo no puede ser mayor a 2 MB");
      return;
    }
    setFile(selectedFile); // Almacenar archivo
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMediaUrl(downloadURL);
        });
      }
    );
  };

  const applyStyle = (style) => {
    document.execCommand(style, false, null);
  };

  const insertElement = (type, attributes = {}, innerHTML = '') => {
    const element = document.createElement(type);
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    editorRef.current.appendChild(element);
  };

  const insertLink = () => {
    const url = prompt("Introduce la URL del enlace:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  const insertCodeBlock = () => {
    const codeBlock = `<div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;"><code>Escribe tu código aquí...</code></div><br><br>`;
    document.execCommand('insertHTML', false, codeBlock);
  };

  const handleInputChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML); // Usar innerHTML para mantener el formato
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !content) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      if (editingPost) {
        // Actualizar el post existente
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, {
          title,
          author,
          content,
          mediaUrl,
          updatedAt: new Date()
        });
        alert("Post actualizado exitosamente");
        setEditingPost(null);
      } else {
        // Crear un nuevo post
        await addDoc(collection(db, "posts"), {
          title,
          author,
          content,
          mediaUrl,
          createdAt: new Date(),
          userId: user.uid // Agregar el ID del usuario al post
        });
        alert("Post publicado exitosamente");
      }

      setTitle('');
      setAuthor('');
      setContent('');
      setFile(null);
      setMediaUrl('');
      setProgress(0);
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      fetchUserPosts(user.uid); // Actualizar posts después de publicar o actualizar
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const fetchUserPosts = async (userId) => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(userPosts);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert('Has cerrado sesión');
    }).catch((error) => {
      console.error('Error closing session:', error);
    });
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  // Función para aplicar encabezado
  const applyHeader = (level) => {
    document.execCommand('formatBlock', false, `<h${level}>`);
  };

  // Función para crear lista ordenada
  const insertOrderedList = () => {
    document.execCommand('insertOrderedList', false, null);
  };

  // Función para crear lista desordenada
  const insertUnorderedList = () => {
    document.execCommand('insertUnorderedList', false, null);
  };

  return (
    <div className="container-fluid vh-100">
      <button className="btn btn-danger mb-3" onClick={handleSignOut}>
        Cerrar sesión
      </button>
      <h3>{editingPost ? 'Editar Post' : 'Crear Post'}</h3>
      <form onSubmit={handleSubmit} className="h-75">
        <div className="row h-75">
          {/* Primer mitad de la pantalla */}
          <div className="col-md-6 border border-3 p-3 d-flex flex-column justify-content-between" style={{ borderColor: '#ced4da' }}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control border-3 mb-2"
                placeholder="Título del post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ borderColor: '#ced4da', borderRadius: '.25rem' }}
              />
              <input
                type="text"
                className="form-control border-3"
                placeholder="Nombre del autor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={{ borderColor: '#ced4da', borderRadius: '.25rem' }}
              />
            </div>
            <div
              ref={editorRef}
              contentEditable="true"
              className="form-control border-3 flex-grow-1 p-3"
              style={{ overflowY: 'auto', borderColor: '#ced4da' }}
              onInput={handleInputChange}
              placeholder="Escribe tu post aquí..."
            />
          </div>

          {/* Segunda mitad de la pantalla */}
          <div className="col-md-6 d-flex flex-column">
            {/* Mitad superior de la segunda columna */}
            <div className="flex-grow-1 border border-3 p-2 mb-2" style={{ borderColor: '#ced4da' }}>
              <div className="mb-2">
                {/* Herramientas de formato */}
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyStyle("bold")}
                >
                  <b>B</b>
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyStyle("italic")}
                >
                  <i>I</i>
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyStyle("underline")}
                >
                  <u>U</u>
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyStyle("justifyLeft")}
                >
                  Izquierda
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyStyle("justifyCenter")}
                >
                  Centro
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyStyle("justifyRight")}
                >
                  Derecha
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyHeader(1)} // Aplicar H1
                >
                  H1
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={() => applyHeader(2)} // Aplicar H2
                >
                  H2
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={insertOrderedList} // Lista ordenada
                >
                  Lista ordenada
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={insertUnorderedList} // Lista desordenada
                >
                  Lista desordenada
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={insertLink}
                >
                  Enlace
                </button>
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={insertCodeBlock}
                >
                  Código
                </button>
              </div>
              <input
                type="file"
                className="form-control mb-2"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleUpload}
              >
                Subir archivo
              </button>
              <div className="progress mt-2">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progress}%
                </div>
              </div>
              {/* Mostrar la imagen subida */}
              {mediaUrl && (
                <div className="mt-2">
                  <img
                    src={mediaUrl}
                    alt="Archivo subido"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
            {/* Mitad inferior de la segunda columna */}
            <div className="overflow-auto border border-3 p-2" style={{ borderColor: '#ced4da', height: '40%' }}>
              <h5>Mis Posts</h5>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(post)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editingPost ? 'Actualizar Post' : 'Publicar Post'}
        </button>
      </form>
    </div>
  );
};

export default AgregarPost;
