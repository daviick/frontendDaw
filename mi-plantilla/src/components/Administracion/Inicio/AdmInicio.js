import React from 'react';
import 'antd/dist/antd.css';
import WrappedEditableTable from './WrappedEditableTable';
import WrappedAgregarUsuario from './WrappedEditableTable';
import MetodosAxios from '../../../requerimientos/MetodosAxios';
import { Typography, Button, Modal, Form, Select, Input, Radio, Row, Col } from 'antd';
import post from '../../img/blog/cat-post/cat-post-2.jpg';
import post2 from '../../img/blog/cat-post/cat-post-5.jpg';
import post3 from '../../img/blog/cat-post/cat-post-4.jpg';
import img1 from '../../img/dpmt/icon1.png';
import img2 from '../../img/dpmt/icon2.png';
import img3 from '../../img/dpmt/icon3.png';
import img4 from '../../img/dpmt/icon4.png';
import img5 from '../../img/dpmt/icon9.png';
import img6 from '../../img/dpmt/icon8.png';




export default class AdmInicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
    }
  }

  

  render() {
    return (
      <div>


      <section class="blog_categorie_area">
    <div class = "container">
      <h3 class="title">Beneficios como representante</h3>
      <p>En esta sección como un usuario representante usted tendrá varias facilidades al separar una tutoría para su representado. Los beneficios de haber ingresado como representante son: </p>
    </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="categories_post">
                        <img src={post} alt="post" />
                        <div class="categories_details">
                            <div class="categories_text">
                                <a href="">
                                    <h5>Revisar el perfil del tutor</h5>
                                </a>
                                <div class="border_line"></div>
                                <p>Puede conocer la calificación asignada al tutor de su preferencia, además de poder ver comentarios de otros alumnos.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="categories_post">
                        <img src={post2} alt="post" />
                        <div class="categories_details">
                            <div class="categories_text">
                                <a href="">
                                    <h5>Agendar una tutoria</h5>
                                </a>
                                <div class="border_line"></div>
                                <p>Con flexibilidad de horarios y con la facilidad de poder cancelarla o modificar la fecha de las mismas.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="categories_post">
                        <img src={post3} alt="post" />
                        <div class="categories_details">
                            <div class="categories_text">
                                <a href="">
                                    <h5>Seguimiento de tutoría</h5>
                                </a>
                                <div class="border_line"></div>
                                <p>Verifique el estado de las tutorias que usted ha contratado para su representado.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


              

            <div class="department_area section_gap">
    <div class="container">
      <div class="row align-items-center">
        
        <div class="offset-lg-1 col-lg-5">
          <div class="dpmt_right">
            <h1>Materias que puede reforzar</h1>
            <p>Diversos tutores capacitados en distintas áreas brindarán tutorías mediante videollamadas.</p>
            <p>Al momento de agendar una tutoría usted podra realizar la búsqueda de las materias disponibles al momento.</p>
            <p>Usted podrá contactarse con el tutor para pedirle que tema desea que sea reforzado para su representado o puede buscarlo directamente en nuestra barra de búsqueda rápida.</p>
            <div id="options-representante">
              <a href="agendar-tutoria.html" class="primary-btn text-uppercase">Agendar tutoria</a>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="dpmt_courses">
            <div class="row">
              <!-- single course -->
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center mt-100">
                <div class="single_department">
                  <div class="dpmt_icon">
                    <img src={img1} alt="" />
                  </div>
                  <h4>Lenguas</h4>
                </div>
              </div>
              <!-- single course -->
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center">
                <div class="single_department">
                  <div class="dpmt_icon">
                    <img src={img2} alt="" />
                  </div>
                  <h4>Matemáticas</h4>
                </div>
              </div>
              <!-- single course -->
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center mt-100">
                <div class="single_department">
                  <div class="dpmt_icon">
                    <img src={img3} alt="" />
                  </div>
                  <h4>Literatura</h4>
                </div>
              </div>
              <!-- single course -->
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center">
                <div class="single_department">
                  <div class="dpmt_icon">
                    <img src={img4} alt="" />
                  </div>
                  <h4>Informática</h4>
                </div>
              </div>
              <!-- single course -->
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center mt--100">
                <div class="single_department">
                  <div class="dpmt_icon">
                    <img src={img5} alt="" />
                  </div>
                  <h4>Química</h4>
                </div>
              </div>
              <!-- single course -->
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center">
                <div class="single_department">
                  <div class="dpmt_icon">
                    <img src={img6} alt="" />
                  </div>
                  <h4>Física</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>




        </div>
    );
  }
}
export default AdmInicio;