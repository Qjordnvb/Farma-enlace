import {useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomOrders = () => {
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      n: '1',
      id: '1724567890',
      colaborador: 'ABAD GAONA LADY ABIGAIL',
      cargo: 'ASISTENTE SENIOR',
      genero: 'MUJER',
      sucursal: 'Sucursal',
      region: 'Bogotá',
      fechaIngreso: '2/03/2022',
      distribution: 'Distribución Administrativa',
      numberOfi: '123',
      nameOfi: 'Farmados',
      talla: 'M'
    },
    {
      key: '2',
      n: '2',
      id: '1724567890',
      colaborador: 'ABAD GAONA LADY ABIGAIL',
      cargo: 'ASISTENTE SENIOR',
      genero: 'MUJER',
      sucursal: 'Sucursal',
      region: 'Bogotá',
      fechaIngreso: '2/03/2022',
      distribution: 'Distribución Administrativa',
      numberOfi: '123',
      nameOfi: 'Farmados',
      talla: 'XXS'
    },
    {
      key: '3',
      n: '3',
      id: '1724567890',
      colaborador: 'ABAD GAONA LADY ABIGAIL',
      cargo: 'ASISTENTE SENIOR',
      genero: 'MUJER',
      sucursal: 'Sucursal',
      region: 'Bogotá',
      fechaIngreso: '2/03/2022',
      distribution: 'Distribución Administrativa',
      numberOfi: '123',
      nameOfi: 'Farmados',
      talla: 'L'
    }
  ]);
  const [editingKey, setEditingKey] = useState('');

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
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
      dataIndex: 'n',
      width: 80,
      ...getColumnSearchProps('N°'),
      sorter: (a, b) => a.n.length - b.n.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cédula',
      dataIndex: 'id',
      ...getColumnSearchProps('Cédula'),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'colaborador',
      ...getColumnSearchProps('Colaborador'),
      sorter: (a, b) => a.colaborador.length - b.colaborador.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a.cargo.length - b.cargo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      ...getColumnSearchProps('Género'),
      sorter: (a, b) => a.genero.length - b.genero.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Sucursal',
      dataIndex: 'sucursal',
      ...getColumnSearchProps('Sucursal'),
      sorter: (a, b) => a.sucursal.length - b.sucursal.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'region',
      ...getColumnSearchProps('Región'),
      sorter: (a, b) => a.region.length - b.region.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de ingreso',
      dataIndex: 'fechaIngreso',
      ...getColumnSearchProps('Fecha de ingreso'),
      sorter: (a, b) => a.fechaIngreso.length - b.fechaIngreso.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'distribution',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.distribution.length - b.distribution.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Número oficina',
      dataIndex: 'numberOfi',
      ...getColumnSearchProps('Número oficina'),
      sorter: (a, b) => a.numberOfi.length - b.numberOfi.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: 'nameOfi',
      ...getColumnSearchProps('nameOfi'),
      sorter: (a, b) => a.nameOfi.length - b.nameOfi.length,
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

  return {
    columns,
    mergedColumns,
    EditableCell,
    dataSource,
    form,
    cancel,
    rowSelection,
    setDataSource
  };
};
