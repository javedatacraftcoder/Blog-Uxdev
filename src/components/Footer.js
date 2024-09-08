import React from 'react'

export const Footer = () => {
  return (
    <>
      <footer className="main-footer p-3">
        <section className="container-fluid">
            <div className="row">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center container-fluid">
                    <div className="footer-logo d-flex justify-content-center">
                        <img src="./assets/uxdevschool-logo.png" alt="uxdevschool"/>
                    </div>
                    <div className="d-flex">
                        <div className="footer-paginas m-1 p-2">
                            <h5>Paginas</h5>
                            <ul>
                                <li><a href="/landingpage">Inicio</a></li>
                                <li><a href="/cursolanding">Cursos</a></li>
                                <li><a href="/nosotrospagina">Quienes Somos</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/#">Login</a></li>
                            </ul>                       
                        </div>
                        <div className="footer-servicios m-1 p-2">
                            <h5>Servicios</h5>
                            <ul>
                                <li><a href="https://www.datacraftcoders.com">Cursos</a></li>
                                <li><a href="https://www.datacraftcoders.com">Diseño Web</a></li>
                                <li><a href="https://www.datacraftcoders.com">Diseño UX</a></li>
                                <li><a href="https://www.datacraftcoders.com">Marketing Digital</a></li>
                                <li><a href="https://www.datacraftcoders.com">Consultorias</a></li>
                            </ul>  
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="redes">
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-center align-items-center">
                                    <h5>Redes Sociales</h5>
                                </div>
                                <div>
                                    <div className="row redes-iconos">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <a href="https://www.facebook.com/uxdevschool" target="_blank" rel="noopener noreferrer"><img src="./assets/icons8-facebook-48.png" alt="facebook-icon" /></a>
                                            <a href="https://github.com/javedatacraftcoder" target="_blank" rel="noopener noreferrer"><img src="./assets/icons8-github-48.png" alt="github-icon" /></a>
                                            <a href="https://www.instagram.com/uxdevschool" target="_blank" rel="noopener noreferrer"><img src="./assets/icons8-instagram-48.png" alt="instagram-icon" /></a>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <a href="https://www.tiktok.com/@uxdevschool?_t=8owA25rTIlK&_r=1" target="_blank" rel="noopener noreferrer"><img src="./assets/icons8-tiktok-48.png" alt="tiktok-icon" target="_blank" rel="noopener noreferrer"/></a>
                                            <a href="https://www.youtube.com/@datacraftcoders" target="_blank" rel="noopener noreferrer"><img src="./assets/icons8-youtube-48.png" alt="youtube-icon" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-contacto">
                        <h5>Servicios</h5>
                        <a href="mailto:info@uxdevschool.com" >info@uxdevschool.com</a><br/>
                        <a href="mailto:info@datacraftcoders.com" >info@datacraftcoders.com</a><br/>
                        <a href="https://www.datacraftcoders.com" target="_blank" rel="noopener noreferrer">datacraftcoders.com</a>
                        <h6>Comparte tus Cursos</h6>
                        <a href="mailto:separte@uxdevschool.com">separte@uxdevschool.com</a>
                    </div>
                </div>
            </div>           
        </section>
      </footer>

    </>
  )
}
