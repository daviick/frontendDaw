import React from 'react';
import 'antd/dist/antd.css';
import WrappedEditableTable from './WrappedEditableTable';
import WrappedAgregarUsuario from './WrappedEditableTable';
import MetodosAxios from '../../../requerimientos/MetodosAxios';
import { Typography, Button, Modal, Form, Select, Input, Radio, Row, Col } from 'antd';

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
      </div>
    );
  }
}