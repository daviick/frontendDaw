import React from 'react';
import { Form, Input, Button, message, Row, Col, Typography, Select, InputNumber } from 'antd';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';
import MetodosAxios from '../../requerimientos/MetodosAxios';

const dateFormat = 'YYYY/MM/DD';
const { Text, Title } = Typography;
const { Option } = Select;

class PerfilTutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      usuario: undefined,
      habilitarCampos: false,
      asignaturas: [],
      formacion_tutor: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditar = this.handleEditar.bind(this);
    this.handleCancelar = this.handleCancelar.bind(this);
  }

  obtener_formacion_tutores = id_tutor => {
    MetodosAxios.obtener_formacion_tutor(id_tutor).then(res => {
      console.log(res);
      this.setState({
        formacion_tutor: res.data,
      }, () => {
        console.log('this.state.formacion_tutor', this.state.formacion_tutor)
        this.inicializar_formulario(this.state.usuario[0])
      })
    }).catch(err => {
      message.error('Error al cargar la Formacion del Tutor');
    })
  }

  inicializar_formulario = usuario => {
    console.log(this.state.formacion_tutor)
    this.props.form.setFieldsValue({
      nombres: usuario.nombre,
      apellidos: usuario.apellido,
      correo: usuario.correo,
      sexo: usuario.sexo,
      telefono: usuario.telefono,
      ciudad: usuario.ciudad,
      fecha_nac: moment(usuario.fecha_nac),
      descripcion: usuario.presentacion,
      nivel_estudios: this.state.formacion_tutor[0].nivel_estudios,
      experiencia: this.state.formacion_tutor[0].experiencia,
    })
  }

  guardar_usuario = () => {
    this.setState({
      usuario: JSON.parse(localStorage.getItem('user')),
    }, () => {
      console.log('this.state.usuario', this.state.usuario)
      this.obtener_formacion_tutores(this.state.usuario[0]._id)
    });
  }

  obtener_asignaturas = () => {
    MetodosAxios.obtener_asignaturas().then(res => {
      this.setState({ asignaturas: res.data });
    }).catch(err => {
      message.error('Error al cargar las asignaturas')
    })
  }

  componentDidMount = () => {
    this.guardar_usuario();
    this.obtener_asignaturas();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err)
        return;
      this.setState({ loading: true, habilitarCampos: true });
      values.fecha_nac = values.fecha_nac.toISOString().substring(0, 10)
      console.log('Received values from', values);
      let usuario = {
        id: this.state.usuario[0]._id,
        nombre: values.nombres,
        apellido: values.apellidos,
        correo: values.correo,
        sexo: values.sexo,
        telefono: values.telefono,
        ciudad: values.ciudad,
        fecha_nac: values.fecha_nac,
        presentacion: values.descripcion,
      }
      console.log('envio usuario', usuario);
      MetodosAxios.editar_tutor(usuario).then(res => {
        console.log(res)
        this.setState({ habilitarCampos: false })
        message.success('Tutor editado exitosamente');
        localStorage.setItem('user', usuario);
      }).catch(err => {
        message.error('Error al editar tutor')
        console.log(err);
      })
      // this.setState({ loading: false, habilitarCampos: false });      
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
              <Form.Item label="Nivel de Estudios">
                {getFieldDecorator('nivel_estudios', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, seleccione el nivel de estudios'
                    }
                  ]
                })(
                  <Select
                    disabled={!this.state.habilitarCampos}
                  >
                    <Option
                      key="Grado en Educacion Primaria"
                      value="Grado en Educacion Primaria"
                    >
                      Grado en Educacion Primaria
                    </Option>
                    <Option
                      key="Tercer Nivel"
                      value="Tercer Nivel"
                    >
                      Tercer Nivel
                    </Option>
                    <Option
                      key="Máster-Postgrado"
                      value="Máster-Postgrado"
                    >
                      Máster-Postgrado
                    </Option>
                    <Option
                      key="Doctorado"
                      value="Doctorado"
                    >
                      Doctorado
                    </Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Experiencia">
                {getFieldDecorator('experiencia', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, ingrese sus años de experiencia'
                    }
                  ]
                })(
                  <InputNumber
                    readOnly={!this.state.habilitarCampos}
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Profesion">
                {getFieldDecorator('profesion', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, seleccione su profesion'
                    }
                  ]
                })(
                  <Select
                    disabled={!this.state.habilitarCampos}
                  >

                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col sm={24} md={10} lg={10}>
              <Form.Item label="Asignaturas">
                {getFieldDecorator('asignaturas', {
                  rules: [
                    {
                      required: true,
                      message: 'Por favor, seleccione la(s) asignaturas'
                    }
                  ]
                })(
                  <Select
                    disabled={!this.state.habilitarCampos}
                  >
                    {
                      this.state.asignaturas &&
                      this.state.asignaturas.map(asignatura => {
                        // console.log(asignatura)
                        return (
                          <Option
                            key={asignatura._id}
                            value={asignatura._id}
                          >
                            {asignatura.nombre}
                          </Option>
                        )
                      })
                    }
                  </Select>
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