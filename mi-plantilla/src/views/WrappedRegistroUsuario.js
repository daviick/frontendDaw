import React from 'react';
import { Form, Input, Button, message, Row, Col, Card } from 'antd';
import LayoutOlvidoContrasena from '../extras/LayoutOlvidoContrasena';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import logo from '../img/about-img.png';


const dateFormat = 'YYYY/MM/DD';

class RegistroUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err)
        return;
      this.setState({ loading: true });
      console.log('Received values from', values);
      this.setState({ loading: false });
      message.success('¡Felicidades! se ha creado tu cuenta satisfactoriamente. Hemos enviado un correo para notificar tu registro');
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ background: '#ECECEC', padding: '30px', height: '980px' }}>
        <Col sm={12} md={12} lg={12}>
        <Card title="Registro de Usuario" bordered={false} style={{ width: 500, height: '980px' }}>
      
            <LayoutOlvidoContrasena>
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <Row>
                  <Col sm={24} md={24} lg={24}>
                    <Form.Item label="Nombres">
                      {getFieldDecorator('nombres', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese sus nombres'
                          }
                        ]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Apellido">
                      {getFieldDecorator('apellido', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese su apellido'
                          }
                        ]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Correo Electronico">
                      {getFieldDecorator('correo', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese su correo electronico'
                          }
                        ]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Tipo Usuario">
                      {getFieldDecorator('Tipo usuario', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, seleccione el tipo de usuario'
                          }
                        ]
                      })(
                        <Radio.Group>
                          <Radio value={1}>Representante</Radio>
                          <Radio value={2}>Tutor</Radio>
                          <Radio value={3}>Administrador</Radio>

                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Sexo">
                      {getFieldDecorator('sexo', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, seleccion su sexo'
                          }
                        ]
                      })(
                        <Radio.Group>
                          <Radio value={1}>M</Radio>
                          <Radio value={2}>F</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Telefono">
                      {getFieldDecorator('telefono', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese su numero de telefono'
                          }
                        ]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Ciudad">
                      {getFieldDecorator('ciudad', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese su ciudad de origen'
                          }
                        ]
                      })(
                        <Input />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item label="Fecha de nacimiento">
                      {getFieldDecorator('fechaNac', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, ingrese su fecha de nacimiento'
                          }
                        ],
                        initialValue: moment(new Date())

                      })(
                        <DatePicker  />
                      )}
                    </Form.Item>
                  </Col>
                  <Col sm={24} md={24} lg={24}>

                    <Form.Item>
                      <Button type="primary" size="large" htmlType="submit" loading={this.state.loading}>Registrar</Button>
                    </Form.Item>
                  </Col>

                </Row>
              </Form>
            </LayoutOlvidoContrasena>
          </Card></Col>
          <img src={logo} alt="" style = {{paddingTop: '200px'}}></img>
          
        </div>
    );
  }
}

const WrappedRegistroUsuario = Form.create({ name: 'form_registro_usuario' })(RegistroUsuario);
export default WrappedRegistroUsuario;