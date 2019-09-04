import React from 'react';
import LayoutLoginPage from "../extras/LayoutLoginPage";
import { Form, Icon, Input, Button, Alert, Row, Col, Typography, message } from 'antd';
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

        let correo = values['username']        
        MetodosAxios.login_tutor(correo).then(res => {
          console.log(res)
          this.setState({
            usuario: res.data,
            es_tutor: res.data.length > 0,
          }, () => {
            console.log('this.state.es_tutor', this.state.es_tutor)
            if (this.state.es_tutor === true) {
              console.log('entra')
              RedireccionRol.redirectLogin(this.props.history, 1);
              localStorage.setItem('user', JSON.stringify(this.state.usuario));
              console.log('localStorage', localStorage)
            }
          })
        })
        MetodosAxios.login_representante(correo).then(res => {
          console.log(res)
          this.setState({
            usuario: res.data,
            es_representante: res.data.length > 0,
          }, () => {
            console.log('this.state.es_representante', this.state.es_representante)
            if (this.state.es_representante === true) {
              console.log('entra')
              RedireccionRol.redirectLogin(this.props.history, 2);
              localStorage.setItem('user', JSON.stringify(this.state.usuario));
            } else {
              message.error('Lo sentimos, el usuario ingresado no se encuentra registrado')
              this.setState({ loadingSubmit: false })
            }
          })
        })
        // console.log('this.state.es_tutor', this.state.es_tutor)
        // console.log('this.state.es_representante', this.state.es_representante)
        // if (this.state.es_tutor === true) {
        //   console.log('entra')
        //   RedireccionRol.redirectLogin(this.props.history, 1);
        //   localStorage.setItem('user', JSON.stringify(1));
        // } else if (this.state.es_representante === true) {
        //   console.log('entra')
        //   RedireccionRol.redirectLogin(this.props.history, 2);
        //   localStorage.setItem('user', JSON.stringify(2));
        // }
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
              <a href="/olvido-contrasena"><Text style={{ textAlign: 'center' }}>¿Olvidó su contraseña?</Text></a>
            </Col>
            <Col sm={11} md={11} lg={11}>
              <a href="/registro-usuario"><Text style={{ textAlign: 'center' }}>¿No tienes cuenta? Regístrate</Text></a>
            </Col>
          </Row>
        </LayoutLoginPage>
      </Router>
    );
  }
}

const WrappedLogin = Form.create({ name: 'login' })(Login);

export default WrappedLogin;