import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, Table, Divider, Popconfirm, Icon, message } from 'antd';
import WrappedEditableTable from './WrappedEditableTable';
import MetodosAxios from '../../requerimientos/MetodosAxios';
import logo from '../../img/logo.png';
import instructor1 from '../../img/instructors/ins1.jpg';
import facebook from '../../img/f-icons/facebook.png';
import twitter from '../../img/f-icons/twitter.png';
import '../../App.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const success = (mensaje) => {
  message.success(mensaje);
};

const error = (mensaje) => {
  message.error(mensaje);
};

const ModalOrganizaciones = Form.create({ name: 'form_organizacion' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Agregar Organización"
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
                <Form.Item label="RUC">
                  {getFieldDecorator('ruc', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, ingrese el RUC'
                      }
                    ],
                    // initialValue:
                  })(
                    <InputNumber
                      style={{width: 200}}
                      size="large"
                      maxLength={13}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
)

export default class Organizacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // INICIO funciones del Modal Agregar Organizacion
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
      
      let organizacion = {
        name: values['nombre'],
        RUC: values['ruc'],
      }

      console.log('envio organizacion', organizacion);
      MetodosAxios.crear_organizacion(organizacion).then(res => {
        console.log(res);        
        if (res.status === 201) {
          success('Organización creada exitosamente');
        }
      }).catch(err => {
        error('Error en la creación de la Organización');
      });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };  
  
  // FIN funciones del Modal Agregar Organizacion
  render() {
    return (
      <div>
        {/*<Title style={{ textAlign: 'center' }}>Organizaciones</Title>
        <Button type="primary" onClick={this.showModal}>
          Nueva Organización
        </Button>
        <ModalOrganizaciones
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <br />
        <WrappedEditableTable
          key={Math.random()}
          // ref="child"
        />*/}

        <section class="course_details_area section_gap">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 course_details_left">
                    <div class="blog_right_sidebar">
                        <div class="single_instructor">
                            <div class="author">
                            <img src={instructor1} alt="" />
                            </div>
                            <div class="author_decs">
                                <h4>Tutor1</h4>
                                <p class="profession">Licenciado de Edu.Básica</p>
                                <p>Este es una descripción del perfil del profesor "tutor autorizado 1" encargado
                                de tutorias de ciertos cursos, graduado de una notable institución con conocimientos avanzados de matemáticas, física y química.</p>
                            </div>
                        </div>
                    </div>
                </div>  

                <div class="col-lg-7 right-contents">
                    <h3 class="title">Información básica</h3>
                    <ul>
                        <li>
                            <a class="justify-content-between d-flex" >
                                <p>Nombre</p>
                
                                 <div class="col-75">
                                    <input type="text" id="fname" name="firstname" placeholder="Martin Dunn" />
                                 </div>                            


                           </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex" >
                                <p>Sexo</p>
                                <div class="col-75">
                                    <select id="genero" name="sexo">
                                      <option value="Seleccione">Seleccione</option>
                                      <option value="Masculino">Masculino</option>
                                      <option value="femenino">Femenino</option>
                                    </select>
                                </div>



                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex" >
                                <p>Pais </p>
                                <div class="col-75">
                                    <select id="Pais" name="pais">
                                      <option value="Seleccione">Seleccione</option>
                                      <option value="Ecuador">Ecuador</option>
                                      <option value="Venezuela">Venezuela</option>
                                      <option value="Colombia">Colombia</option>
                                      <option value="Chile">Chile</option>
                                      <option value="Otros">Otros</option>
                                    </select>
                                </div>




                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex">
                                <p>Fecha de nacimiento </p>
                                <div class="col-75">
                                    <input type="text" id="fdate" name="nacimiento" placeholder="15/05/1970" />
                                 </div>



                                
                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex">
                                <p>Representado </p>
                                <div class="col-75">
                                    <input type="text" id="fnamer" name="representado" placeholder="Rose Dunn" />
                                 </div>


                                
                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex">
                                <p>Telefono </p>
                                
                                <div class="col-75">
                                    <input type="text" id="ftelf" name="telefono" placeholder="0543436452" />
                                 </div>


                                
                            </a>
                        </li>
                    </ul>
                    <a id="submit" href="#" class="genric-btn success large" onclick="openAlert()">Guardar</a>
                    <div class="alert">
                      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                      <strong>Realizado!</strong> Su información se ha actualizado correctamente.
                    </div>
                </div>
            </div>
        </div>
        
    </section>
    
    
    




      </div>
    )
  }
}