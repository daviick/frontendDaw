import React from 'react';
import {
  Table,
  Typography,
  Rate,
  List,
} from 'antd';
import PerfilTutor from './PerfilTutor';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import MetodosAxios from '../../requerimientos/MetodosAxios';

const { Text, Title } = Typography;

export default class TutoresDisponibles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  obtener_tutores = () => {
    let datos = [];
    MetodosAxios.obtener_tutores().then(res => {
      res.data.map((registro, index) => {
        // console.log(registro);
        let tutor = {
          id: index + 1,
          key: index + 1,
          cedula: registro._id,
          nombres: registro.nombre,
          apellidos: registro.apellido,
          fecha_nac: registro.fecha_nac,
          ciudad: registro.ciudad,
          descripcion: registro.presentacion,
        }
        datos.push(tutor)
      })
      this.setState({
        datos: datos,
        loading: false,
      }, () => {
        console.log('this.state.datos', this.state.datos)
      })
    })
  }
  componentDidMount = () => {
    this.obtener_tutores();
  }
  render() {
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Tutores Disponibles</Title>
        <Table
          columns={[
            {
              title: 'Cedula',
              dataIndex: 'cedula',
              key: 'cedula',
              className: 'column-hide',
            },
            {
              title: '#',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Nombres',
              dataIndex: 'nombres',
              key: 'nombres',
            },
            {
              title: 'Apellidos',
              dataIndex: 'apellidos',
              key: 'apellidos',
            },
            {
              title: 'Descripción',
              dataIndex: 'descripcion',
              key: 'descripcion',
              // width: '50%',
            },
            {
              title: 'Fecha de Nacimiento',
              dataIndex: 'fecha_nac',
              key: 'fecha_nac',
            },
            {
              title: 'Ciudad',
              dataIndex: 'ciudad',
              key: 'ciudad',
            },            
          ]}
          dataSource={this.state.datos}
          loading={this.state.loading}
          expandedRowRender={
            record => 
            <PerfilTutor nombres={record.nombres} descripcion={record.descripcion} cedula={record.cedula}/>
          }
        />
      </div>
    )
  }
}