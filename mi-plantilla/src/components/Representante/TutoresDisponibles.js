import React from 'react';
import {
  Table,
  Typography,
  Rate,
  List,
} from 'antd';
import PerfilTutor from './PerfilTutor';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const { Text, Title } = Typography;

export default class TutoresDisponibles extends React.Component {
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
              nombres: 'David Durango',
              descripcion: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
              rating: 5,
            },
            {
              id: 2,
              key: 2,
              nombres: 'Samuel Braganza',
              descripcion: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
              rating: 5,
            },
            {
              id: 3,
              key: 3,
              nombres: 'Steffany Aguirre',
              descripcion: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
              rating: 5,
            },
            {
              id: 4,
              key: 4,
              nombres: 'Rosita Pincay',
              descripcion: 'Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team.',
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
              title: 'Nombres',
              dataIndex: 'nombres',
              key: 'nombres',
            },
            {
              title: 'Descripción',
              dataIndex: 'descripcion',
              key: 'descripcion',
              width: '50%',
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
          expandedRowRender={record => <PerfilTutor nombres={record.nombres} descripcion={record.descripcion}/>}
        />
      </div>
    )
  }
}