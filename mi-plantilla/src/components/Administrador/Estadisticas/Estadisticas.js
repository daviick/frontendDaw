import React from 'react';
import { Typography, message, Row, Col } from 'antd';
import MetodosAxios from '../../../requerimientos/MetodosAxios';
import PieChart from 'react-minimal-pie-chart';
import Chart from "react-google-charts";

const { Title, Text } = Typography;
const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7] // CSS-style declaration
];
const options = {
  title: "Costo Promedio Por Materias",
  pieHole: 0.4,
  is3D: false
};

export default class Estadisticas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edad_tutores: [],
      mejores_tutores: [],
      costo_promedio_por_materia: [],
      width: 500,
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

  obtener_mejores_tutores = () => {
    let colores = ["color: gray", "color: blue", "color: red", "color: pink", "color: black", "color: green"];
    let mejores_tutores = [
      ["Nombres", "Calificacion", { role: "style" }],
    ];
    MetodosAxios.obtener_mejores().then(res => {
      // console.log(res);
      res.data.map((registro, index) => {
        let element = [
          `${registro.nombre} ${registro.apellido}`,
          registro.valoracion,
          colores[index],
        ]
        mejores_tutores.push(element);
      });
      this.setState({
        mejores_tutores: mejores_tutores,
      }, () => {
        console.log('this.state.mejores_tutores', this.state.mejores_tutores);
      });
    }).catch(err => {
      message.error('Error al cargar los Diez Mejores');
      console.log(err);
    })
  }

  obtener_costo_promedio_materias = () => {
    let costo_promedio_por_materia = [
      ["Materia", "Costo"],
    ];
    MetodosAxios.obtener_costo_promedio_materias().then(res => {
      // console.log(res);
      res.data.map(registro => {
        let elemento = [
          registro.Materia,
          registro.CostoPromedio,
        ];
        costo_promedio_por_materia.push(elemento);
      });
      this.setState({
        costo_promedio_por_materia: costo_promedio_por_materia,
      }, () => {
        console.log('this.state.costo_promedio_por_materia', this.state.costo_promedio_por_materia);
      });
    }).catch(err => {
      message.error('Error al cargar los costos promedios por materia');
      console.log(err);
    })
  }

  componentDidMount = () => {
    this.obtener_edad_tutores();
    this.obtener_mejores_tutores();
    this.obtener_costo_promedio_materias();
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
              // color: 'white',
            }}
          />
        }
        <Title level={3} style={{ textAlign: 'left' }}>Mejores Tutores</Title>
        {
          this.state.mejores_tutores &&
          <div className="App">
            <Chart chartType="BarChart" width="100%" height="400px" data={this.state.mejores_tutores} />
          </div>
        }
        <Title level={3} style={{ textAlign: 'left' }}>Costo Promedio por Materias</Title>
        {
          this.state.costo_promedio_por_materia &&
          <div className="App">
            <Chart
              chartType="PieChart"
              width="100%"
              height="400px"
              data={this.state.costo_promedio_por_materia}
              options={options}
            />
          </div>
        }
      </div>
    )
  }
}