import React from 'react';
import LayoutLoginPage from "../extras/LayoutLoginPage";
import { Form, Icon, Input, Button, Alert, Row, Col, Typography } from 'antd';
import RedireccionRol from '../requerimientos/RedireccionRol';
import MetodosAxios from '../requerimientos/MetodosAxios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch,
    NavLink,
} from "react-router-dom";
import AdmUsuarios from '../components/Administracion/Usuarios/AdmUsuarios';
import WrappedOlvidoContrasena from './WrappedOlvidoContrasena';

const { Text } = Typography;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingSubmit: false,
            mensajeError: undefined,
            loginError: false,
        }
    }

    /*Manejar el submit del formulario*/
    envioCredenciales = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({ loadingSubmit: true })
                // Cuando se va el internet puedo probar asi
                RedireccionRol.redirectLogin(this.props.history, 1);
                localStorage.setItem('user', JSON.stringify(1));
                // MetodosAxios.login(2)
                //     .then(res => {
                //         console.log(res.data.data);
                //         res.data.data.perfil = 1;
                //         RedireccionRol.redirectLogin(this.props.history, res.data.data.perfil);
                //         localStorage.setItem('user', JSON.stringify(res.data.data));
                //     }).catch(error => {
                //         this.setState({
                //             loadingSubmit: false,
                //             mensajeError: error.message,
                //             loginError: true
                //         });
                //     });
            }
        });
    }

    mostrarMensajeError = () => {
        this.setState({
            loginError: false
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Router>
                <LayoutLoginPage>
                    {this.state.loginError ? <Alert message={this.state.mensajeError} type="error" closable afterClose={this.mostrarMensajeError} showIcon /> : null}
                    <Form onSubmit={this.envioCredenciales} className="login-form">
                        <br></br>
                        <p className="titulo-login">Autenticación</p>
                        <br></br>
                        <Row type="flex" justify="center">
                            <Col sm={24} md={24} lg={24}>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Por favor ingrese su email!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email..." autoComplete="off" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col sm={24} md={24} lg={24}>
                                <Form.Item>
                                    {getFieldDecorator('userpass', {
                                        rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña..." />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center">
                            <Col sm={5} md={5} lg={5}>
                                <Form.Item>
                                    <Button
                                        // style={{ width: 100 }}
                                        size="large"
                                        loading={this.state.loadingSubmit}
                                        type="primary"
                                        htmlType="submit"
                                        className="button-login"
                                    >
                                        Ingresar
                                    {/* <Route path="/administracion/usuarios/" component={AdmUsuarios} />
                                    <NavLink to="/administracion/usuarios/" /> */}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    {/* <Route path="/administracion/usuarios/" component={AdmUsuarios}></Route>
                    <a href="/administracion/usuarios/">¿Olvidó su contraseña?</a> */}
                    <Row type="flex" justify="center">
                        <Col sm={11} md={11} lg={11}>
                            <Route path="/olvido-contrasena" component={AdmUsuarios} />
                            <a href="/olvido-contrasena"><Text style={{textAlign: 'center'}}>¿Olvidó su contraseña?</Text></a>
                        </Col>
                    </Row>
                </LayoutLoginPage>
            </Router>
        );
    }
}

const WrappedLogin = Form.create({ name: 'login' })(Login);

export default WrappedLogin;