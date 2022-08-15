import {useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';

export const useCustomInventory = () => {
  const [form] = Form.useForm();
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      description: ` 0008765464`,
      prendas: 'Camisa',
      talla: `M`,
      marca: 'Económica',
      stock: '10',
      cantidad: '10',
      stockMin: '1',
      stockMax: '100',
      cantidadCompra: '10'
    },
    {
      key: '2',
      description: ` 00087654623`,
      prendas: 'Camisa',
      talla: `M`,
      marca: 'Económica',
      stock: '10',
      cantidad: '10',
      stockMin: '1',
      stockMax: '100',
      cantidadCompra: '10'
    },
    {
      key: '3',
      description: ` 0008765462323`,
      prendas: 'Camisa',
      talla: `M`,
      marca: 'Económica',
      stock: '10',
      cantidad: '10',
      stockMin: '1',
      stockMax: '100',
      cantidadCompra: '10'
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
      title: 'Descripción',
      dataIndex: 'description',
      ...getColumnSearchProps('Descripción'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Prendas',
      dataIndex: 'prendas',
      ...getColumnSearchProps('Prendas'),
      sorter: (a, b) => a.prendas.length - b.prendas.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      ...getColumnSearchProps('Ralla'),
      sorter: (a, b) => a.talla.length - b.talla.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      ...getColumnSearchProps('Stock'),
      sorter: (a, b) => a.stock.length - b.stock.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cantidad sugerida',
      dataIndex: 'cantidad',
      ...getColumnSearchProps('Cantidad'),
      sorter: (a, b) => a.cantidad.length - b.cantidad.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Stock mínimo',
      dataIndex: 'stockMin',
      ...getColumnSearchProps('Stock mínimo'),
      sorter: (a, b) => a.stockMin.length - b.stockMin.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Stock máximo',
      dataIndex: 'stockMax',
      ...getColumnSearchProps('Stock máximo'),
      sorter: (a, b) => a.stockMax.length - b.stockMax.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cantidad a comprar',
      dataIndex: 'cantidadCompra',
      editable: true,
      ...getColumnSearchProps('Cantidad a comprar'),
      sorter: (a, b) => a.cantidadCompra.length - b.cantidadCompra.length,
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
            Edit
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

  const resetAdd = () => {
    setIsAdd(false);
    setAddingFile(null);
  };

  const onAddFile = (record) => {
    setIsAdd(true);
    setAddingFile({...record});
    setDataSource(() => {
      return [...dataSource];
    });
  };

  return {
    mergedColumns,
    EditableCell,
    dataSource,
    form,
    cancel,
    rowSelection,
    isAdd,
    addingFile,
    setDataSource,
    onAddFile,
    resetAdd,
    setAddingFile
  };
};
