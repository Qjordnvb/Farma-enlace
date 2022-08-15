import {useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomInventory = () => {
  const [form] = Form.useForm();
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
      cantidadCompra: '10',
      prenda1: '12',
      prenda2: '3',
      prenda3: '4',
      prenda4: '5',
      prenda5: '2',
      prenda6: '1'
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
      cantidadCompra: '10',
      prenda1: '12',
      prenda2: '3',
      prenda3: '4',
      prenda4: '5',
      prenda5: '2',
      prenda6: '1'
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
      cantidadCompra: '10',
      prenda1: '12',
      prenda2: '3',
      prenda3: '4',
      prenda4: '5',
      prenda5: '2',
      prenda6: '1'
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
      title: 'Mandil blanco',
      dataIndex: 'prenda1',
      ...getColumnSearchProps('Mandil blanco'),
      sorter: (a, b) => a.prenda1.length - b.prenda1.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Mandil azul',
      dataIndex: 'prenda2',
      ...getColumnSearchProps('Mandil azul'),
      sorter: (a, b) => a.prenda2.length - b.prenda2.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Camiseta',
      dataIndex: 'prenda3',
      ...getColumnSearchProps('Camiseta'),
      sorter: (a, b) => a.prenda3.length - b.prenda3.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Buso',
      dataIndex: 'prenda4',
      ...getColumnSearchProps('Buso'),
      sorter: (a, b) => a.prenda4.length - b.prenda4.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Chompa',
      dataIndex: 'prenda5',
      ...getColumnSearchProps('Chompa'),
      sorter: (a, b) => a.prenda5.length - b.prenda5.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Escarapela',
      dataIndex: 'prenda6',
      ...getColumnSearchProps('Escarapela'),
      sorter: (a, b) => a.prenda6.length - b.prenda6.length,
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
    mergedColumns,
    EditableCell,
    dataSource,
    form,
    cancel,
    rowSelection,
    setDataSource
  };
};