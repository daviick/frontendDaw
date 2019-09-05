import React from 'react';
import {
  Table,
  Typography,
  Rate,
  List,
} from 'antd';

import Paragraph from 'antd/lib/skeleton/Paragraph';
import MetodosAxios from '../../requerimientos/MetodosAxios';
import PerfilTutor from './WrappedPerfilTutor';
import WrappedPerfilTutor from './WrappedPerfilTutor';

const { Text, Title } = Typography;

export default class Graficos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      usuario: undefined,
      loading: true,
      
    };
  }

  obtener_materias = cedula => {
    let datos = [];
    MetodosAxios.obtener_materias(cedula).then(res => {
      res.data.map((registro, index) => {
        // console.log(registro);
        let materias = {
          id: registro._id,
          nombres: registro.nombre,
          
        }
        datos.push(materias)
      })
      this.setState({
        datos: datos,
        loading:false,
      }, () => {
        console.log('this.state.datos', this.state.datos)
      })
    })
  }
  componentDidMount = () => {
    const valor = JSON.parse(localStorage.getItem('user'));
    console.log('valores',valor[0]._id);
    this.obtener_materias(valor[0]._id);
  }
  render() {
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Gráficos</Title>
        
      </div>
    )
  }
}