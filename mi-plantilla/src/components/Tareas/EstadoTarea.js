import React from 'react';
import { Table, Typography } from 'antd';

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
                <Title style={{ textAlign: 'center' }}>Estado Tareas</Title>
                <Table
                dataSource={[
                    {
                        id: 1,
                        key: 1,
                        tarea: 'Mantenimiento Tipo A',
                        realizada_por: 'Luis Castro',
                        estado: 'Completado',
                        detalles: 'Ver Informe'
                    },
                    {
                        id: 2,
                        key: 2,
                        tarea: 'Mantenimiento Tipo B',
                        realizada_por: 'Juan Piguave',
                        estado: 'Completado',
                        detalles: 'Ver Informe'
                    },
                    {
                        id: 3,
                        key: 3,
                        tarea: 'Revision de Maquina A',
                        realizada_por: 'Marcos Castro',
                        estado: 'Vencida',
                        detalles: 'No Disponible'
                    },
                    {
                        id: 4,
                        key: 4,
                        tarea: 'Revision de Maquina B',
                        realizada_por: 'Pedro Aguirre',
                        estado: 'Vencida',
                        detalles: 'No Disponible'
                    },
                    {
                        id: 5,
                        key: 5,
                        tarea: 'Revision de Maquina C',
                        realizada_por: 'Juan Salas',
                        estado: 'Completado',
                        detalles: 'Ver Informe'
                    },
                    
                ]}
                columns={[
                    {
                        title: '#',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Tarea',
                        dataIndex: 'tarea',
                        key: 'tarea',
                    },
                    {
                        title: 'Realizada Por',
                        dataIndex: 'realizada_por',
                        key: 'realizada_por',
                    },
                    {
                        title: 'Estado',
                        dataIndex: 'estado',
                        key: 'estado',
                        render: (text, record) => {
                            if(record.estado==='Completado')
                                return <Title level={3} style={{color: 'green'}}>{text}</Title>
                            // else if(record.estado==='Sin Completar')
                            else
                                return <Title level={3} style={{color: 'red'}}>{text}</Title>
                        }
                    },
                    {
                        title: 'Detalles',
                        dataIndex: 'detalles',
                        key: 'detalles',
                        render: (text, record) => {
                            if(record.detalles==='Ver Informe')
                                return <a href="www.facebook.com"><Title level={3} underline style={{color: 'blue'}}>{text}</Title></a>
                            else 
                                return <Title level={3}>{text}</Title>
                        }
                    }
                ]}
                />
            </div>
        )
    }
}