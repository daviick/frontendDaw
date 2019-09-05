import React from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import LayoutOlvidoContrasena from '../extras/LayoutOlvidoContrasena';

class OlvidoContrasena extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err)
                return;
            this.setState({loading: true});
            console.log('Received values from', values);
            this.setState({loading: false});
            message.success('¡Felicidades! recuperaste tu cuenta satisfactoriamente. Hemos enviado un correo para restablecer tu constraseña');
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ background: '#ECECEC', padding:'50px 480px 800px 490px' }}>
            
                <Card title="Recuperar contraseña" bordered={true} style={{ width: 400 }}>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Form.Item label="Correo Electronico">
                        {getFieldDecorator('correo', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Por favor, ingrese su correo electronico'
                                }
                            ]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" loading={this.state.loading}>Enviar</Button>
                    </Form.Item>
                </Form>
                </Card>
            
            </div>
        );
    }
}

const WrappedOlvidoContrasena = Form.create({ name: 'form_olvido_contrasena' })(OlvidoContrasena);
export default WrappedOlvidoContrasena;