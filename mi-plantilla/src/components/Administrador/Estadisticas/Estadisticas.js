import React from 'react';
import { Typography, message, Row, Col } from 'antd';
import MetodosAxios from '../../../requerimientos/MetodosAxios';
import PieChart from 'react-minimal-pie-chart';

const { Title, Text } = Typography;

export default class Estadisticas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edad_tutores: [],
    }
  }
  obtener_edad_tutores = () => {
    let edad_tutores = [];
    MetodosAxios.obtener_tutores_menores_a_25().then(res => {
      // console.log(res)
      let obj = {
        title: "Menores a 25",
        value: res.data[0].MenoresA25,
        color: '#E38627',
      }
      edad_tutores.push(obj)
    }).catch(err => {
      message.error('Error al cargar la edad de los tutores');
      console.log(err);
    });

    MetodosAxios.obtener_tutores_entre_25_y_30().then(res => {
      // console.log(res)
      let obj = {
        title: "Entre 25 y 30",
        value: res.data[0].Entre25y30,
        color: '#C13C37',
      }
      edad_tutores.push(obj)
      this.setState({
        edad_tutores: edad_tutores,
      }, () => {
        console.log('this.state.edad_tutores', this.state.edad_tutores);
      })
    }).catch(err => {
      message.error('Error al cargar la edad de los tutores');
      console.log(err);
    });

    MetodosAxios.obtener_tutores_entre_30_y_40().then(res => {
      // console.log(res)
      let obj = {
        title: "Entre 30 y 40",
        value: res.data[0].Entre30y40,
        color: '#6A2135',
      }
      edad_tutores.push(obj)
      this.setState({
        edad_tutores: edad_tutores,
      }, () => {
        console.log('this.state.edad_tutores', this.state.edad_tutores);
      })
    }).catch(err => {
      message.error('Error al cargar la edad de los tutores');
      console.log(err);
    });
    MetodosAxios.obtener_tutores_mayores_a_40().then(res => {
      // console.log(res)
      let obj = {
        title: "Mayores a 40",
        value: res.data[0].MayoresA40,
        color: '#00FFFF',
      }
      edad_tutores.push(obj)
      this.setState({
        edad_tutores: edad_tutores,
      }, () => {
        console.log('this.state.edad_tutores', this.state.edad_tutores);
      })
    }).catch(err => {
      message.error('Error al cargar la edad de los tutores');
      console.log(err);
    });
  }
  componentDidMount = () => {
    this.obtener_edad_tutores();
  }
  render() {
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Estadisticas</Title>
        <Title level={3} style={{ textAlign: 'left' }}>Numero de tutores por edad</Title>
        {
          this.state.edad_tutores &&
          <PieChart
            data={this.state.edad_tutores}
            cx={10}
            cy={10}
            radius={10}
            label
            labelStyle={{
              fontSize: '25%',
              fontFamily: 'sans-serif',

            }}
          />
        }
        <div>
        </div>
      </div>
    )
  }
}