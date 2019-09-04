import React from 'react';
import { Typography, Rate, Col, Row, List } from 'antd';

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
  render() {
    return (
      <div>
        <Title style={{ textAlign: 'center' }}>Perfil Tutor</Title>
        <Title level={2}>{this.props.nombre}</Title>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
          Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
          a design language for background applications, is refined by Ant UED Team. Ant Design, a
          design language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team. Ant Design, a design
          language for background applications, is refined by Ant UED Team.
        </Paragraph>
        <Title level={2} style={{ margin: '16px 0' }}>Enseña</Title>
        <List
          size="small"
          bordered
          dataSource={this.state.materias}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        
      </div>
    )
  }
}
