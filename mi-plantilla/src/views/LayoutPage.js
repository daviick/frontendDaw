import React from 'react';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Divider,
  Row,
  Col,
  Typography
} from 'antd';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch,
  NavLink,
} from "react-router-dom";
// INICIO VISTAS OPERACIONES
import logo from '../img/logo.png'
import AdmUsuarios from "../components/Administracion/Usuarios/AdmUsuarios";
import AdmDepartamentos from "../components/Administracion/Departamentos/AdmDepartamentos";
import AdmTareas from "../components/Tareas/AdmTareas";
import WrappedAsignarTarea from "../components/Tareas/WrappedAsignarTarea";
import EstadoTarea from "../components/Tareas/EstadoTarea";
import WrappedActividades from "../components/Reporte/WrappedActividades";
import WrappedDepartamentos from "../components/Reporte/WrappedDepartamentos";
import WrappedOlvidoContrasena from "./WrappedOlvidoContrasena";
import Planes from "../components/Planes/Planes";
import Organizacion from "../components/Organizacion/Organizacion";
import Suscripcion from "../components/Suscripcion/Suscripcion";
import Factura from "../components/Factura/Factura";

import facebook from '../img/f-icons/facebook.png';
import twitter from '../img/f-icons/twitter.png';
import '../App.css';









// FIN VISTAS OPERACIONES

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

class LayoutPage extends React.Component {
  rootSubmenuKeys_administracion = ['administracion', 'tareas', 'reportes', 'factura'];
  constructor(props) {
    super(props);
    this.state = {
      openKeys_administracion: ['administracion'],
      collapsed: false,
    }
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({
      collapsed: collapsed,
      openKeys_administracion: [],
    });
  };

  onOpenChange_administracion = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys_administracion.indexOf(key) === -1);
    if (this.rootSubmenuKeys_administracion.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys_administracion: openKeys });
    } else {
      this.setState({
        openKeys_administracion: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  componentDidMount() {
    document.title = "Operaciones"
  }

  render() {
    console.log('this.props', this.props);
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div style={{ height: '32px', margin: '16px', background: '#A9A9A9' }}>
              {/* <img src={logo} /> */}
            </div>
            {
              this.props.match.path.includes('administracion') &&
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["administracion-usuarios"]}
                // defaultOpenKeys={["administracion-usuarios"]}
                openKeys={this.state.openKeys_administracion}
                onOpenChange={this.onOpenChange_administracion}
              >

                <SubMenu
                  key="reportes"
                  title={
                    <span>
                      <Icon type="pie-chart" />
                      <Link to="/administracion/inicio/"><span>Inicio</span></Link>
                    </span>
                  }
                >
                  
                </SubMenu>

                <SubMenu
                  key="administracion"
                  title={
                    <span>
                      <Icon type="user" />
                      <span>Perfil</span>
                    </span>
                  }
                >
                  <Menu.Item
                    key="administracion-usuarios"
                  >
                    <span>Editar Perfil</span>
                    <Link to="/administracion/usuarios/" />
                  </Menu.Item>
                  <Menu.Item
                    key="administracion-departamentos"
                  >
                    <span>Cerrar Sesion</span>
                    {/*<Link to="/administracion/departamentos/" />*/}
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="tareas"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>Tutorias</span>
                    </span>
                  }
                >
                  <Menu.Item
                    key="tareas-mistareas"
                  >
                    <span>Planificar Tutoria</span>
                    <Link to="/administracion/tareas/" />
                  </Menu.Item>
                  <Menu.Item
                    key="tareas-asignar-tarea"
                  >
                    <span>Seguimiento de Tutoria</span>
                    <Link to="/administracion/asignar-tarea/" />
                  </Menu.Item>
                  <Menu.Item
                    key="tareas-estado-tarea"
                  >
                    <span>Ver Tutores</span>
                    <Link to="/administracion/estado-tarea/" />
                  </Menu.Item>
                </SubMenu>
                
              </Menu>
            }
            {
              this.props.match.path.includes('superadmin') &&
              <Menu
                theme="dark"
                mode="inline"
                // defaultOpenKeys={['planes']}
                // defaultSelectedKeys={['planes']}                
              >
                <Menu.Item
                  key="planes"
                >
                  <Icon type="shop" />
                  <span className="nav-text">Inicio</span>
                  <Link to="/superadmin/planes/" />
                </Menu.Item>
                <Menu.Item
                  key="organizacion"
                >
                  <Icon type="usergroup-delete" />
                  <span className="nav-text">Perfil</span>
                  <Link to="/superadmin/organizacion/" />
                </Menu.Item>
                <Menu.Item
                  key="suscripcion"
                >
                  <Icon type="form" />
                  <span className="nav-text">Citas</span>                  
                  <Link to="/superadmin/suscripcion/" />
                </Menu.Item>
                <Menu.Item
                  key="factura"
                >
                  <Icon type="file" />
                  <span className="nav-text">Cerrar Sesion</span>
                  <Link to="" />
                </Menu.Item>
              </Menu>
            }
          </Sider>
          <Layout>
            <Content style={{ background: 'white' }}>

              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Administracion</Breadcrumb.Item>
                <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
              </Breadcrumb> */}

              <div style={{ background: '#fff', padding: 24, minHeight: '100%' }}>
                <Route path={`${this.props.match.path}/usuarios/`} exact component={AdmUsuarios} />
                <Route path={`${this.props.match.path}/departamentos/`} exact component={AdmDepartamentos} />
                <Route path={`${this.props.match.path}/tareas/`} exact component={AdmTareas} />
                <Route path={`${this.props.match.path}/asignar-tarea/`} exact component={WrappedAsignarTarea} />
                <Route path={`${this.props.match.path}/estado-tarea/`} exact component={EstadoTarea} />
                <Route path={`${this.props.match.path}/reportes/`} exact component={WrappedActividades} />
                <Route path={`${this.props.match.path}/reportes/departamentos`} exact component={WrappedDepartamentos} />

                <Route path={`${this.props.match.path}/planes/`} component={Planes} />
                <Route path={`${this.props.match.path}/organizacion/`} component={Organizacion} />
                <Route path={`${this.props.match.path}/suscripcion/`} component={Suscripcion} />
                <Route path={`${this.props.match.path}/factura/`} component={Factura} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>

                 <div class="container text-center text-md-left">
                <div class="row justify-content-center">
                    <div class="col-lg-2 col-md-6 single-footer-widget">
                        <h4>Contáctanos</h4>
                        
                        <p>help@urmentoring.com</p>
                        <p>1800-10969100</p>
                    </div>
                    <div class="col-lg-2 col-md-6 offset-md-2 single-footer-widget">
                        <h4>Nuestra empresa</h4>
                        
                        <ul>
                            <li><a href="#">Acerca de nosotros</a></li>
                            <li><a href="#">Políticas de privacidad</a></li>
                            <li><a href="#">Términos de servicio</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-6 offset-md-2 single-footer-widget">
                        <h4>Enlaces de interés</h4>
                        
                        <ul>
                            <li><a href="#">Preguntas frecuentes</a></li>
                            <li><a href="#">Mapa web</a></li>
                            <li><a href="#">Quiero ser tutor</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-copyright text-center py-3">
                    Copyright © 2019 All rights reserved 
                    <a href="#"><img src={facebook} alt="" /></a>
                    <a href="#"><img src={twitter} alt="" /></a>
                    </div>

                </div>
            </div>


            </Footer>
          </Layout>
        </Layout>
      </Router >
    );
  }
}

export default LayoutPage;