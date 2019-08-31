import React from 'react';
import { Typography, Form, Col, Row, Input, InputNumber, Select, Button, Modal, Table, Divider, Popconfirm, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

const FormItem = Form.Item

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: "",
      loading: true,
      data: [],
      searchText: '',
    }
  }
  llenar_datos_tabla = () => {
    // Aqui debo de llamar a Metodos Axios
    let data = [];
    for (let i = 1; i < 1001; i++) {
      let obj = {
        id: `${i}`,
        key: `${i}`,
        isEditing: false,
        cliente: `Cliente ${i}`,
        suscripcion: `Suscripcion ${i}`,
        plan: `Plan ${i}`,
        descripcion: `Descripcion ${i}`,
        monto: 1000 * i,
        fecha_emision: new Date().toISOString()
      };
      data.push(obj);
    }
    this.setState({ data: data, loading: false })
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

  delete(key) {
    let rows = this.state.data;
    // console.log('rows', rows);
    console.log('ANTES DE ELIMINAR UNA FILA: this.state.data', this.state.data);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].key === key)
        rows.splice(i, 1)
    }
    // console.log('rows', rows);
    this.setState({
      data: rows,
    }, () => {
      console.log('DESPUES DE ELIMINAR UNA FILA: this.state.data', this.state.data);
    })
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

      //   let item = undefined;
      //   this.state.data.map(registro => {
      //     if (registro.key === this.state.editingKey) {
      //       item = registro;
      //     }
      //   });
      //   console.log('item', item);

      //   let rows = this.state.data;
      //   rows.map(obj => {
      //     console.log('obj.key, item.key', obj.key, item.key);
      //     if (obj.key === item.key) {
      //       /**
      //        * Edito unicamente el rating 
      //        */
      //       obj.rating = row.rating;
      //       console.log('ENVIO FORMULARIO', obj);
      //       this.setState({
      //         data: rows,
      //       }, () => {
      //         console.log('this.state.data', this.state.data);
      //       });
      //     }
      //   });


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
                return <span>{text}</span>
              },
            },
            {
              title: 'Cliente',
              dataIndex: 'cliente',
              key: 'cliente',
              editable: false,
              ...this.getColumnSearchProps('cliente'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('cliente', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el cliente'
                        }
                      ],
                      initialValue: record.cliente
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
              title: 'Suscripción',
              dataIndex: 'suscripcion',
              key: 'suscripcion',
              editable: false,
              ...this.getColumnSearchProps('suscripcion'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('suscripcion', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el suscripcion'
                        }
                      ],
                      initialValue: record.suscripcion
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
              title: 'Plan',
              dataIndex: 'plan',
              key: 'plan',
              editable: false,
              ...this.getColumnSearchProps('plan'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('plan', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el plan'
                        }
                      ],
                      initialValue: record.plan
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
              title: 'Descripción',
              dataIndex: 'descripcion',
              key: 'descripcion',
              editable: false,
              ...this.getColumnSearchProps('descripcion'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('descripcion', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese la descripcion'
                        }
                      ],
                      initialValue: record.descripcion
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
              title: 'Monto',
              dataIndex: 'monto',
              key: 'monto',
              editable: false,
              ...this.getColumnSearchProps('monto'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('monto', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el monto'
                        }
                      ],
                      initialValue: record.monto
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
              title: 'Fecha de Emisión',
              dataIndex: 'fecha_emision',
              key: 'fecha_emision',
              editable: false,
              ...this.getColumnSearchProps('fecha_emision'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('fecha_emision', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese la fecha_emision'
                        }
                      ],
                      initialValue: record.fecha_emision
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
                        <a onClick={() => this.delete(record.key)}>Eliminar</a>
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
          loading={this.state.loading}
          rowClassName="editable-row"
          footer={() => `Número de planes encontrados: ${this.state.data.length}`}
        />
      </Form>
    )
  }

}
const WrappedEditableTable = Form.create({ name: 'form_editable_table' })(EditableTable)
export default WrappedEditableTable