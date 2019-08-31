import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, Table, Divider, Popconfirm, Icon, DatePicker } from 'antd';
import moment from 'moment';
import WrappedEditableTable from './WrappedEditableTable';
import { Calendar, Badge } from 'antd';
import logo from '../../img/logo.png';
import '../../App.css';


const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;


{/*Funciones para el calendario*-------------*/}

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

{/*--------------------------------------------------------------------------*/}

const ModalSuscripciones = Form.create({ name: 'form_suscripcion' })(
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
          title="Agregar Suscripción"
          okText="Crear"
          cancelText="Cancelar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Row type="flex" justify="space-around">
              <Col sm={24} md={24} lg={24}>
                <Form.Item label="Organización">
                  {getFieldDecorator('organizacion', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione la organizacion'
                      }
                    ],
                    initialValue: 'Organizacion 1'
                  })(
                    <Select
                      size="large"                      
                      allowSearch
                      allowClear
                    >
                      <Option key="Organización 1">Organización 1</Option>
                      <Option key="Organización 2">Organización 2</Option>
                      <Option key="Organización 3">Organización 3</Option>
                      <Option key="Organización 4">Organización 4</Option>
                      <Option key="Organización 5">Organización 5</Option>
                      <Option key="Organización 6">Organización 6</Option>
                      <Option key="Organización 7">Organización 7</Option>
                      <Option key="Organización 8">Organización 8</Option>
                      <Option key="Organización 9">Organización 9</Option>
                      <Option key="Organización 10">Organización 10</Option>
                      <Option key="Organización 11">Organización 11</Option>
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
                        message: 'Por favor, ingrese el nombre'
                      }
                    ],
                    initialValue: 'Plan 1'
                  })(
                    <Select
                      size="large"
                      mode="multiple"
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
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Fecha de Suscripción">
                  {getFieldDecorator('fecha_suscripcion', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione la fecha de suscripcion'
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
              <Col sm={24} md={10} lg={10}>
                <Form.Item label="Fecha de Expiración">
                  {getFieldDecorator('fecha_expiracion', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione la fecha de expiracion'
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

export default class Suscripcion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
        {/*<Title style={{ textAlign: 'center' }}>Suscripciones</Title>
        <Button type="primary" onClick={this.showModal}>
          Nueva Suscripción
        </Button>
        <ModalSuscripciones
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <br />
        <WrappedEditableTable
          key={Math.random()}
        />*/}
          
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
          <section class="calendar area">
          <div class="containerCitas">
            <div class="row">
                
                <div class="col-lg-7 right-contents" display="inline">
                    <h3 class="title">Agendar cita</h3>
                    <ul>
                        <li>
                            <a class="justify-content-between d-flex" >
                                <p>Materia</p>
                                
                                 <div class="col-75">
                                    <input type="text" id="fname" name="firstname" placeholder="Ingresar materia" />
                                 </div>                            


                           </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex" >
                                <p>Fecha</p>
                                <div class="col-75">
                                    
                                   <select id="genero" name="sexo">
                                      <option value="Seleccione">Seleccione</option>
                                      <option value="10:00-12:00am">10:00-12:00am</option>
                                      <option value="14:00-16:00pm">14:00-16:00pm</option>
                                    </select>
                                </div>



                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex" >
                                <p>Lugar </p>
                                <div class="col-75">
                                    <select id="Pais" name="pais">
                                      <option value="Seleccione">Seleccione</option>
                                      <option value="Skype">Skype</option>
                                      <option value="Plataforma">Plataforma</option>
                                      
                                    </select>
                                </div>




                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex">
                                <p>Fecha de la tutoria </p>
                                <div class="col-75">
                                    <input type="text" id="fdate" name="nacimiento" placeholder="día/mes/año" />
                                 </div>



                                
                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex">
                                <p>Representado </p>
                                <div class="col-75">
                                    <input type="text" id="fnamer" name="representado" placeholder="Nombre del representado" />
                                 </div>


                                
                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex">
                                <p>Descripción </p>
                                
                                <div class="col-75">
                                    <input type="text" id="ftelf" name="telefono" placeholder="Inserte una descripción" />
                                 </div>


                                
                            </a>
                        </li>
                    </ul>
                    <a id="submit" href="#" class="genric-btn success large" onclick="">Guardar</a>
                    <div class="alert">
                      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                      
                    </div>
                </div>
                
                
            </div>
        </div>
        
      </section>



      </div>
    )
  }
}
