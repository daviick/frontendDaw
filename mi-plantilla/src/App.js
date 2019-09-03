import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "tabler-react/dist/Tabler.css";
import { Button } from 'antd';
import './App.css';
import "antd/dist/antd.css"

import LayoutPage from "./views/LayoutPage";
import LoginPage from "./views/LoginPage";
import WrappedOlvidoContrasena from './views/WrappedOlvidoContrasena';
import WrappedRegistroUsuario from './views/WrappedRegistroUsuario';

const App = ({ history }) => {
  return(
    <Router history={history}>
      <Switch>
        <Route path='/' component={LoginPage} exact />
        <Route path='/olvido-contrasena' component={WrappedOlvidoContrasena} />
        <Route path='/registro-usuario' component={WrappedRegistroUsuario} />
        <Route path='/administracion' component={LayoutPage} />
        <Route path='/superadmin' component={LayoutPage} />
      </Switch>
    </Router>
  )
};

export default App;