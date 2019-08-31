import React from 'react';
import { Typography, Form, DatePicker, Row, Col, Select, Button, Table } from 'antd';
import moment from 'moment';
// Exportar a PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable } from 'jspdf-autotable';

const { Title } = Typography;
const { Option } = Select;

class Actividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    key: 1,
                    nombre: 'Jorge Sanchez',
                    tarea: 'Mantenimiento A',
                    estado: 'Completo',
                    asignado_por: 'Luis Diaz'
                },
                {
                    id: 2,
                    key: 2,
                    nombre: 'Juan Piguave',
                    tarea: 'Revision Tipo A',
                    estado: 'En Proceso',
                    asignado_por: 'Luis Diaz'
                },
                {
                    id: 3,
                    key: 3,
                    nombre: 'Carlos Chuqui',
                    tarea: 'Mantenimiento B',
                    estado: 'Completo',
                    asignado_por: 'Jose Aguilar'
                },
                {
                    id: 4,
                    key: 4,
                    nombre: 'Pedro Delgado',
                    tarea: 'Cambio de Particular',
                    estado: 'Incompleto',
                    asignado_por: 'Juan Aranda'
                },
                {
                    id: 5,
                    key: 5,
                    nombre: 'Luis Castro',
                    tarea: 'Mantenimiento Prog',
                    estado: 'En Proceso',
                    asignado_por: 'Pedro Armas'
                }
            ],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.exportToPDF = this.exportToPDF.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    exportToPDF = () => {
        let lista_actividades_tabla = [];
        this.state.data.map(registro => {
            let lista_elemento = [];
            lista_elemento.push(registro.id);
            lista_elemento.push(registro.nombre);
            lista_elemento.push(registro.tarea);
            lista_elemento.push(registro.tarea);
            lista_elemento.push(registro.estado);
            lista_elemento.push(registro.asignado_por);
            lista_actividades_tabla.push(lista_elemento);
        });
        const doc = new jsPDF({
            orientation: 'landscape',
        });
        doc.autoTable({
            head: [['Código', 'Nombre', 'Tarea', 'Estado', 'Asignado Por']],
            body: lista_actividades_tabla
        });
        doc.save('reporte-todas-las-actividades.pdf');
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err)
                return;
            console.log('Received values from', values);
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Title style={{ textAlign: 'center' }}>Todas las Actividades</Title>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row type="flex" justify="space-around">
                        <Col sm={24} md={6} lg={6}>
                            <Form.Item label="Nombre">
                                {getFieldDecorator('nombre', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione un nombre'
                                        }
                                    ],
                                    // initialValue:
                                })(
                                    <Select
                                        allowClear
                                        // mode="multiple"
                                        size="large"
                                    >
                                        <Option
                                            key="opt-1"
                                            value="value-opt-1"
                                        >
                                            Jorge Sanchez
                                        </Option>
                                        <Option
                                            key="opt-2"
                                            value="value-opt-2"
                                        >
                                            Juan Piguave
                                        </Option>
                                        <Option
                                            key="opt-3"
                                            value="value-opt-3"
                                        >
                                            Carlos Chuqui
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={6} lg={6}>
                            <Form.Item label="Tarea">
                                {getFieldDecorator('tarea', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione una tarea'
                                        }
                                    ],
                                    // initialValue:
                                })(
                                    <Select
                                        allowClear
                                        mode="multiple"
                                        size="large"
                                    >
                                        <Option
                                            key="option-tarea1"
                                        >
                                            Nombre - Descripcion Tarea 1
                                    </Option>
                                        <Option
                                            key="option-tarea2"
                                        >
                                            Nombre - Descripcion Tarea 2
                                    </Option>
                                        <Option
                                            key="option-tarea3"
                                        >
                                            Nombre - Descripcion Tarea 3
                                    </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={4} lg={4}>
                            <Form.Item label="Fecha">
                                {getFieldDecorator('fecha', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione las fechas'
                                        }
                                    ],
                                    initialValue: moment(new Date())
                                })(
                                    <DatePicker
                                        size="large"
                                        onChange={this.onChange}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={4} lg={4}>
                            <Form.Item label={
                                <span></span>
                            }>
                                <Button type="primary" size="large" htmlType="submit">Buscar</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table
                    dataSource={this.state.data}
                    columns={[
                        {
                            title: '#',
                            dataIndex: 'id',
                            key: 'id'
                        },
                        {
                            title: 'Nombre',
                            dataIndex: 'nombre',
                            key: 'Nombre'
                        },
                        {
                            title: 'Tarea',
                            dataIndex: 'tarea',
                            key: 'tarea'
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'estado',
                            key: 'estado'
                        },
                        {
                            title: 'Asignado Por',
                            dataIndex: 'asignado_por',
                            key: 'asignado_por'
                        }
                    ]}
                    bordered
                    loading={false}
                    footer={() => `Número de usuarios encontrados: 5`}
                />
                <Row type="flex" justify="space-around">
                    <Col sm={12} md={6} lg={6}>
                        <Button type="primary" size="large" onClick={this.exportToPDF} icon="download">Exportar a PDF</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedActividades = Form.create({ name: 'form_actividadedes' })(Actividades);
export default WrappedActividades;