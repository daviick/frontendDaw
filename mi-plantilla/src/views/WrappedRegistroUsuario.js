import React from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import LayoutOlvidoContrasena from '../extras/LayoutOlvidoContrasena';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';

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
    );
  }
}

const WrappedRegistroUsuario = Form.create({ name: 'form_registro_usuario' })(RegistroUsuario);
export default WrappedRegistroUsuario;