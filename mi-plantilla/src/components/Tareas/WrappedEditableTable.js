import React from 'react';
import {
  Table,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  message,
  Rate,
  Dropdown,
  Menu,
  Icon,
  Popconfirm,
  Divider,
} from "antd";
import Highlighter from 'react-highlight-words';
import MetodosAxios from '../../requerimientos/MetodosAxios';

const FormItem = Form.Item;
const { SubMenu } = Menu;

function handleMenuClick(e) {
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Editar</Menu.Item>
    <Menu.Item key="2">Eliminar</Menu.Item>
  </Menu>
);

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

  obtener_usuarios = () => {
    let usuarios = [];
    for (let i = 0; i < 100; i++) {
      let usuario = {
        key: i,
        id: i,
        nombre: `Nombre ${i}`,
        descripcion: `Descripcion ${i}`,
        frecuencia: `${i} veces por semana`,
        responsable: `Luis Castro`,
        accion: ``,
        isEditing: false,
      }
      usuarios.push(usuario);
    }
    this.setState({
      data: usuarios,
      loading: false,
    }, () => {
      console.log('this.state.data', this.state.data);
    });
  }

  componentDidMount = () => {
    this.obtener_usuarios();
  }
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
          dataSource={this.state.data}
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
              title: 'Descripción',
              dataIndex: 'descripcion',
              key: 'descripcion',
              ...this.getColumnSearchProps('descripcion'),
              editable: false,
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
              title: 'Frecuencia',
              dataIndex: 'frecuencia',
              key: 'frecuencia',
              ...this.getColumnSearchProps('frecuencia'),
              editable: false,
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('frecuencia', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese la frecuencia'
                        }
                      ],
                      initialValue: record.frecuencia
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
              title: 'Responsable',
              dataIndex: 'responsable',
              key: 'responsable',
              ...this.getColumnSearchProps('responsable'),
              editable: false,
              render: (text, record) => {
                if (record.isEditing) {
                  return <FormItem>
                    {getFieldDecorator('responsable', {
                      rules: [
                        {
                          required: true,
                          message: 'Por favor, ingrese el responsable'
                        }
                      ],
                      initialValue: record.responsable
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
              dataIndex: 'accion',
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
          bordered
          loading={this.state.loading}
          rowClassName="editable-row"
          footer={() => `Número de usuarios encontrados: ${this.state.data.length}`}
        />
      </Form>
    )
  }
}

const WrappedEditableTable = Form.create({})(EditableTable);
export default WrappedEditableTable;