import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, message } from 'antd';
import WrappedEditableTable from './WrappedEditableTable';
import MetodosAxios from '../../requerimientos/MetodosAxios';


import logo from '../../img/logo.png';
import IconoUsuario from '../../img/IconoUsuario.png';
import tutoria from '../../img/blog/cat-post/tutoria.jpg';
import '../../App.css';
import calendario from '../../img/blog/cat-post/calendario.jpg';
import cursos from '../../img/blog/cat-post/cursos.jpg';
import author1 from '../../img/author1.png';
import author from '../../img/author.png';
import matematicas from '../../img/blog/main-blog/matematicas.jpg';
import quimica from '../../img/blog/main-blog/quimica.jpg';
import historia from '../../img/blog/main-blog/historia.jpg';
import idiomas from '../../img/blog/main-blog/idiomas.jpg';
import facebook from '../../img/f-icons/facebook.png';
import twitter from '../../img/f-icons/twitter.png';
import authorB from '../../img/blog/author.png';






const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;


const success = (mensaje) => {
  message.success(mensaje);
};

const error = (mensaje) => {
  message.error(mensaje);
};

const ModalPlanes = Form.create({ name: 'form_planes' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Agregar Plan"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Nombre">
                  {getFieldDecorator('nombre', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, ingrese el nombre'
                      }
                    ],
                    // initialValue:
                  })(
                    <Input
                      size="large"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Descripción">
                  {getFieldDecorator('descripcion', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, ingrese la descripcion'
                      }
                    ],
                    // initialValue:
                  })(
                    <TextArea
                      placeholder="Autosize height with minimum and maximum number of lines"
                      autosize={{ minRows: 2, maxRows: 6 }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Row type="flex" justify="space-between">
                  <Col sm={24} md={10} lg={10}>
                    <Form.Item label="Precio">
                      {getFieldDecorator('precio', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese el precio'
                          }
                        ],
                        // initialValue:
                      })(
                        <InputNumber
                          // style={{width: 300}}
                          size="large"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={10} lg={10}>
                    <Form.Item label="Meses">
                      {getFieldDecorator('meses', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese numero de meses'
                          }
                        ],
                        // initialValue: 'Enero'
                      })(
                        <InputNumber
                          // style={{width: 300}}
                          size="large"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

            </Row>
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} sm={24}>
                <Row type="flex" justify="space-between">
                  <Col sm={24} md={10} lg={10}>
                    <Form.Item label="Número de Usuarios">
                      {getFieldDecorator('n_usuarios', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese el numero de usuarios'
                          }
                        ],
                        // initialValue:
                      })(
                        <InputNumber
                          size="large"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={10} lg={10}>
                    <Form.Item label="Número de Oficinas">
                      {getFieldDecorator('n_oficinas', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese el numero de oficinas'
                          }
                        ],
                        // initialValue:
                      })(
                        <InputNumber
                          size="large"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} sm={24}>
                <Form.Item label="Software">
                  {getFieldDecorator('software', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione un software'
                      }
                    ],
                    // initialValue: 'Software 1'
                  })(
                    <Select
                      size="large"
                      mode="multiple"
                      allowSearch
                    >
                      {
                        this.props.softwares.map(software => {
                          console.log(software);
                          return (
                            <Option
                              key={software.id}
                              value={software.id}
                            >
                              {software.nombre}
                            </Option>
                          )
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )
    }
  }
)
export default class Planes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      softwares: [],
    };
  }

  obtener_softwares = () => {
    let softwares = [];
    MetodosAxios.obtener_softwares().then(res => {
      console.log(res);
      res.data.map(registro => {
        let software = {
          id: registro.id,
          nombre: registro.name,
        }
        softwares.push(software);
      });
      this.setState({ softwares: softwares }, () => { console.log('this.state.softwares', this.state.softwares) })
    }).catch(err => {
      error('Error al cargar los Softwares');
    });
  }

  componentDidMount = () => {
    this.obtener_softwares();
  }

  // INICIO funciones del Modal Agregar Plan
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);

      let plan = {
        name: values['nombre'],
        description: values['descripcion'],
        price: values['precio'],
        months: values['meses'],
        n_users: values['n_usuarios'],
        n_offices: values['n_oficinas'],
        software: values['software'],
      };
      MetodosAxios.crear_plan(plan).then(res => {
        console.log(res);
        if (res.status === 201) {
          success('Plan creado exitosamente');
        }
      }).catch(err => {
        error('Error en la creación del Plan');
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // FIN funciones del Modal Agregar Plan
  render() {
    return (
      <div>
        {/*<Title style={{ textAlign: 'center' }}>Planes</Title>
        <Button type="primary" onClick={this.showModal}>
          Nuevo Plan
        </Button>
        <ModalPlanes
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          softwares={this.state.softwares}
        />
        <br />
        <WrappedEditableTable
          key={Math.random()}
          softwares={this.state.softwares}
        />*/}

        {/*<section class="gradient-bg titulo-principal">   
            <h2 class="encabezado">Perfil Tutor<a class="perfilUsuario" ><img src={IconoUsuario} alt="" align="center" /></a> </h2> 

        </section>
        
        

        <section class="blog_categorie_area">

            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="categories_post">
                            <img src={tutoria} alt="post" />
                             <div class="categories_details">
                                <div class="categories_text">
                                    <a href="">
                                        <h5>Tutorias</h5>
                                    </a>
                                    <div class="border_line"></div>
                                    <p>Comienza una tutoria en tiempo real Ahora!</p>
                                </div>
                             </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="categories_post">
                            <img src={calendario} alt="post" />
                            <div class="categories_details">
                                <div class="categories_text">
                                    <a href="">
                                        <h5>Citas</h5>
                                    </a>
                                    <div class="border_line"></div>
                                    <p>Revisa todas las actividades y reuniones programadas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="categories_post">
                            <img src={cursos} alt="post" />
                            <div class="categories_details">
                                <div class="categories_text">
                                    <a href="">

                                        <h5>Cursos</h5>
                                    </a>
                                    <div class="border_line"></div>
                                    <p>Visualiza los cursos asignados actualmente, con sus respectivos estudiantes.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>*/}
        

        <section class="blog_area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="blog_left_sidebar">
                            <article id="1" class="row blog_item">
                                <div class="col-md-3">
                                    <div class="blog_info text-right">
                                        <div class="post_tag">
                                            <a >Matemática,</a>
                                            
                                            <a >Ciencia</a>
                                        </div>
                                        <ul class="blog_meta list">
                                            <li><a >Evaluado<i class="lnr lnr-user"></i></a></li>
                                            <li><a >12 Dic, 2017<i class="lnr lnr-calendar-full"></i></a></li>
                                            <li><a >12 Views<i class="lnr lnr-eye"></i></a></li>
                                            
                                            <li><div class="dropdown">
                                              <a>coments 03<i class="lnr lnr-bubble"></i></a>
                                              <div class="dropdown-content">
                                              
                                              <div id="coment" >
                                                 
                                                  <p align="justify" font-weight="bolder"> <image src={author1}  float="left" />que buena materia en serio! mira es tan genial que el tutor tiene que darla de nuevo, me gusto mucho la materia que yo probaría con aquella en serio</p>
                                              </div>
                                              <div id="coment" >
                                                  <p align="justify" font-weight="bolder"> <image src={author}  float="left" />que buena materia en serio! mira es tan genial que el tutor tiene que darla de nuevo, me gusto mucho la materia que yo probaría con aquella en serio</p>
                                              </div>
                                              <div id="coment" >
                                                  <p align="justify" font-weight="bolder"> <image src={author}  float="left" />Comentando dos veces para que vean que me gustó tanto la materia, recomiendo este profesor muchas veces. Aprenderás de largo</p>
                                              </div>
                                              
                                              </div>
                                            </div></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="blog_post">
                                        <img src={matematicas} alt="" />
                                        <div class="blog_details">
                                            <a href="">
                                                <h2>Matemática básica con principios avanzados</h2>
                                            </a>
                                            <p>Curso creado para fortalecer las falencias que tengan los estudiantes de 5to de bachillerato relacionado a matemáticas basicas con ciertos conocimientos avanzados que le ayudaran a mejorar su manera de razonar y resolver problemas</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article id="2" class="row blog_item">
                                <div class="col-md-3">
                                    <div class="blog_info text-right">
                                        <div class="post_tag">
                                            <a >Ciencia,</a>
                                            
                                            <a >Química</a>
                                        </div>
                                        <ul class="blog_meta list">
                                            <li><a >Evaluado<i class="lnr lnr-user"></i></a></li>
                                            <li><a >10 Oct, 2017<i class="lnr lnr-calendar-full"></i></a></li>
                                            <li><a >8 Views<i class="lnr lnr-eye"></i></a></li>
                                            <li><div class="dropdown">
                                              <a>coments 01<i class="lnr lnr-bubble"></i></a>
                                              <div class="dropdown-content">
                                              <div id="coment" >
                                                 
                                                  <p align="justify" font-weight="bolder"> <image src={author1}  float="left" />No la cojan, a pesar que el profesor hace todo su esfuerzo la materia es muy pesada, dificil de entender. Pienso que se necesitaria de una clase presencial</p>
                                              </div>
                                              
                                              
                                              </div>
                                            </div></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="blog_post">
                                        <img src={quimica} alt="" />
                                        <div class="blog_details">
                                            <a href="">
                                                <h2>Fundamentos de Química 1</h2>
                                            </a>
                                            <p>Parte fundamental de este curso es revisar y reforzar los conocimientos básicos de química, con su respectiva implementación en el balanceo de fórmulas y conocer las diferentes soluciones existentes con su respectiva clasificación</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article id="3" class="row blog_item">
                                <div class="col-md-3">
                                    <div class="blog_info text-right">
                                        <div class="post_tag">
                                            <a >Historia,</a>
                                            <a >Estilo de vida,</a>
                                            <a >Ciencia</a>
                                        </div>
                                        <ul class="blog_meta list">
                                            <li><a >Evaluado<i class="lnr lnr-user"></i></a></li>
                                            <li><a >22 Jul, 2017<i class="lnr lnr-calendar-full"></i></a></li>
                                            <li><a >22 Views<i class="lnr lnr-eye"></i></a></li>
                                            <li><a >00 Comments<i class="lnr lnr-bubble"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="blog_post">
                                        <img src={historia} alt="" />
                                        <div class="blog_details">
                                            <a href="">
                                                <h2>Historia Contemporánea</h2>
                                            </a>
                                            <p>El estudio de La Historia Contemporánea es la rama de la Historia que estudia los hechos históricos de la edad contemporánea, periodo histórico que sucede a la denominada edad moderna y cuya proximidad y prolongación hasta el presente le confieren unas connotaciones muy particulares por su cercanía en el tiempo.</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <article id="i4" class="row blog_item">
                                <div class="col-md-3">
                                    <div class="blog_info text-right">
                                        <div class="post_tag">
                                            <a >Inglés,</a>
                                            
                                            <a >Idiomas</a>
                                        </div>
                                        <ul class="blog_meta list">
                                            <li><a >Evaluado<i class="lnr lnr-user"></i></a></li>
                                            <li><a >15 Dic, 2017<i class="lnr lnr-calendar-full"></i></a></li>
                                            <li><a >24 Views<i class="lnr lnr-eye"></i></a></li>
                                            
                                            <li><div class="dropdown">
                                              <a>coments 03<i class="lnr lnr-bubble"></i></a>
                                              <div class="dropdown-content">
                                              
                                              <div id="coment" >
                                                 
                                                  <p align="justify" font-weight="bolder"> <image src={author1}  float="left" />que buena materia en serio! Aprender un nuevo idioma fue un reto para mi!, quisiera que puedan hacer más tutorias de esto</p>
                                              </div>
                                              <div id="coment" >
                                                  <p align="justify" font-weight="bolder"> <image src={author}  float="left" />No se como hay personas que les gusta el inglés yo lo destesto, apenas y se hablar español. Creo que esta tutoria me ayudó para pasar la materia pero no aprendiendo el idioma</p>
                                              </div>
                                              <div id="coment" >
                                                  <p align="justify" font-weight="bolder"> <image src={author}  float="left" />No le hagan caso al comentario de arriba, está loco! El inglés es lo mejor que pudo existir en la vida ! Tutor recomendado</p>
                                              </div>
                                              
                                              </div>
                                            </div></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="blog_post">
                                        <img src={idiomas} alt="" />
                                        <div class="blog_details">
                                            <a href="">
                                                <h2>Inglés Básico A</h2>
                                            </a>
                                            <p>Curso creado para aprender el idioma inglés y obtener destrezas al hablar con personas de otros países que hablen el mismo idioma. Este es un curso inicial, donde aprobarlo será indispensable para poder ir a los siguientes niveles.</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </article>
                            
                            <nav class="blog-pagination justify-content-center d-flex">
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a  class="page-link" aria-label="Previous">
                                            <span aria-hidden="true">
                                                <span class="lnr lnr-chevron-left"></span>
                                            </span>
                                        </a>
                                    </li>
                                    <li id="pag1"class="page-item active"><a class="page-link" onclick="pag1()">01</a>
                                    </li>
                                    <li id="pag2"class="page-item "><a  class="page-link" onclick="pag2()">02</a></li>
                                    
                                    <li class="page-item"><a href="#" class="page-link">04</a></li>
                                    <li class="page-item"><a href="#" class="page-link">09</a></li>
                                    <li class="page-item">-->
                                        <a  class="page-link" aria-label="Next">
                                            <span aria-hidden="true">
                                                <span class="lnr lnr-chevron-right"></span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget search_widget">
                                <div class="input-group">
                                    
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="button"><i class="lnr lnr-magnifier"></i></button>
                                    </span>
                                </div>
                                <div class="br"></div>
                            </aside>
                            <aside class="single_sidebar_widget author_widget">
                                <img class="author_img rounded-circle" src={authorB} alt="" />
                                <h4>Tutor Autorizado </h4>
                                <p>Docente en ciencias</p>
                                <div class="social_icon">
                                    <a href="https://www.facebook.com"><i class="fa fa-facebook"></i></a>
                                    <a href="https://www.twitter.com"><i class="fa fa-twitter"></i></a>
                                    <a href="https://www.github.com"><i class="fa fa-github"></i></a>
                                    <a href="#"><i class="fa fa-behance"></i></a>
                                </div>
                                <p>Este es una descripción del perfil del profesor "tutor autorizado 1" encargado
                                    de tutorias de ciertos cursos, graduado de una notable institución con conocimientos avanzados de matemáticas, física y química. </p>
                                <div class="br"></div>
                            </aside>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        

        






      </div>
    )
  }
}