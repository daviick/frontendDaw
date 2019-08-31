import React from 'react';
import { Form, Input, Button, Table, Divider, Popconfirm, Icon, message, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import MetodosAxios from '../../requerimientos/MetodosAxios';

const FormItem = Form.Item
const { Option } = Select

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
      searchText: '',
    }
  }

  obtener_planes = () => {
    let data = [];
    MetodosAxios.obtener_planes().then(res => {
      console.log(res);
      res.data.map(registro => {
        let software = '';
        let id_software = [];
        if (registro.software.length !== 0) {
          console.log('entra')
          registro.software.map(soft => {
            software += soft.name + ', ';
            id_software.push(soft.id);
          });
        }
        console.log('software', software);
        let software_final = software.substring(0, software.length - 2);
        console.log('software_final', software_final);
        let obj = {
          id: registro.id,
          key: registro.id,
          isEditing: false,
          nombre: registro.name,
          descripcion: registro.description,
          precio: registro.price,
          meses: registro.months,
          n_usuarios: registro.n_users,
          n_oficinas: registro.n_offices,
          software: software_final == '' ? '-' : software_final,
          id_software: id_software,
        };
        data.push(obj);
      });
      this.setState({ data: data, loading: false })
    }).catch(err => {
      error('Error al cargar los Planes');
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
        descripcion: `Descripcion ${i} Descripcion ${i + 1}`,
        precio: 1000 * i,
        meses: `Mes ${i}`,
        n_usuarios: 10 * i,
        n_oficinas: i,
        software: `Software ${i}`,
      };
      data.push(obj);
    }
    this.setState({ data: data, loading: false })
  }
  componentDidMount = () => {
    // this.llenar_datos_tabla();
    this.obtener_planes();
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
      let plan = {
        id: row.id,
        name: row.nombre,
        description: row.descripcion,
        price: row.precio,
        months: row.meses,
        n_users: row.n_usuarios,
        n_offices: row.n_oficinas,
        software: row.software,
      };
      // Buscar el objeto que se esta editando en el estado para
      // actualizarlo con this.setState({})

      console.log('data anterior', this.state.data);
      console.log('envio plan', plan);

      // MetodosAxios.editar_plan(plan).then(res => {
      //   if(res.status === 200) {
      //     this.setState({
      //       data: nueva_data,
      //     }, () => {
      //       console.log('this.state.data', this.state.data);
      //     });
      //     success('Plan editado exitosamente');
      //   }
      // }).catch(err => {
      //   error('Error en la edición del Plan')
      // });


      // // obtengo el item que se esta editando
      // let item = undefined;
      // this.state.data.map(registro => {
      //   if (registro.key === this.state.editingKey) {
      //     item = registro;
      //   }
      // });
      // console.log('item', item);

      // // creo el objeto que enviare a editar al back
      // let rows = this.state.data;
      // rows.map(obj => {
      //   console.log('obj.key, item.key', obj.key, item.key);
      //   if (obj.key === item.key) {
      //     /**
      //      * Edito el nombre, la descripcion, el precio,
      //      * los meses, el numero de usuarios, el numero de oficinas y
      //      * el software
      //      */
      //     // let software_final = [];
      //     // obj.software.map(id_software => {
      //     //   this.props.software.map(soft => {
      //     //     if(id_software === soft.id) {
      //     //       software_final.push(soft);
      //     //     }
      //     //   });
      //     // });
      //     // console.log('--------------------software_final', software_final);
      //     obj.nombre = row.nombre;
      //     obj.descripcion = row.  descripcion;
      //     obj.precio = row.precio;
      //     obj.meses = row.meses;
      //     obj.n_usuarios = row.n_usuarios;
      //     obj.n_oficinas = row.n_oficinas;
      //     obj.software = row.software;

      //     let plan = {
      //       id: obj.id,
      //       name: obj.nombre,
      //       description: obj.descripcion,
      //       price: obj.precio,
      //       months: obj.meses,
      //       n_users: obj.n_usuarios,
      //       n_offices: obj.n_oficinas,
      //       software: obj.software,
      //     };
      //     console.log('envio plan', plan);
      //     MetodosAxios.editar_plan(plan).then(res => {
      //       console.log(res);
      //       if (res.status === 200) {
      //         // rows.software = this.obtener_lista_software(rows.software);
      //         rows.software = 'samuel';
      //         console.log('rows.software', rows.software);

      //         // let software_final = [];
      //         // rows.software.map(id_software => {
      //         //   this.props.software.map(software => {
      //         //     if (id_software === software.id) {
      //         //       software_final.push(software);
      //         //     }
      //         //   })
      //         // })
      //         // console.log('software_final', software_final);

      //         this.setState({
      //           data: rows,
      //         }, () => {
      //           console.log('this.state.data', this.state.data);
      //         });
      //         success('Plan editado exitosamente');
      //       }
      //     }).catch(err => {
      //       error('Error en la Edición del Plan');
      //     });
      // }
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
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('id', {
                      rules: [
                        {
                          required: false,
                        }
                      ],
                      initialValue: record.id
                    })(
                      <Input
                        disabled
                      />
                    )}
                  </FormItem>
                } else {
                  return <span>{text}</span>
                }
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
              title: 'Precio',
              dataIndex: 'precio',
              key: 'precio',
              editable: false,
              ...this.getColumnSearchProps('precio'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('precio', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el precio'
                        }
                      ],
                      initialValue: record.precio
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
              title: "Meses",
              dataIndex: 'meses',
              key: 'meses',
              editable: false,
              ...this.getColumnSearchProps('meses'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('meses', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el o los meses'
                        }
                      ],
                      initialValue: record.meses
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
              title: 'Número de Usuarios',
              dataIndex: 'n_usuarios',
              key: 'n_usuarios',
              editable: false,
              ...this.getColumnSearchProps('n_usuarios'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('n_usuarios', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el numero de usuarios'
                        }
                      ],
                      initialValue: record.n_usuarios
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
              title: 'Número de Oficinas',
              dataIndex: 'n_oficinas',
              key: 'n_oficinas',
              editable: false,
              ...this.getColumnSearchProps('n_oficinas'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('n_oficinas', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el numero de oficinas'
                        }
                      ],
                      initialValue: record.n_oficinas
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
              title: 'Software',
              dataIndex: 'software',
              key: 'software',
              editable: false,
              ...this.getColumnSearchProps('software'),
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('software', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el software'
                        }
                      ],
                      initialValue: record.id_software
                    })(
                      <Select
                        // size="large"
                        mode="multiple"
                        allowSearch
                      >
                        {
                          this.props.softwares.map(software => {
                            return (
                              <Option
                                key={software.id}
                                value={software.id}
                              >
                                {software.nombre}
                              </Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                }
                else
                  return <span>{text}</span>
              },
            },
            {
              title: "id_software",
              dataIndex: "id_software",
              editable: false,
              // align: "center",
              className: "column-hide",
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