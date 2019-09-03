import React from 'react';
import { Typography, Rate, Col, Row } from 'antd';

const { Text, Title, Paragraph } = Typography;

export default class Perfiltutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
        <Title level={2}>Enseña</Title>        
      </div>
    )
  }
}
