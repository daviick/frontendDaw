import React from 'react';
import { Table, Typography } from 'antd';
import '../../App.css';
import imagen1 from '../../img/blog/c1.jpg';
import imagen2 from '../../img/blog/c2.jpg';
import imagen3 from '../../img/blog/c3.jpg';


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
                {/*<Title style={{ textAlign: 'center' }}>Estado Tareas</Title>
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
                />*/}
                

                <section class="course_details_area section_gap">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 course_details_left">
                                <h4 id="ver" class="title">Tutores contratados</h4>
                                    <div class="comments-area mb-30">
                                        <div class="comment-list">
                                            <div class="single-comment single-reviews justify-content-between d-flex">
                                                <div class="user justify-content-between d-flex">
                                                    <div class="thumb">
                                                        <img src={imagen1} alt="" />
                                                    </div>
                                                    <div class="desc">
                                                        <h5><a href="#">Emilly Blunt</a>
                                                            <div class="star">
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </div>
                                                        </h5>
                                                        <p class="comment">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                            eiusmod tempor incididunt ut labore et dolore.
                                                        </p>
                                                        <a href="#" class="genric-btn info circle medium">Ver detalle</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="comment-list">
                                            <div class="single-comment single-reviews justify-content-between d-flex">

                                                <div class="user justify-content-between d-flex">
                                                    <div class="thumb">
                                                        <img src={imagen2} alt="" />
                                                    </div>
                                                    <div class="desc">
                                                        <h5><a href="#">Elsie Cunningham</a>
                                                            <div class="star">
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </div>
                                                        </h5>
                                                        <p class="comment">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                            eiusmod tempor incididunt ut labore et dolore.
                                                        </p>
                                                        <a href="#" class="genric-btn info circle medium">Ver detalle</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="comment-list">
                                            <div class="single-comment single-reviews justify-content-between d-flex">
                                                <div class="user justify-content-between d-flex">
                                                    <div class="thumb">
                                                        <img src={imagen3} alt="" />
                                                    </div>
                                                    <div class="desc">
                                                        <h5><a href="#">María Luna</a>
                                                            <div class="star">
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star checked"></span>
                                                                <span class="fa fa-star"></span>
                                                                <span class="fa fa-star"></span>
                                                            </div>
                                                        </h5>
                                                        <p class="comment">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                            eiusmod tempor incididunt ut labore et dolore.
                                                        </p>
                                                        <a href="#" class="genric-btn info circle medium">Ver detalle</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>

                            <div class="col-lg-4 right-contents">
                                <h4 class="title">Tutoría reservada</h4>
                                <ul>
                                    <li>
                                        <a class="justify-content-between d-flex" >
                                            <p>Nombre del tutor</p>
                                            <span class="or">Martín Dunn</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="justify-content-between d-flex">
                                            <p>Materia </p>
                                            <span>Matemáticas</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="justify-content-between d-flex">
                                            <p>Día </p>
                                            <span>15 de Junio</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="justify-content-between d-flex">
                                            <p>Hora </p>
                                            <span>2.00 pm - 4.00 pm</span>
                                        </a>
                                    </li>
                                </ul>
                                 <a href="#" class="primary-btn text-uppercase enroll">Registrar en este curso</a>
            
                                <h4 class="title">Críticas</h4>
                                <div class="content">
                                    <div class="review-top row pt-40">
                                        <div class="col-lg-12">
                                            <h6 class="mb-15">Califique al tutor</h6>
                                            <div class="d-flex flex-row reviews justify-content-between">
                                                <span>Conocimientos</span>
                                                <div class="star">
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                                
                                            </div>
                                            <div class="d-flex flex-row reviews justify-content-between">
                                                <span>Puntualidad</span>
                                                <div class="star">
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                               
                                            </div>
                                            <div class="d-flex flex-row reviews justify-content-between">
                                                <span>Calidad</span>
                                                <div class="star">
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star checked"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </div>
                                    <div class="feedeback">
                                        <h4 class="title">Sugerencias al tutor</h4>
                                        <textarea name="feedback" class="form-control" cols="10" rows="10"></textarea>
                                        <div class="mt-10 text-right">
                                            <a href="#" class="primary-btn text-right text-uppercase">Enviar</a>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>    



            </div>
        )
    }
}