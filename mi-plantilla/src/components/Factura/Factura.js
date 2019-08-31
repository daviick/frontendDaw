import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, Table, Divider, Popconfirm, Icon, DatePicker } from 'antd';
import moment from 'moment';
import WrappedEditableTable from './WrappedEditableTable';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ModalFacturas = Form.create({ name: 'form_factura' })(
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
          title="Agregar Factura"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Cliente">
                  {getFieldDecorator('cliente', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione el cliente'
                      }
                    ],
                    initialValue: 'Cliente 1'
                  })(
                    <Select
                      size="large"
                      allowSearch
                      allowClear
                    >
                      <Option key="Cliente 1">Cliente 1</Option>
                      <Option key="Cliente 2">Cliente 2</Option>
                      <Option key="Cliente 3">Cliente 3</Option>
                      <Option key="Cliente 4">Cliente 4</Option>
                      <Option key="Cliente 5">Cliente 5</Option>
                      <Option key="Cliente 6">Cliente 6</Option>
                      <Option key="Cliente 7">Cliente 7</Option>
                      <Option key="Cliente 8">Cliente 8</Option>
                      <Option key="Cliente 9">Cliente 9</Option>
                      <Option key="Cliente 10">Cliente 10</Option>
                      <Option key="Cliente 11">Cliente 11</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Suscripción">
                  {getFieldDecorator('suscripcion', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione la suscripcion'
                      }
                    ],
                    initialValue: 'Suscripcion 1'
                  })(
                    <Select
                      size="large"
                      allowSearch
                      allowClear
                    >
                      <Option key="Suscripcion 1">Suscripcion 1</Option>
                      <Option key="Suscripcion 2">Suscripcion 2</Option>
                      <Option key="Suscripcion 3">Suscripcion 3</Option>
                      <Option key="Suscripcion 4">Suscripcion 4</Option>
                      <Option key="Suscripcion 5">Suscripcion 5</Option>
                      <Option key="Suscripcion 6">Suscripcion 6</Option>
                      <Option key="Suscripcion 7">Suscripcion 7</Option>
                      <Option key="Suscripcion 8">Suscripcion 8</Option>
                      <Option key="Suscripcion 9">Suscripcion 9</Option>
                      <Option key="Suscripcion 10">Suscripcion 10</Option>
                      <Option key="Suscripcion 11">Suscripcion 11</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Plan">
                  {getFieldDecorator('plan', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione el plan'
                      }
                    ],
                    initialValue: 'Plan 1'
                  })(
                    <Select
                      size="large"
                      allowSearch
                      allowClear
                    >
                      <Option key="Plan 1">Plan 1</Option>
                      <Option key="Plan 2">Plan 2</Option>
                      <Option key="Plan 3">Plan 3</Option>
                      <Option key="Plan 4">Plan 4</Option>
                      <Option key="Plan 5">Plan 5</Option>
                      <Option key="Plan 6">Plan 6</Option>
                      <Option key="Plan 7">Plan 7</Option>
                      <Option key="Plan 8">Plan 8</Option>
                      <Option key="Plan 9">Plan 9</Option>
                      <Option key="Plan 10">Plan 10</Option>
                      <Option key="Plan 11">Plan 11</Option>
                    </Select>
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
              <Col sm={24} md={4} lg={4}>
                <Form.Item label="Monto">
                  {getFieldDecorator('monto', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, ingrese el monto'
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
                <Form.Item label="Fecha de Emisión">
                  {getFieldDecorator('fecha_emision', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione la fecha de emision'
                      }
                    ],
                    initialValue: moment(new Date())
                  })(
                    <DatePicker
                      size="large"
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
export default class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  // INICIO funciones del Modal Agregar Factura
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
  // FIN funciones del Modal Agregar Factura
  render() {
    return (
      <div>
        {/*<Title style={{ textAlign: 'center' }}>Facturas</Title>
        <Button type="primary" onClick={this.showModal}>
          Nueva Factura
        </Button>
        <ModalFacturas
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <br />
        <WrappedEditableTable
        key={Math.random()}
        />
      */}
      </div>


    )
  }
}