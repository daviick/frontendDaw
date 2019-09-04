import React from 'react';
import { Form, Input, Button, message, Row, Col, Typography } from 'antd';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import MetodosAxios from '../../requerimientos/MetodosAxios';

const dateFormat = 'YYYY/MM/DD';
const { Text, Title } = Typography;

class PerfilTutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usuario: undefined,
      habilitarCampos: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditar = this.handleEditar.bind(this);
    this.handleCancelar = this.handleCancelar.bind(this);
  }

  inicializar_formulario = usuario => {
    this.props.form.setFieldsValue({
      nombres: usuario.nombre,
      apellidos: usuario.apellido,
      correo: usuario.correo,
      sexo: usuario.sexo,
      telefono: usuario.telefono,
      ciudad: usuario.ciudad,
      fecha_nac: moment(usuario.fecha_nac),
      descripcion: usuario.presentacion,
    })
  }

  guardar_usuario = () => {
    this.setState({
      usuario: JSON.parse(localStorage.getItem('user')),
    }, () => {
      console.log('this.state.usuario', this.state.usuario)
      this.inicializar_formulario(this.state.usuario[0])
    });
  }

  componentDidMount = () => {
    this.guardar_usuario();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err)
        return;
      this.setState({ loading: true, habilitarCampos: true });
      console.log('Received values from', values);
      let usuario = {
        id: this.state.usuario[0]._id,
        nombre: values.nombres,
        apellido: values.apellidos,
        correo: values.correo,
        sexo: values.sexo,
        telefono: values.telefono,
        ciudad: values.ciudad,
        fecha_nac: values.fecha_nac.toISOString(),
        descripcion: values.presentacion,
      }
      console.log('envio usuario', usuario);
      MetodosAxios.editar_tutor(usuario).then(res => {
        console.log(res)
      }).catch(err => {
        message.error('Error al editar tutor')
        console.log(err);
      })
      // this.setState({ loading: false, habilitarCampos: false });
      message.success('¡Felicidades! se ha creado tu cuenta satisfactoriamente. Hemos enviado un correo para notificar tu registro');
    });
  }

  handleEditar = e => {
    this.setState({
      habilitarCampos: true,
    }, () => {
      console.log('this.state.habilitarCampos', this.state.habilitarCampos)
    })
  }

  handleCancelar = e => {
    this.setState({
      habilitarCampos: false,
    }, () => {
      console.log('this.state.habilitarCampos', this.state.habilitarCampos)
      this.inicializar_formulario(this.state.usuario[0])
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Mi Perfil</Title>
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row type="flex" justify="space-around">
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Nombres">
                {getFieldDecorator('nombres', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese sus nombres'
                    }
                  ]
                })(
                  <Input readOnly={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Apellido">
                {getFieldDecorator('apellidos', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese su apellido'
                    }
                  ]
                })(
                  <Input readOnly={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Correo Electronico">
                {getFieldDecorator('correo', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese su correo electronico'
                    }
                  ]
                })(
                  <Input readOnly={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
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
                    <Radio value={'M'}>M</Radio>
                    <Radio value={'F'}>F</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Telefono">
                {getFieldDecorator('telefono', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese su numero de telefono'
                    }
                  ]
                })(
                  <Input readOnly={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Ciudad">
                {getFieldDecorator('ciudad', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese su ciudad de origen'
                    }
                  ]
                })(
                  <Input readOnly={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Fecha de nacimiento">
                {getFieldDecorator('fecha_nac', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese su fecha de nacimiento'
                    }
                  ],
                  initialValue: moment(new Date())

                })(
                  <DatePicker disabled={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="descripcion">
                {getFieldDecorator('descripcion', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese una descripción'
                    }
                  ]
                })(
                  <Input readOnly={!this.state.habilitarCampos} />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              {
                this.state.habilitarCampos === false &&
                <Form.Item>
                  <Button type="primary" size="large" onClick={this.handleEditar}>Editar</Button>
                </Form.Item>
              }
              {
                this.state.habilitarCampos === true &&
                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit">Aceptar</Button>{' '}
                  <Button type="ghost" size="large" onClick={this.handleCancelar}>Cancelar</Button>
                </Form.Item>
              }
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedPerfilTutor = Form.create({ name: 'form_perfil_tutor' })(PerfilTutor);
export default WrappedPerfilTutor;