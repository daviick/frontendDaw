import React from 'react';
import { Typography, Rate, Col, Row, List } from 'antd';
import MetodosAxios from '../../requerimientos/MetodosAxios';
import img from '../../img/tutor.png';

const { Text, Title, Paragraph } = Typography;

export default class Perfiltutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materias: [
        'Matematica',
        'Fisica',
        'Quimica',
      ],
    }
  }
  obtener_materias = (cedula) => {
    let materias = [];
    MetodosAxios.obtener_materias(cedula).then(res => {
      console.log(res);
      res.data.map(registro => {
        let materia = {
          id: registro._id,
          nombre: registro.nombre,
        }
        materias.push(materia);
      })
      this.setState({
        materias: materias,
      }, () => {
        console.log('this.state.materias', this.state.materias);
      });
    })
  }
  componentDidMount = () => {
    this.obtener_materias(this.props.cedula);
  }
  render() {
    return (
      <div>
        <Title level={4} style={{ textAlign: 'center' }}>Perfil Tutor</Title>
        <img src={img} alt="Imagen del tutor" />
        <Title level={4} style={{ textAlign: 'center' }}>{this.props.nombres}</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          {this.props.descripcion}
        </Paragraph>
        <Title level={4} style={{ margin: '16px 0', textAlign: 'center' }}>Enseña</Title>
        <List
          size="small"
          bordered
          dataSource={this.state.materias}
          renderItem={item => <List.Item>{item.nombre}</List.Item>}
        />

      </div>
    )
  }
}
