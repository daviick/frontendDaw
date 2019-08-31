import React from 'react';
import { Form, Input, InputNumber, Button, Table, Divider, Popconfirm, Icon, message } from 'antd';
import Highlighter from 'react-highlight-words';
import MetodosAxios from '../../requerimientos/MetodosAxios';

const FormItem = Form.Item

const success = (mensaje) => {
  message.success(mensaje);
};

const error = (mensaje) => {
  message.error(mensaje);
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: "",
      loading: true,
      data: [],
      organizaciones: [],
      searchText: '',
    }
  }

  obtener_organizaciones = () => {
    let data = [];
    MetodosAxios.obtener_organizaciones().then(res => {
      console.log(res);
      res.data.map(registro => {
        let obj = {
          id: registro.id,
          key: registro.id,
          isEditing: false,
          nombre: registro.name,
          ruc: registro.RUC,
        };
        data.push(obj);
      });
      this.setState({
        data: data,
        loading: false,
      }, () => {
        console.log('this.state.data', this.state.data);
      });
    }).catch(error => {
      error('Error al cargar las Organizaciones');
    });
  }

  llenar_datos_tabla = () => {
    // Aqui debo de llamar a Metodos Axios
    let data = [];
    for (let i = 1; i < 1001; i++) {
      let obj = {
        id: `${i}`,
        key: `${i}`,
        isEditing: false,
        nombre: `Plan ${i}`,
        ruc: '1111111111',
      };
      data.push(obj);
    }
    this.setState({ data: data, loading: false })
  }
  componentDidMount = () => {
    // this.llenar_datos_tabla();
    this.obtener_organizaciones();
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
      if (rows[i].key === key) {
        console.log('organizacion a eliminar', rows[i]);
        let id_organizacion = rows[i].id;
        MetodosAxios.eliminar_organizacion(id_organizacion).then(res => {
          console.log(res);
          if (res.status === 204) {
            success('Organización eliminada exitosamente');
            rows.splice(i, 1);
            this.setState({
              data: rows,
            }, () => {
              console.log('DESPUES DE ELIMINAR UNA FILA: this.state.data', this.state.data);
            });
          }
        }).catch(err => {
          error('Error en la eliminación de la Organización');
        });
      }
    }
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

      let item = undefined;
      this.state.data.map(registro => {
        if (registro.key === this.state.editingKey) {
          item = registro;
        }
      });
      console.log('item', item);

      let rows = this.state.data;
      rows.map(obj => {
        console.log('obj.key, item.key', obj.key, item.key);
        if (obj.key === item.key) {
          /**
           * Edito el nombre y ruc
           */
          obj.nombre = row.nombre;
          obj.ruc = row.ruc;

          let organizacion = {
            id: obj.id,
            name: obj.nombre,
            RUC: obj.ruc,
          };
          console.log('envio organizacion', organizacion);
          MetodosAxios.editar_organizacion(organizacion).then(res => {
            console.log(res);
            if (res.status === 200) {
              success('Organización editada exitosamente');
              this.setState({
                data: rows,
              }, () => {
                console.log('this.state.data', this.state.data);
              });
            }
          }).catch(err => {
            error('Error en la edición de la Organización');
          });
        }
      });


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
              title: 'Nombre',
              dataIndex: 'nombre',
              key: 'nombre',
              editable: false,
              ...this.getColumnSearchProps('nombre'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('nombre', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el nombre'
                        }
                      ],
                      initialValue: record.nombre
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
              title: 'RUC',
              dataIndex: 'ruc',
              key: 'ruc',
              editable: false,
              ...this.getColumnSearchProps('ruc'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('ruc', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el RUC'
                        }
                      ],
                      initialValue: record.ruc
                    })(
                      <InputNumber
                        style={{ width: 200 }}
                        maxLength={13}
                      // minLength={13}
                      // length={13}
                      />
                    )}
                  </FormItem>
                }
                else {
                  return <span>{text}</span>
                }
              }
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
          footer={() => `Número de organizaciones encontrados: ${this.state.data.length}`}
        />
      </Form>
    )
  }

}
const WrappedEditableTable = Form.create({ name: 'form_editable_table' })(EditableTable)
export default WrappedEditableTable