import React from 'react';
import { Form, Row, Col, Select, DatePicker, Button, Typography } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title } = Typography;

class AsignarTarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err)
                return;
            console.log('Received values from', values);
        });
    }

    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Title style={{ textAlign: 'center' }}>Asignar Tareas</Title>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row type="flex" justify="space-around">
                        <Col sm={24} md={10} lg={10}>
                            <Form.Item label="Responsable">
                                {getFieldDecorator('responsable', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione un responsable'
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
                                            Responsable 1
                                </Option>
                                        <Option
                                            key="opt-2"
                                            value="value-opt-2"
                                        >
                                            Responsable 2
                                </Option>
                                        <Option
                                            key="opt-3"
                                            value="value-opt-3"
                                        >
                                            Responsable 3
                                </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col sm={24} md={10} lg={10}>
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
                                        // mode="multiple"
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
                    </Row>
                    <Row type="flex" justify="space-around">
                        <Col sm={24} md={10} lg={10}>
                            <Form.Item label="Fecha">
                                {getFieldDecorator('fecha', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione las fechas'
                                        }
                                    ],
                                    initialValue: [moment(new Date()), moment(new Date())]
                                })(
                                    <RangePicker
                                        size="large"
                                        onChange={this.onChange}
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00', 'HH:mm'), moment('11:59', 'HH:mm')],
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Asignar</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedAsignarTarea = Form.create({ name: 'form_asignar_tarea' })(AsignarTarea);
export default WrappedAsignarTarea;