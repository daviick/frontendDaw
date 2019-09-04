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
// INICIO VISTAS URMENTORING
import logo from '../img/logo.png'

import facebook from '../img/f-icons/facebook.png';
import twitter from '../img/f-icons/twitter.png';
import '../App.css';
import TutoresDisponibles from '../components/Representante/TutoresDisponibles';
import WrappedPerfilRepresentante from '../components/Representante/WrappedPerfilRepresentante';
// FIN VISTAS URMENTORING

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

class LayoutPage extends React.Component {
  rootSubmenuKeys_administracion = ['tutorias'];
  constructor(props) {
    super(props);
    this.state = {
      openKeys_administracion: ['tutorias'],
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
              this.props.match.path.includes('representante') &&
              <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={["administracion-usuarios"]}
                // defaultOpenKeys={["administracion-usuarios"]}
                openKeys={this.state.openKeys_administracion}
                onOpenChange={this.onOpenChange_administracion}
              >
                <SubMenu
                  key="tutorias"
                  title={
                    <span>
                      <Icon type="appstore" />
                      <span>Tutorias</span>
                    </span>
                  }
                >
                  <Menu.Item
                    key="tutores-disponibles"
                  >
                    <span>Tutores Disponibles</span>
                    <Link to="/representante/tutores-disponibles/" />
                  </Menu.Item>
                  <Menu.Item
                    key="perfil"
                  >
                    <span>Mi Perfil</span>
                    <Link to="/representante/perfil/" />
                  </Menu.Item>
                </SubMenu>
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
                <Route path={`${this.props.match.path}/tutores-disponibles/`} component={TutoresDisponibles} />
                <Route path={`${this.props.match.path}/perfil/`} component={WrappedPerfilRepresentante} />
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