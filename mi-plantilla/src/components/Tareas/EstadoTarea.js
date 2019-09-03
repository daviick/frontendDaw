import React from 'react';
import { Table, Typography, Rate } from 'antd';

const { Text, Title } = Typography;

export default class EstadoTarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Tutores Disponibles</Title>
        <Table
          dataSource={[
            {
              id: 1,
              key: 1,
              nombre: 'David Durango',
              descripcion: 'asdfghjklzxcvbnm,',
              rating: 5,
            },
            {
              id: 2,
              key: 2,
              nombre: 'Samuel Braganza',
              descripcion: 'asdfghjklzxcvbnm,',
              rating: 5,
            },
            {
              id: 3,
              key: 3,
              nombre: 'Steffany Aguirre',
              descripcion: 'asdfghjklzxcvbnm,',
              rating: 5,
            },
            {
              id: 4,
              key: 4,
              nombre: 'Rosita Pincay',
              descripcion: 'asdfghjklzxcvbnm,',
              rating: 5,
            },

          ]}
          columns={[
            {
              title: '#',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Nombre',
              dataIndex: 'nombre',
              key: 'nombre',
            },
            {
              title: 'Descripción',
              dataIndex: 'descripcion',
              key: 'descripcion',
            },
            {
              title: 'Calificación',
              dataIndex: 'calificacion',
              key: 'calificacion',
              render: (text, record) => {
                return <Rate defaultValue={record.rating}></Rate>
              }
            }
          ]}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.descripcion}</p>}
        />
      </div>
    )
  }
}