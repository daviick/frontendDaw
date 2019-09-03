import React from 'react';
import 'antd/dist/antd.css';
import WrappedEditableTable from './WrappedEditableTable';
import WrappedAgregarUsuario from './WrappedEditableTable';
import MetodosAxios from '../../requerimientos/MetodosAxios';
import { Typography, Button, Modal, Form, Select, Input, Radio, Row, Col, Checkbox, } from 'antd';
import '../../App.css';
import im1 from '../../img/blog/c1.jpg';
import im2 from '../../img/blog/c4.jpg';
import im3 from '../../img/blog/c5.jpg';
                        import im4 from '../../img/blog/c2.jpg';
                        import im5 from '../../img/blog/author.png';
                        import im6 from '../../img/blog/c6.jpg';
import im7 from '../../img/blog/c3.jpg';

const { Title } = Typography;
const { Option, OptGroup } = Select;
const { TextArea } = Input;

const ModalFrecuencia = Form.create({ name: 'form_frecuencia' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                habilitarFrecuenciaDiaria: true,
                habilitarFrecuenciaSemanal: false,
                habilitarFrecuenciaMensual: false,
            };
        }
        handleChangeFrecuenciaDiaria = e => {
            // console.log(e);
            this.setState({
                habilitarFrecuenciaDiaria: !this.state.habilitarFrecuenciaDiaria,
                habilitarFrecuenciaSemanal: false,
                habilitarFrecuenciaMensual: false,
            }, () => {
                // console.log('this.state.habilitarFrecuenciaDiaria', this.state.habilitarFrecuenciaDiaria);
            });
        }

        handleChangeFrecuenciaSemanal = e => {
            // console.log(e);
            this.setState({
                habilitarFrecuenciaDiaria: false,
                habilitarFrecuenciaSemanal: !this.state.habilitarFrecuenciaSemanal,
                habilitarFrecuenciaMensual: false,
            }, () => {
                // console.log('this.state.habilitarFrecuenciaSemanal', this.state.habilitarFrecuenciaSemanal);
            });
        }

        handleChangeFrecuenciaMensual = e => {
            // console.log(e);
            this.setState({
                habilitarFrecuenciaDiaria: false,
                habilitarFrecuenciaSemanal: false,
                habilitarFrecuenciaMensual: true,
            }, () => {
                // console.log('this.state.habilitarFrecuenciaMensual', this.state.habilitarFrecuenciaMensual);
            });
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Agregar Frecuencia"
                    okText="Crear"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}>
                    <Form layout="vertical">
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={8} lg={8}>
                                <Form.Item label=
                                    {<span>
                                        <Checkbox
                                            checked={this.state.habilitarFrecuenciaDiaria}
                                            onChange={this.handleChangeFrecuenciaDiaria}
                                        >
                                            Frecuencia Diaria
                                        </Checkbox>
                                    </span>}>
                                    {getFieldDecorator('frecuencia_diaria', {
                                        rules: [{ required: this.state.habilitarFrecuenciaDiaria, message: 'Por favor, seleccione la frecuencia diaria' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Select
                                            style={{ width: 120 }}
                                            disabled={!this.state.habilitarFrecuenciaDiaria}
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={4}>4</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={8} lg={8}>
                                <Form.Item label=
                                    {<span>
                                        <Checkbox
                                            checked={this.state.habilitarFrecuenciaSemanal}
                                            onChange={this.handleChangeFrecuenciaSemanal}
                                        >
                                            Frecuencia Semanal
                                        </Checkbox>
                                    </span>}>
                                    {getFieldDecorator('frecuencia_semanal', {
                                        rules: [{ required: this.state.habilitarFrecuenciaSemanal, message: 'Por favor, seleccione la frecuencia semanal' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Select
                                            style={{ width: 120 }}
                                            disabled={!this.state.habilitarFrecuenciaSemanal}
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={4}>4</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={8} lg={8}>
                                <Form.Item label=
                                    {<span>
                                        <Checkbox
                                            checked={this.state.habilitarFrecuenciaMensual}
                                            onChange={this.handleChangeFrecuenciaMensual}
                                        >
                                            Frecuencia Mensual
                                        </Checkbox>
                                    </span>}>
                                    {getFieldDecorator('frecuencia_mensual', {
                                        rules: [{ required: this.state.habilitarFrecuenciaMensual, message: 'Por favor, seleccione la frecuencia mensual' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Select
                                            style={{ width: 120 }}
                                            disabled={!this.state.habilitarFrecuenciaMensual}
                                        >
                                            <Option value={1}>1</Option>
                                            <Option value={2}>2</Option>
                                            <Option value={3}>3</Option>
                                            <Option value={4}>4</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }

    }
);

const ModalResponsable = Form.create({ name: 'form_responsable' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {

            };
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Agregar Responsable"
                    okText="Crear"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}>
                    <Form layout="vertical">
                        <Row type="flex" justify="space-between">
                            <Col>
                                <Form.Item label="Responsable">
                                    {getFieldDecorator('responsable', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Por favor seleccione el o los responsables'
                                            }
                                        ],
                                        // initialValue: 'fdksnlkd'
                                    })(
                                        <Select
                                            allowClear
                                            autoFocus
                                            mode="multiple"
                                            size="large"
                                            style={{ width: 400 }}
                                        >
                                            <OptGroup
                                                key="optgroup-1"
                                                label="Grupo 1"
                                            >
                                                <Option
                                                    key="option-1"
                                                    value="id-option-1"
                                                >
                                                    Opcion 1
                                                </Option>
                                                <Option
                                                    key="option-2"
                                                    value="id-option-2"
                                                >
                                                    Opcion 2
                                                </Option>
                                            </OptGroup>
                                            <OptGroup
                                                key="optgroup-2"
                                                label="Grupo 2"
                                            >
                                                <Option
                                                    key="option-3"
                                                    value="id-option-3"
                                                >
                                                    Opcion 3
                                                </Option>
                                                <Option
                                                    key="option-4"
                                                    value="id-option-4"
                                                >
                                                    Opcion 4
                                                </Option>
                                            </OptGroup>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    }
);

const ModalRequerimiento = Form.create({ name: 'form_requerimiento' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: 1,
            };
        }

        onChange = e => {
            console.log('radio checked', e.target.value);
            this.setState({
                value: e.target.value,
            });
        };

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };
            return (
                <Modal
                    visible={visible}
                    title="Agregar Requerimiento"
                    okText="Crear"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layput="vertical">
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={14} lg={14}>
                                <Form.Item label="Requerimiento">
                                    {getFieldDecorator('requerimiento', {
                                        rules: [{ required: true, message: 'Por favor, seleccione el requerimiento' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Radio.Group onChange={this.onChange}>
                                            <Radio style={radioStyle} value={1}>
                                                Pedir Fotografía
                                            </Radio>
                                            <Radio style={radioStyle} value={2}>
                                                Escanear QR
                                            </Radio>
                                            <Radio style={radioStyle} value={3}>
                                                Pedir Información
                                            </Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            );
        }
    }
);

const ModalAntecedente = Form.create({ name: 'form_antecedente' })(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {

            };
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Agregar Antecedente"
                    okText="Crear"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={24} lg={24}>
                                <Form.Item label="Antecedente">
                                    {getFieldDecorator('antecedente', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Por favor, ingrese un antecedente'
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
                    </Form>
                </Modal>
            );
        }
    }
);

const ModalCrearTarea = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                habilitarRequerimiento: false,
                habilitarAntecedente: false,
                // visibilidad de los modales
                visibilidadModalFrecuencia: false,
                visibilidadModalResponsable: false,
                visibilidadModalRequerimiento: false,
                visibilidadModalAntecedente: false,
            };
            this.mostrarModalFrecuencia = this.mostrarModalFrecuencia.bind(this);
            this.mostrarModalResponsable = this.mostrarModalResponsable.bind(this);
            this.mostrarModalRequerimiento = this.mostrarModalRequerimiento.bind(this);
            this.mostrarModalAntecedente = this.mostrarModalAntecedente.bind(this);
        }
        // INICIO funciones para el Modal de Requerimiento
        mostrarModalRequerimiento = e => {
            // console.log(e);
            this.setState({
                visibilidadModalRequerimiento: true,
            }, () => {
                // console.log('this.state.visibilidadModalRequerimiento', this.state.visibilidadModalRequerimiento)
                this.props.mostrarModalRequerimiento(this.state.habilitarRequerimiento);
            });
        };
        // FIN funciones para el Modal de Requerimiento

        // INICIO funciones para el Modal de Frecuencia
        mostrarModalFrecuencia = e => {
            // console.log(e);
            this.setState({
                visibilidadModalFrecuencia: true,
            }, () => {
                // console.log('this.state.visibilidadModalFrecuencia', this.state.visibilidadModalFrecuencia);
                this.props.mostrarModalFrecuencia(this.state.visibilidadModalFrecuencia);
            });
        }
        // FIN funciones para el Modal de Frecuencia

        // INICIO funciones para el Modal de Responsable
        mostrarModalResponsable = e => {
            // console.log(e);
            this.setState({
                visibilidadModalResponsable: true,
            }, () => {
                // console.log('this.state.visibilidadModalResponsable', this.state.visibilidadModalResponsable);
                this.props.mostrarModalResponsable(this.state.visibilidadModalResponsable);
            });
        }
        // FIN funciones para el Modal de Responsable

        // INICIO funciones para el Modal Antecedente
        mostrarModalAntecedente = e => {
            console.log(e);
            this.setState({
                visibilidadModalAntecedente: true,
            }, () => {
                // console.log('this.state.visibilidadModalAntecedente', this.state.visibilidadModalAntecedente);
                this.props.mostrarModalAntecedente(this.state.visibilidadModalAntecedente);
            });
        }
        // FIN funciones para el Modal Antecedente

        handleChangeRequerimiento = e => {
            // console.log(e);
            this.setState({
                habilitarRequerimiento: !this.state.habilitarRequerimiento,
            }, () => {
                console.log('this.state.habilitarRequerimiento', this.state.habilitarRequerimiento);
            });
        }
        handleChangeAntecedente = e => {
            // console.log(e);
            this.setState({
                habilitarAntecedente: !this.state.habilitarAntecedente,
            }, () => {
                console.log('this.state.habilitarAntecedente', this.state.habilitarAntecedente);
            });
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Crear Nueva Tarea"
                    okText="Crear"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={14} lg={14}>
                                <Form.Item label="Nombre">
                                    {getFieldDecorator('nombre', {
                                        rules: [{ required: true, message: 'Por favor, ingrese el nombre' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={8} lg={8}>
                                <Form.Item label="Relevancia">
                                    {getFieldDecorator('relevancia', {
                                        rules: [{ required: true, message: 'Por favor, seleccione la relevancia' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Select style={{ width: 120 }} >
                                            <Option value="urgente">Urgente</Option>
                                            <Option value="inmediato">Inmediato</Option>
                                            <Option value="importante">Importante</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={24} lg={24}>
                                <Form.Item label="Descripción">
                                    {getFieldDecorator('descripcion', {
                                        rules: [{ required: true, message: 'Por favor, ingrese la descripcion' }],
                                        // initialValue: "lucy"
                                    })(
                                        <TextArea
                                            placeholder="Autosize height with minimum and maximum number of lines"
                                            autosize={{ minRows: 2, maxRows: 6 }}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={12} lg={12}>
                                <Form.Item label="Frecuencia">
                                    {getFieldDecorator('frecuencia', {
                                        rules: [{ required: true, message: 'Por favor, agregue la frecuencia' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Row type="flex" justify="space-between">
                                            <Col sm={24} md={24} lg={24}>
                                                <Button type="primary" onClick={this.mostrarModalFrecuencia}>Agregar</Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={12} lg={12}>
                                <Form.Item label="Responsable">
                                    {getFieldDecorator('responsable', {
                                        rules: [{ required: true, message: 'Por favor, agregue el responsable' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Row type="flex" justify="space-between">
                                            <Col sm={24} md={8} lg={8}>
                                                <Button type="primary" onClick={this.mostrarModalResponsable}>Agregar</Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-between">
                            <Col sm={24} md={12} lg={12}>
                                <Form.Item label={
                                    <span>
                                        <Checkbox
                                            checked={this.state.habilitarRequerimiento}
                                            onChange={this.handleChangeRequerimiento}
                                        >
                                            Requerimiento
                                        </Checkbox>
                                    </span>
                                }>
                                    {getFieldDecorator('requerimiento', {
                                        rules: [{ required: this.state.habilitarRequerimiento, message: 'Por favor, ingrese el requerimiento' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Row type="flex" justify="space-between">
                                            <Col sm={24} md={24} lg={24}>
                                                <Button type="primary" disabled={!this.state.habilitarRequerimiento} onClick={this.mostrarModalRequerimiento}>Agregar</Button>
                                            </Col>
                                        </Row>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={12} lg={12}>
                                <Form.Item label={
                                    <span>
                                        <Checkbox
                                            checked={this.state.habilitarAntecedente}
                                            onChange={this.handleChangeAntecedente}
                                        >
                                            Antecedente
                                    </Checkbox>
                                    </span>
                                }>
                                    {getFieldDecorator('antecedente', {
                                        rules: [{ required: this.state.habilitarAntecedente, message: 'Por favor, ingrese el antecedente' }],
                                        // initialValue: "lucy"
                                    })(
                                        <Row type="flex" justify="space-between">
                                            <Col sm={24} md={8} lg={8}>
                                                <Button type="primary" disabled={!this.state.habilitarAntecedente} onClick={this.mostrarModalAntecedente}>Agregar</Button>
                                            </Col>
                                        </Row>
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

export default class AdmTareas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [],
            // visibilidad de los modales
            visibilidadModalFrecuencia: false,
            visibilidadModalResponsable: false,
            visibilidadModalRequerimiento: false,
            visibilidadModalAntecedente: false,
            frecuencia: '',
            responsable: '',
            requerimiento: '',
        }
    }

    // INICIO funciones del modal principal
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
    // FIN funciones del modal principal

    componentDidMount = () => {
    }

    // INICIO funciones para el Modal de Requerimientos
    mostrarModalRequerimiento = visibilidadModalRequerimiento => {
        /**
         * recibo el requerimiento enviado desde el 
         * hijo hacia el padre
         */
        // console.log('recibo visibilidad del modal requerimiento desde el hijo hacia el padre', visibilidadModalRequerimiento);
        this.setState({
            visibilidadModalRequerimiento: visibilidadModalRequerimiento,
        }, () => {
            // console.log('this.state.visibilidadModalRequerimiento', this.state.visibilidadModalRequerimiento);
        });
    };

    handleCancelModalRequerimiento = () => {
        this.setState({ visibilidadModalRequerimiento: false });
    };

    handleCreateModalRequerimiento = () => {
        const { form } = this.formRefModalRequerimiento.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({
                requerimiento: values.requerimiento,
            }, () => {
                console.log('this.state.requerimiento', this.state.requerimiento);
            });
            form.resetFields();
            this.setState({ visibilidadModalRequerimiento: false });
        });
    };

    saveFormRefModalRequerimiento = formRefModalRequerimiento => {
        this.formRefModalRequerimiento = formRefModalRequerimiento;
    };
    // FIN funciones para el Modal de Requerimientos

    // INICIO funciones para el Modal de Frecuencia
    mostrarModalFrecuencia = visibilidadModalFrecuencia => {
        /**
         * recibo el requerimiento enviado desde el 
         * hijo hacia el padre
         */
        // console.log('recibo visibilidad del modal frecuencia desde el hijo hacia el padre', visibilidadModalFrecuencia);
        this.setState({
            visibilidadModalFrecuencia: visibilidadModalFrecuencia,
        }, () => {
            // console.log('this.state.visibilidadModalFrecuencia', this.state.visibilidadModalFrecuencia);
        });
    };
    handleCancelModalFrecuencia = () => {
        this.setState({ visibilidadModalFrecuencia: false });
    };

    handleCreateModalFrecuencia = () => {
        const { form } = this.formRefModalFrecuencia.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({
                frecuencia: values.frecuencia,
            }, () => {
                console.log('this.state.frecuencia', this.state.frecuencia);
            });
            form.resetFields();
            this.setState({ visibilidadModalFrecuencia: false });
        });
    };

    saveFormRefModalFrecuencia = formRefModalFrecuencia => {
        this.formRefModalFrecuencia = formRefModalFrecuencia;
    };
    // FIN funciones para el Modal de Frecuencia

    // INICIO funciones para el Modal de Responsable
    mostrarModalResponsable = visibilidadModalResponsable => {
        /**
         * recibo el requerimiento enviado desde el 
         * hijo hacia el padre
         */
        this.setState({
            visibilidadModalResponsable: visibilidadModalResponsable,
        }, () => {
            // console.log('this.state.visibilidadModalResponsable', this.state.visibilidadModalResponsable);
        });
    };
    handleCancelModalResponsable = () => {
        this.setState({ visibilidadModalResponsable: false });
    };

    handleCreateModalResponsable = () => {
        const { form } = this.formRefModalResponsable.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({
                responsable: values.responsable,
            }, () => {
                console.log('this.state.responsable', this.state.responsable);
            });
            form.resetFields();
            this.setState({ visibilidadModalResponsable: false });
        });
    };

    saveFormRefModalResponsable = formRefModalResponsable => {
        this.formRefModalResponsable = formRefModalResponsable;
    };
    // FIN de funciones para el Modal de Responsable

    // INICIO de funciones para el Modal Antecedente
    mostrarModalAntecedente = visibilidadModalAntecedente => {
        /**
         * recibo el requerimiento enviado desde el 
         * hijo hacia el padre
         */
        this.setState({
            visibilidadModalAntecedente: visibilidadModalAntecedente,
        }, () => {
            // console.log('this.state.visibilidadModalAntecedente', this.state.visibilidadModalAntecedente);            
        });
    };
    handleCancelModalAntecedente = () => {
        this.setState({ visibilidadModalAntecedente: false });
    };

    handleCreateModalAntecedente = () => {
        const { form } = this.formRefModalAntecedente.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            this.setState({
                antecedente: values.antecedente,
            }, () => {
                console.log('this.state.antecedente', this.state.antecedente);
            });
            form.resetFields();
            this.setState({ visibilidadModalAntecedente: false });
        });
    };

    saveFormRefModalAntecedente = formRefModalAntecedente => {
        this.formRefModalAntecedente = formRefModalAntecedente;
    };
    // FIN DE funciones para el Modal Antecedente
    render() {
        return (
            <div>
                {/*<Title style={{ textAlign: 'center' }}>Mis Tareas</Title>
                <Button type="primary" onClick={this.showModal}>
                    Nuevo Tarea
                </Button>
                <ModalCrearTarea
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}                    
                    mostrarModalFrecuencia={this.mostrarModalFrecuencia}
                    mostrarModalResponsable={this.mostrarModalResponsable}
                    mostrarModalRequerimiento={this.mostrarModalRequerimiento}
                    mostrarModalAntecedente={this.mostrarModalAntecedente}
                />
                <ModalFrecuencia
                    wrappedComponentRef={this.saveFormRefModalFrecuencia}
                    visible={this.state.visibilidadModalFrecuencia}
                    onCancel={this.handleCancelModalFrecuencia}
                    onCreate={this.handleCreateModalFrecuencia}
                />
                <ModalResponsable
                    wrappedComponentRef={this.saveFormRefModalResponsable}
                    visible={this.state.visibilidadModalResponsable}
                    onCancel={this.handleCancelModalResponsable}
                    onCreate={this.handleCreateModalResponsable}
                />
                <ModalRequerimiento
                    wrappedComponentRef={this.saveFormRefModalRequerimiento}
                    visible={this.state.visibilidadModalRequerimiento}
                    onCancel={this.handleCancelModalRequerimiento}
                    onCreate={this.handleCreateModalRequerimiento}
                />
                <ModalAntecedente
                    wrappedComponentRef={this.saveFormRefModalAntecedente}
                    visible={this.state.visibilidadModalAntecedente}
                    onCancel={this.handleCancelModalAntecedente}
                    onCreate={this.handleCreateModalAntecedente}
                />
                <br />
                {
                    this.state.data &&
                    <WrappedEditableTable
                        key={Math.random()}
                    />
                }*/}

    <section class="course_details_area section_gap">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 course_details_left">
                    <h4 class="title">Nuestros tutores</h4>
                    <div class="content">
                        <aside class="single_sidebar_widget search_widget">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="¿Qué materia o tema deseas aprender?" />
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
                                </span>
                            </div>
                            
                        </aside>
                        

                        <div class="comments-area mb-30">
                            <div class="comment-list">
                                <div class="single-comment single-reviews justify-content-between d-flex">
                                    <div class="user justify-content-between d-flex">
                                        <div class="thumb">
                                            <img src={im1} width="85" height="85" alt="" />
                                            <div class="star">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                        </div>

                                        <div class="desc">
                                            <h5><a href="#">Emilly Blunt</a></h5>
                                            <p class="comment">
                                                Profesora de inglés
                                            </p>
                                            <p class="comment">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore.
                                            </p>
                                            <a class="genric-btn success medium" href="#" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Ver más</a>
                                        </div>

                                    </div>
                                </div>
                                
                                <div class="collapse" id="collapseExample">
                                    <div class="card card-body mb-30 justify-content-between d-flex">
                                        <div class="col-lg-12 right-contents">
                                            
                                            <div class="blog_right_sidebar">
                                                <aside class="single_sidebar_widget author_widget">
                                                    
                                                    <h4 >Emilly Blunt</h4>
                                                    <p>Soy nativa inglés bilingüe Español. La metodología de mis lecciones se centra en las cuatro áreas clave de escuchar, hablar, leer y escribir. Me concentro en la gramática y el vocabulario. Las lecciones son interactivas y requieren la participación de los estudiantes. Los métodos son con enlaces web, videos y la pizarra para contenido escrito. Durante las lecciones hacemos varios ejercicios de las áreas clave. Cada lección tiene un plan establecido para garantizar la mejora continua del idioma.</p>
                                                    <a class="primary-btn"><i class="fa fa-envelope" aria-hidden="true"></i> Enviar mensaje</a>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget post_category_widget">
                                                    <h4 class="widget_title">Enseña</h4>
                                                    <ul class="list cat-list">
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Inglés británico</p>
                                                                <p>Nivel básico</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Inglés avanzado</p>
                                                                <p>Nivel avanzado</p>
                                                            </a>
                                                        </li>
                                                        
                                                    </ul>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget popular_post_widget">
                                                    <h3 class="widget_title">Horarios disponibles</h3>
                                                   
                                                    <div class="br"></div>
                                                </aside>
                                                <div class="comments-area">
                                                    <h4 class="widget_title">Comentarios de alumnos</h4>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im2} alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Lorena Landi</a></h5>
                                                                    <p class="date">Janvier 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Excelente profesora!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im3} alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Naath Rogers</a></h5>
                                                                    <p class="date">March 24, 2019 at 0:12 pm </p>
                                                                    <p class="comment">
                                                                        Excellent Teacher!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                   
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div class="comment-list">
                                <div class="single-comment single-reviews justify-content-between d-flex">
                                    <div class="user justify-content-between d-flex">
                                        <div class="thumb">
                                            <img src={im4} width="85" height="85" alt="" /> 
                                            <div class="star">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                        </div>
                                        <div class="desc">
                                            <h5><a href="#">Martín Dunn</a></h5>
                                            <p class="comment">
                                                Matemático
                                            </p>
                                            <p class="comment">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore.
                                            </p>
                                            <a class="genric-btn success medium" href="#" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">Ver más</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="collapse" id="collapseExample1">
                                    <div class="card card-body mb-30 justify-content-between d-flex">
                                        <div class="col-lg-12 right-contents">
                                            <h4 class="title">Perfil</h4>
                                            <div class="blog_right_sidebar">
                                                <aside class="single_sidebar_widget author_widget">
                                                    <img class="author_img rounded-circle" src={im5} alt="" /> 
                                                    <h4 >Martín Dunn</h4>
                                                    <p>Hola, me llamo Martín y, aunque estudié ingeniería, siempre me he dedicado a la enseñanza en clases presenciales para alumnos de bachiller y universidad, actividad que me ha alegrado la vida además de darme dinero. Por eso estoy aquí, para clarificarte dudas puntuales, corregirte o resolverte problemas o dirigirte en el aprendizaje con lecturas recomendadas, apuntes propios o charlas online.</p>                                                     <a class="primary-btn">Solicitar clase</a>
                                                    <a class="primary-btn"><i class="fa fa-envelope" aria-hidden="true"></i> Enviar mensaje</a>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget post_category_widget">
                                                    <h4 class="widget_title">Enseña</h4>
                                                    <ul class="list cat-list">
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Informática</p>
                                                                <p>Nivel básico</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Matemáticas</p>
                                                                <p>Nivel avanzado</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Francés</p>
                                                                <p>Nivel medio</p>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget popular_post_widget">
                                                    <h3 class="widget_title">Horarios disponibles</h3>
                                                    
                                                    <div class="br"></div>
                                                </aside>
                                                <div class="comments-area">
                                                    <h4 class="widget_title">Comentarios de alumnos</h4>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im2} alt="" /> 
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Maria Luna</a></h5>
                                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Excelente profesor!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im3} alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Ina Hayes</a></h5>
                                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Gracias a usted aprobe mate!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                   
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div class="comment-list">
                                <div class="single-comment single-reviews justify-content-between d-flex">
                                    <div class="user justify-content-between d-flex">
                                        <div class="thumb">
                                            <img src={im6} width="85" height="85" alt="" />
                                            <div class="star">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star"></span>
                                                <span class="fa fa-star"></span>
                                            </div>
                                        </div>
                                        <div class="desc">
                                            <h5><a href="#">Elsie Cunningham</a></h5>
                                            <p class="comment">
                                                Profesora de física
                                            </p>
                                            <p class="comment">
                                                Amo la física y mi pasión es transmitir mis conocimientos de manera didáctica y sencilla.
                                            </p>
                                            <a class="genric-btn success medium" href="#" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">Ver más</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="collapse" id="collapseExample2">
                                    <div class="card card-body mb-30 justify-content-between d-flex">
                                        <div class="col-lg-12 right-contents">
                                            <h4 class="title">Perfil</h4>
                                            <div class="blog_right_sidebar">
                                                <aside class="single_sidebar_widget author_widget">
                                                    <img class="author_img rounded-circle" src={im5} alt="" />
                                                    <h4 >Martín Dunn</h4>
                                                    <p>Hola, me llamo Martín y, aunque estudié ingeniería, siempre me he dedicado a la enseñanza en clases presenciales para alumnos de bachiller y universidad, actividad que me ha alegrado la vida además de darme dinero. Por eso estoy aquí, para clarificarte dudas puntuales, corregirte o resolverte problemas o dirigirte en el aprendizaje con lecturas recomendadas, apuntes propios o charlas online.</p> 
                                                    <a class="primary-btn">Solicitar clase</a>
                                                    <a class="primary-btn"><i class="fa fa-envelope" aria-hidden="true"></i> Enviar mensaje</a>
                                                    <div class="br"></div>
                                                <aside class="single_sidebar_widget post_category_widget">
                                                    <h4 class="widget_title">Enseña</h4>
                                                    <ul class="list cat-list">
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Informática</p>
                                                                <p>Nivel básico</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Matemáticas</p>
                                                                <p>Nivel avanzado</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Francés</p>
                                                                <p>Nivel medio</p>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget popular_post_widget">
                                                    <h3 class="widget_title">Horarios disponibles</h3>
                                                   
                                                    <div class="br"></div>
                                                </aside>
                                                <div class="comments-area">
                                                    <h4 class="widget_title">Comentarios de alumnos</h4>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im3}alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Maria Luna</a></h5>
                                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Excelente profesor!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im4} alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Ina Hayes</a></h5>
                                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Gracias a usted aprobe mate!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div></aside>
                                            </div>                   
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div class="comment-list">
                                <div class="single-comment single-reviews justify-content-between d-flex">
                                    <div class="user justify-content-between d-flex">
                                        <div class="thumb">
                                            <img src={im7} width="85" height="85" alt="" /> 
                                            <div class="star">
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                                <span class="fa fa-star checked"></span>
                                            </div>
                                        </div>
                                        <div class="desc">
                                            <h5><a href="#">María Luna</a></h5>
                                            <p class="comment">
                                                Profesora de química
                                            </p>
                                            <p class="comment">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore.
                                            </p>
                                            <a class="genric-btn success medium" href="#" data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">Ver más</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="collapse" id="collapseExample3">
                                    <div class="card card-body mb-30 justify-content-between d-flex">
                                        <div class="col-lg-12 right-contents">
                                            <h4 class="title">Perfil</h4>
                                            <div class="blog_right_sidebar">
                                                <aside class="single_sidebar_widget author_widget">
                                                    <img class="author_img rounded-circle" src={im5} alt="" />
                                                    <h4 >Martín Dunn</h4>
                                                    <p>Hola, me llamo Martín y, aunque estudié ingeniería, siempre me he dedicado a la enseñanza en clases presenciales para alumnos de bachiller y universidad, actividad que me ha alegrado la vida además de darme dinero. Por eso estoy aquí, para clarificarte dudas puntuales, corregirte o resolverte problemas o dirigirte en el aprendizaje con lecturas recomendadas, apuntes propios o charlas online.</p> 

                                                    <a class="primary-btn">Solicitar clase</a>
                                                    <a class="primary-btn"><i class="fa fa-envelope" aria-hidden="true"></i> Enviar mensaje</a>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget post_category_widget">
                                                    <h4 class="widget_title">Enseña</h4>
                                                    <ul class="list cat-list">
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Informática</p>
                                                                <p>Nivel básico</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Matemáticas</p>
                                                                <p>Nivel avanzado</p>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" class="d-flex justify-content-between">
                                                                <p>Francés</p>
                                                                <p>Nivel medio</p>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div class="br"></div>
                                                </aside>
                                                <aside class="single_sidebar_widget popular_post_widget">
                                                    <h3 class="widget_title">Horarios disponibles</h3>
                                                    
                                                    <div class="br"></div>
                                                </aside>
                                                <div class="comments-area">
                                                    <h4 class="widget_title">Comentarios de alumnos</h4>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im2} alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Maria Luna</a></h5>
                                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Excelente profesor!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="comment-list">
                                                        <div class="single-comment justify-content-between d-flex">
                                                            <div class="user justify-content-between d-flex">
                                                                <div class="thumb">
                                                                    <img src={im3} alt="" />
                                                                </div>
                                                                <div class="desc">
                                                                    <h5><a href="#">Ina Hayes</a></h5>
                                                                    <p class="date">December 4, 2017 at 3:12 pm </p>
                                                                    <p class="comment">
                                                                        Gracias a usted aprobe mate!
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="reply-btn">
                                                                <a href="" class="btn-reply text-uppercase">reply</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                   
                                        </div> 
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>




            </div>
        );
    }
}