import {useState, useRef, useEffect} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomOrders = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {getColumnSearchProps} = useUtils();
  const [editingKey, setEditingKey] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [options, setOptions] = useState([]);
  const inputFileRef = useRef(null);
  const sucursales = ['1', '2', '3', '4', '5'];
  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const distribuciones = [
    'Distribución Administrativa 1',
    'Distribución Administrativa 2',
    'Distribución Administrativa 3'
  ];
  const {getColumnSearchProps, bulkSizeUpdate, getEmployees, updateEmployeeSize} = useUtils();
  const [dataSource, setDataSource] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
  const getEmployeesTable = () => {
    getEmployees().then((res) => {
      setDataSource(res);
    });
  };

  useEffect(() => {
    getEmployeesTable();
  }, []);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const EditableCell = ({editing, dataIndex, title, inputType, children, ...restProps}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
                message: `Please Input ${title}!`
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

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      cantidadCompra: '',
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
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
      sorter: (a, b) => a.CEDULA.length - b.CEDULA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'COLABORADOR',
      ...getColumnSearchProps('COLABORADOR'),
      sorter: (a, b) => a.COLABORADOR.length - b.COLABORADOR.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'CARGO',
      ...getColumnSearchProps('CARGO'),
      sorter: (a, b) => a.CARGO.length - b.CARGO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'GENERO',
      ...getColumnSearchProps('GENERO'),
      sorter: (a, b) => a.GENERO.length - b.GENERO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Sucursal',
      dataIndex: 'SUCURSAL',
      ...getColumnSearchProps('SUCURSAL'),
      sorter: (a, b) => a.SUCURSAL.length - b.SUCURSAL.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'REGION',
      ...getColumnSearchProps('REGION'),
      sorter: (a, b) => a.REGION.length - b.REGION.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de ingreso',
      dataIndex: 'FECHA_INGRESO',
      ...getColumnSearchProps('Fecha de ingreso'),
      sorter: (a, b) => a.FECHA_INGRESO.length - b.FECHA_INGRESO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'DISTRIBUCION',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.DISTRIBUCION.length - b.DISTRIBUCION.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Número oficina',
      dataIndex: 'CODIGO_OFICINA',
      ...getColumnSearchProps('Número oficina'),
      sorter: (a, b) => a.CODIGO_OFICINA.length - b.CODIGO_OFICINA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: 'NOMBRE_OFICINA',
      ...getColumnSearchProps('NOMBRE_OFICINA'),
      sorter: (a, b) => a.NOMBRE_OFICINA.length - b.NOMBRE_OFICINA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      editable: true,
      ...getColumnSearchProps('Talla'),
      sorter: (a, b) => a.talla.length - b.talla.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
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

  const onAddFile = (record) => {
    setIsAdd(true);
    setAddingFile({...record});
    setDataSource(() => {
      return [...dataSource];
    });
  };

  const handleInputFile = () => {
    let file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);
    bulkSizeUpdate(formData).then(() => {
      //TODO: Show success or error message, maybe add modal
    });
  };

  const onSizeUpdate = () => {
    updateEmployeeSize(editingFile).then(() => {
      getEmployeesTable();
      resetEditing();
    });
  };

  return {
    columns,
    mergedColumns,
    EditableCell,
    dataSource,
    tallas,
    form,
    cancel,
    rowSelection,
    setDataSource
  };
};
