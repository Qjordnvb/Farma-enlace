import {useState, useEffect, useRef} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import moment from 'moment';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomOrders = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const inputFileRef = useRef(null);

  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const {getColumnSearchProps, getEmployees, updateEmployeeSize, bulkSizeUpdate} = useUtils();
  const [dataSource, setDataSource] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getEmployeesTable = () => {
    getEmployees().then((res) => {
      setDataSource(res);
    });
  };

  useEffect(() => {
    getEmployeesTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const EditableCell = ({editing, dataIndex, title, children, ...restProps}) => {
    const inputNode =
      title === 'Talla uniforme' || title === 'Talla mandil' ? (
        <Input maxLength={5} />
      ) : (
        <InputNumber />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0
            }}
            rules={[
              {
                required: true,
                message: `Por favor ingrese ${title}!`
              },
              {
                pattern: '^[a-zA-Z]',
                message: 'Numeros no estan permitidos'
              }
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => {
    return record.id === editingKey;
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      let row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.id);
      updateEmployeeSize({
        TALLA: row.TALLA,
        TALLA_MANDIL: row.TALLA_MANDIL,
        CEDULA: newData[index].CEDULA
      }).then(() => {
        getEmployeesTable();
        cancel();
      });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id',
      ...getColumnSearchProps('N°'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Cédula',
      dataIndex: 'CEDULA',
      ...getColumnSearchProps('CEDULA'),
      sorter: (a, b) => +a.CEDULA - +b.CEDULA,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'COLABORADOR',
      ...getColumnSearchProps('COLABORADOR'),
      sorter: (a, b) => a?.COLABORADOR?.localeCompare(b?.COLABORADOR),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'CARGO',
      ...getColumnSearchProps('CARGO'),
      sorter: (a, b) => a.CARGO.localeCompare(b.CARGO),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'SEXO',
      ...getColumnSearchProps('SEXO'),
      sorter: (a, b) => a.SEXO?.localeCompare(b.SEXO),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Sucursal',
      dataIndex: 'NOMBRE_SUCURSAL',
      ...getColumnSearchProps('Sucursal'),
      sorter: (a, b) => a.NOMBRE_SUCURSAL.localeCompare(b.NOMBRE_SUCURSAL),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'REGION',
      ...getColumnSearchProps('REGION'),
      sorter: (a, b) => a.REGION.localeCompare(b.REGION),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de ingreso',
      dataIndex: 'FECHA_INGRESO',
      ...getColumnSearchProps('Fecha de ingreso'),
      sorter: (a, b) => a.FECHA_INGRESO.localeCompare(b.FECHA_INGRESO),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).calendar()}</div>;
      }
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'NOMBRE_CENTRO_COSTOS',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS.localeCompare(b.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Número oficina',
      dataIndex: 'CODIGO_OFICINA',
      ...getColumnSearchProps('Número oficina'),
      sorter: (a, b) => a.CODIGO_OFICINA.localeCompare(b.CODIGO_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: 'NOMBRE_OFICINA',
      ...getColumnSearchProps('NOMBRE_OFICINA'),
      sorter: (a, b) => a.NOMBRE_OFICINA.localeCompare(b.NOMBRE_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla uniforme',
      dataIndex: 'TALLA',
      editable: true,
      ...getColumnSearchProps('Talla'),
      sorter: (a, b) => a.TALLA?.localeCompare(b.TALLA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla mandil',
      dataIndex: 'TALLA_MANDIL',
      editable: true,
      ...getColumnSearchProps('talla mandil'),
      sorter: (a, b) => a?.TALLA_MANDIL?.localeCompare(b?.TALLA_MANDIL),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      width: '7.5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={async () => {
                await save(record.id);
              }}
              style={{
                marginRight: 8
              }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <img src={BtnEdit} alt="btn-edit" />
          </Typography.Link>
        );
      }
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'cantidadCompra' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  const handleInputFile = () => {
    let file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);
    bulkSizeUpdate(formData).then(() => {
      getEmployeesTable();
      //TODO: Show success or error message, maybe add modal
    });
  };

  /* const onAddFile = (record) => {
    setIsAdd(true);
    setAddingFile({...record});
    setDataSource(() => {
      return [...dataSource];
    });
  };



  const onSizeUpdate = () => {
    updateEmployeeSize(editingFile).then(() => {
      getEmployeesTable();
      resetEditing();
    });
  };*/

  return {
    columns,
    mergedColumns,
    EditableCell,
    dataSource,
    tallas,
    form,
    cancel,
    rowSelection,
    setDataSource,
    inputFileRef,
    handleInputFile
  };
};
