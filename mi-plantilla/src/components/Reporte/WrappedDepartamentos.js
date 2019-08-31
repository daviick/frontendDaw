import React from 'react';
import { Form, Col, Row, DatePicker, Select, Button } from 'antd';
import moment from 'moment';

// Exportar a PDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as d3 from 'd3';

const { Option } = Select;
class Departamentos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barplot: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.exportToPDFImageMode = this.exportToPDFImageMode.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err)
                return;
            console.log('Received values from', values);
            this.generateBarPlot();
            this.props.form.resetFields();
        });
    }
    onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    generateBarPlot = () => {
        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 30, bottom: 20, left: 50 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#barplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Parse the Data
        var data = [
            {
                group: 'banana',
                Nitrogen: '12',
                normal: '1',
                stress: '13'
            },
            {
                group: 'poacee',
                Nitrogen: '6',
                normal: '6',
                stress: '33'
            },
            {
                group: 'sorgho',
                Nitrogen: '11',
                normal: '28',
                stress: '12'
            },
        ]
        let columns = ["Nitrogen", "normal", "stress"]
        // List of subgroups = header of the csv files = soil condition here
        var subgroups = columns;
        // var subgroups = data.columns.slice(1)
        console.log('subgroups')
        console.log(subgroups)

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(data, function (d) { return (d.group) }).keys()
        console.log('groups')
        console.log(groups)

        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0])
        svg.append("g")
            .call(d3.axisLeft(y));

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c', '#377eb8', '#4daf4a'])

        /**
         * Para verlo a escala normal solo comenta esta parte de normalizar.
         */
        // Normalize the data -> sum of each group must be 100!
        console.log(data)
        let dataNormalized = []
        data.forEach(function (d) {
            // Compute the total
            let tot = 0
            let name = ''
            for (let i in subgroups) {
                name = subgroups[i]; tot += +d[name]
            }
            // Now normalize
            for (let i in subgroups) {
                name = subgroups[i]; 
                d[name] = d[name] / tot * 100 
            }
        })

        //stack the data? --> stack per subgroup
        var stackedData = d3.stack()
            .keys(subgroups)
            (data)

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) { return color(d.key); })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.data.group); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())

        this.setState({
            barplot: true,
        }, () => {
            console.log('this.state.barplot', this.state.barplot);
        });
    }

    generatePieChart = () => {

    }

    componentDidMount = () => {
        // this.generateBarPlot();
        this.generatePieChart();
    }

    exportToPDFImageMode = () => {

        console.log(document.getElementById('barplot'))
        console.log(document.getElementsByTagName('div'))

        html2canvas(document.getElementById('barplot')).then(canvas => {
            // document.getElementsByTagName('div')[0].appendChild(canvas)
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape'
            });
            pdf.addImage(imgData, 'SVG', 30, 40);
            pdf.text('Diagrama de Departamentos', 30, 30)
            pdf.save("diagrama-departamentos.pdf");
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <Row type="flex" justify="space-around">
                        <Col sm={24} md={6} lg={6}>
                            <Form.Item label="Fecha de Creación">
                                {getFieldDecorator('fecha_creacion', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione la fecha de creacion'
                                        }
                                    ],
                                    initialValue: moment(new Date())
                                })(
                                    <DatePicker
                                        size="large"
                                        onChange={this.onChange}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={6} lg={6}>
                            <Form.Item label="Departamentos">
                                {getFieldDecorator('departamento', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Por favor, seleccione el o los departamentos'
                                        }
                                    ],
                                    // initialValue: 
                                })(
                                    <Select
                                        allowClear
                                        mode="multiple"
                                        size="large"
                                    >
                                        <Option
                                            key="opt-1"
                                            value="value-opt-1"
                                        >
                                            Departamento 1
                                        </Option>
                                        <Option
                                            key="opt-2"
                                            value="value-opt-2"
                                        >
                                            Departamento 2
                                        </Option>
                                        <Option
                                            key="opt-3"
                                            value="value-opt-3"
                                        >
                                            Departamento 3
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={4} lg={4}>
                            <Form.Item label={<span></span>}>
                                <Button type="primary" size="large" htmlType="submit">Buscar</Button>
                            </Form.Item>
                        </Col>
                        <Col sm={24} md={4} lg={4}>
                            <br />
                            <Button type="primary" size="large" icon="download" onClick={this.exportToPDFImageMode} disabled={!this.state.barplot}>Exportar a PDF</Button>
                        </Col>
                    </Row>
                </Form>
                <div id="barplot"></div>
                <div id="piechart"></div>
            </div>
        );
    }
}

const WrappedDepartamentos = Form.create({ name: 'form_reporte_departamentos' })(Departamentos);
export default WrappedDepartamentos;