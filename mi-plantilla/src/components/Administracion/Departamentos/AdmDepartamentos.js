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
                    title="Crear Nuevo Departamento"
                    okText="Crear"
                    cancelText="Cancelar"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Código">
                            {getFieldDecorator('codigo', {
                                rules: [{ required: true, message: 'Por favor, ingrese el codigo' }],
                                // initialValue: "lucy"
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Nombre">
                            {getFieldDecorator('nombre', {
                                rules: [{ required: true, message: 'Por favor, ingrese el nombre' }],
                                // initialValue: "lucy"
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Estado">
                            {getFieldDecorator('estado', {
                                rules: [{ required: true, message: 'Por favor, seleccione el estado' }],
                                // initialValue: "lucy"
                            })(
                                <Select style={{ width: 120 }} >
                                    <Option value={true}>Activo</Option>
                                    <Option value={false}>Inactivo</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default class AdmDepartamentos extends React.Component {
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
                <Title style={{ textAlign: 'center' }}>Departamentos</Title>
                <Button type="primary" onClick={this.showModal}>
                    Nuevo Departamento
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
                }
            </div>
        );
    }
}