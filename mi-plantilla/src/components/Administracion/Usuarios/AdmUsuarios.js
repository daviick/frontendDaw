import React from 'react';
import 'antd/dist/antd.css';
import WrappedEditableTable from './WrappedEditableTable';
import WrappedAgregarUsuario from './WrappedEditableTable';
import MetodosAxios from '../../../requerimientos/MetodosAxios';
import { Typography, Button, Modal, Form, Select, Input, Radio, Row, Col } from 'antd';

import logo from '../../../img/logo.png';
import instructor1 from '../../../img/instructors/ins1.jpg';
import facebook from '../../../img/f-icons/facebook.png';
import twitter from '../../../img/f-icons/twitter.png';
import '../../../App.css';


const { Title } = Typography;
const { Option } = Select;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Crear Nuevo Usuario"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex" justify="space-between">
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Tipo de Trabajador">
                  {getFieldDecorator('tipo_trabajador', {
                    rules: [{ required: true, message: 'Por favor, seleccione el tipo de trabajador' }],
                    // initialValue: "lucy"
                  })(
                    <Select style={{ width: 120 }} >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Departamento">
                  {getFieldDecorator('departamento', {
                    rules: [{ required: true, message: 'Por favor, seleccione el departamento' }],
                    // initialValue: "lucy"
                  })(
                    <Select style={{ width: 120 }} >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="disabled">Disabled</Option>
                      <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Primer Nombre">
                  {getFieldDecorator('primer_nombre', {
                    rules: [{ required: true, message: 'Por favor, ingrese el primer nombre' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Segundo Nombre">
                  {getFieldDecorator('segundo_nombre', {
                    rules: [{ required: true, message: 'Por favor, ingrese el segundo nombre' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Primer Apellido">
                  {getFieldDecorator('primer_apellido', {
                    rules: [{ required: true, message: 'Por favor, ingrese el primer apellido' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Segundo Apellido">
                  {getFieldDecorator('segundo_apellido', {
                    rules: [{ required: true, message: 'Por favor, ingrese el segundo apellido' }],
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Cédula">
                  {getFieldDecorator('cedula', {
                    rules: [{ required: true, message: 'Por favor, ingrese la cedula' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Telefono">
                  {getFieldDecorator('telefono', {
                    rules: [{ required: true, message: 'Por favor, ingrese el telefono' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Por favor, ingrese el email' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Contraseña">
                  {getFieldDecorator('contrasena', {
                    rules: [{ required: true, message: 'Por favor, ingrese la contraseña' }],
                  })(
                    <Input type="password"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Jefe Inmediato" className="collection-create-form_last-form-item">
                  {getFieldDecorator('jefe?inmediato', {
                    rules: [{ required: true, message: 'Por favor, ingrese el jefe inmediato' }],
                  })(
                    <Input />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
);

export default class AdmUsuarios extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
    }
  }

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
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  componentDidMount = () => {
  }

  render() {
    return (
      <div>
        {/*<Title style={{ textAlign: 'center' }}>Usuarios</Title>
        <Button type="primary" onClick={this.showModal}>
          Nuevo Usuario
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <br />
        {
          this.state.data &&
          <WrappedEditableTable
            key={Math.random()}
          />
        }*/}




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
    );
  }
}