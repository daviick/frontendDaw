import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, Table, Divider, Popconfirm, Icon, DatePicker, message } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import MetodosAxios from '../../../requerimientos/MetodosAxios';

const FormItem = Form.Item
const { Option } = Select;

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: "",
      data: [],
      searchText: '',
    }
  }
  llenar_datos_tabla = () => {
    this.setState({
      data: this.props.representantes,      
    });
  }

  componentDidMount = () => {
    this.llenar_datos_tabla();
  }

  // INICIO funciones para filtrado por columna de tabla
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
            </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
            </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  // FIN funciones para filtrado por columna de tabla

  // INICIO funciones para CRUD de la tabla
  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  delete(id) {
    // let rows = this.state.data;
    // // console.log('rows', rows);
    // console.log('ANTES DE ELIMINAR UNA FILA: this.state.data', this.state.data);
    // for (let i = 0; i < rows.length; i++) {
    //   if (rows[i].key === key)
    //     rows.splice(i, 1)
    // }
    // // console.log('rows', rows);
    // this.setState({
    //   data: rows,
    // }, () => {
    //   console.log('DESPUES DE ELIMINAR UNA FILA: this.state.data', this.state.data);
    // })
    MetodosAxios.eliminar_representante(id).then(res => {
      console.log(res);
      this.llenar_datos_tabla();
      message.success('Representante eliminado exitosamente');
      this.props.recargar_representantes();
    }).catch(err => {
      message.error('Error en la eliminacion del Representante');
      console.log(err);
    });
  }

  edit(key) {
    // console.log(';aa')
    let rows = [];
    this.state.data.map(obj => {
      if (obj.key === key)
        obj.isEditing = true
      else
        obj.isEditing = false
      rows.push(obj)
    })
    this.setState({ editingKey: key, data: rows });
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, row) => {
      if (err)
        return
      console.log('row', row);
      row.fecha_nac = row.fecha_nac.toISOString().substring(0, 10);
      let representante = {
        id: row.id,
        nombre: row.nombres,
        apellido: row.apellidos,
        correo: row.correo,
        telefono: row.telefono,
        ciudad: row.ciudad,
        fecha_nac: row.fecha_nac,
        sexo: row.sexo,
      }
      console.log('envio representante', representante);
      MetodosAxios.editar_representante(representante).then(res => {
        console.log(res)
        message.success('Representante editado exitosamente');
        this.props.recargar_representantes();
      }).catch(err => {
        message.error('Error en la edición del Representante');
        console.log(err);
      })
        // let item = undefined;
        // this.state.data.map(registro => {
        //   if (registro.key === this.state.editingKey) {
        //     item = registro;
        //   }
        // });
        // console.log('item', item);

        // let rows = this.state.data;
        // rows.map(obj => {
        //   console.log('obj.key, item.key', obj.key, item.key);
        //   if (obj.key === item.key) {
        //     /**
        //      * Edito unicamente el rating 
        //      */
        //     obj.rating = row.rating;
        //     console.log('ENVIO FORMULARIO', obj);
        //     this.setState({
        //       data: rows,
        //     }, () => {
        //       console.log('this.state.data', this.state.data);
        //     });
        //   }
        // });


    })

    // INICIO cerrar la edicion
    let rows = [];
    this.state.data.map(obj => {
      obj.isEditing = false
      rows.push(obj)
    })
    this.setState({ editingKey: "", data: rows });
    // FIN cerrar la edicion
  }

  cancel = () => {
    let rows = [];
    this.state.data.map(obj => {
      obj.isEditing = false
      rows.push(obj)
    })
    this.setState({ editingKey: "", data: rows });
  };
  // FIN funciones para CRUD de la tabla
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Table
          columns={[
            {
              title: '#',
              dataIndex: 'id',
              key: 'id',
              editable: false,
              ...this.getColumnSearchProps('id'),
              render: (text, record) => {
                if(record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('id', {
                      rules: [
                        {
                          required: false,
                        }
                      ],
                      initialValue: record.id,
                    })(
                      <Input readOnly />
                    )}
                  </FormItem>
                } else {
                  return <span>{text}</span>
                }
              },
            },
            {
              title: 'Nombres',
              dataIndex: 'nombres',
              key: 'nombres',
              editable: false,
              ...this.getColumnSearchProps('nombres'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('nombres', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese sus nombres'
                        }
                      ],
                      initialValue: record.nombres
                    })(
                      <Input />
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Apellidos',
              dataIndex: 'apellidos',
              key: 'apellidos',
              editable: false,
              ...this.getColumnSearchProps('apellidos'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('apellidos', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese sus apellidos'
                        }
                      ],
                      initialValue: record.apellidos
                    })(
                      <Input />
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Correo',
              dataIndex: 'correo',
              key: 'correo',
              editable: false,
              ...this.getColumnSearchProps('correo'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('correo', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese su correo'
                        }
                      ],
                      initialValue: record.correo
                    })(
                      <Input />
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Sexo',
              dataIndex: 'sexo',
              key: 'sexo',
              editable: false,
              ...this.getColumnSearchProps('sexo'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('sexo', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el sexo'
                        }
                      ],
                      initialValue: record.sexo
                    })(
                      <Select>
                        <Option key="M" value="M">M</Option>
                        <Option key="F" value="F">F</Option>
                      </Select>
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Telefono',
              dataIndex: 'telefono',
              key: 'telefono',
              editable: false,
              ...this.getColumnSearchProps('telefono'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('telefono', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese su telefono'
                        }
                      ],
                      initialValue: record.telefono
                    })(
                      <Input />
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Ciudad',
              dataIndex: 'ciudad',
              key: 'ciudad',
              editable: false,
              ...this.getColumnSearchProps('ciudad'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('ciudad', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese su ciudad'
                        }
                      ],
                      initialValue: record.ciudad
                    })(
                      <Input />
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Fecha de Nacimiento',
              dataIndex: 'fecha_nac',
              key: 'fecha_nac',
              editable: false,
              ...this.getColumnSearchProps('fecha_nac'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('fecha_nac', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el fecha_nac'
                        }
                      ],
                      initialValue: moment(record.fecha_nac)
                    })(
                      <DatePicker />
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: 'Accion',
              // dataIndex: 'accion',
              key: 'action',
              render: (text, record) => {
                return (
                  <div>
                    {
                      record.isEditing == false &&
                      <span>
                        <a onClick={() => this.edit(record.key)}>Editar</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.delete(record.id)}>Eliminar</a>
                      </span>
                    }
                    {
                      record.isEditing &&
                      <span>
                        <Button htmlType="submit">Aceptar</Button>
                        {/*<Popconfirm title="¿Seguro de Aceptar?" onConfirm={() => this.handleSubmit(record)}>
                                          <a>Aceptar</a>
                                        </Popconfirm>*/}
                        <Divider type="vertical" />
                        <Popconfirm title="¿Seguro de Cancelar?" onConfirm={() => this.cancel(record.key)}>
                          <a>Cancelar</a>
                        </Popconfirm>
                      </span>
                    }
                  </div>
                )
              }
            },
          ]}
          dataSource={this.state.data}
          bordered
          loading={this.state.data.length === 0}
          rowClassName="editable-row"
          footer={() => `Número de representantes encontrados: ${this.state.data.length}`}
        />
      </Form>
    )
  }
}

const WrappedEditableTable = Form.create({ name: 'form_editable_table' })(EditableTable)
export default WrappedEditableTable;