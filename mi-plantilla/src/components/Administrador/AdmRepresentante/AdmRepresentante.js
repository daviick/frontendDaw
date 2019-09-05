import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, Table, Divider, Popconfirm, Icon, DatePicker, message, Tag, Radio } from 'antd';
import moment from 'moment';
import WrappedEditableTable from './WrappedEditableTable';
import MetodosAxios from '../../../requerimientos/MetodosAxios';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const success = (mensaje) => {
  message.success(mensaje);
};

const error = (mensaje) => {
  message.error(mensaje);
};

const ModalRepresentantes = Form.create({ name: 'form_representantes' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Agregar Representante"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex" justify="space-around">
            <Col sm={24} md={10} lg={10}>
                <Form.Item label="Cedula">
                  {getFieldDecorator('cedula', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, ingrese su cedula'
                      }
                    ]
                  })(
                    <Input
                    />
                  )}
                </Form.Item>
              </Col>
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
                    <Input
                    />
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
                    <Input
                    />
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
                    <Input
                    />
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
                    <Input
                    />
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
                    <Input
                    />
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
                    <DatePicker
                    />
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

export default class AdmRepresentante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // INICIO funciones del Modal Agregar Suscripcion
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
      values.fecha_nac = values.fecha_nac.toISOString().substring(0, 10);
      let representante = {
        _id: values.cedula,
        nombre: values.nombres,
        apellido: values.apellidos,
        correo: values.correo,
        sexo: values.sexo,        
        telefono: values.telefono,
        ciudad: values.ciudad,
        fecha_nac: values.fecha_nac,
      }
      console.log('envio representante', representante)
      // let suscripcion = {
      //   client: values['organizacion'],
      //   current_plan: values['plan']
      // }
      // console.log('envio suscripcion', suscripcion);
      // MetodosAxios.crear_suscripcion(suscripcion).then(res => {
      //   console.log(res);
      //   if (res.status === 201) {
      //     success('Suscripción creada exitosamente');
      //   }
      // }).catch(err => {
      //   error('Error en la creación de la Suscripción');
      //   console.log(err);
      // });
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // FIN funciones del Modal Agregar Suscripcion
  render() {
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Representantes</Title>
        <Button type="primary" onClick={this.showModal}>
          Nueva Representante
        </Button>
        <ModalRepresentantes
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <br />
      </div>
    )
  }
}