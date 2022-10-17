import {useEffect, useState} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomInventory = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);

  const [editingKey, setEditingKey] = useState('');
  const {getAllDescriptions, getGarmentsTableParameters, editAmountToBuy} = useUtils();

  const [garmentsList, setGarmentsList] = useState([]);

  const [garmentColumns, setGarmentsColumns] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let getColumns = garmentsList.map((garment) => {
      return {
        title: garment.description,
        dataIndex: `garment${garment.id}`
      };
    });
    setGarmentsColumns(getColumns);
  }, [garmentsList]);

  useEffect(() => {
    setLoading(true);
    getGarmentsTableParameters(true)
      .then((res) => {
        setGarmentsList(res);

        getAllDescriptions()
          .then((res) => {
            setDataSource(res);
            setLoading(false);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let formatData1 = dataSource.map((product) => {
      if (product.garmentTypes.length > 0) {
        let formatGarment = product.garmentTypes?.reduce(function (res, garmentType) {
          res[`garment${garmentType?.garments[0]?.garmentId}_obj`] = {
            ...garmentType,
            ...garmentType.garments[0]
          };

          res[`garment${garmentType?.garments[0]?.garmentId}`] = garmentType.quantity;

          delete res[`garment${garmentType?.garments[0]?.garmentId}`].garments;
          return res;
        }, {});

        return {...product, ...formatGarment};
      } else {
        return {...product};
      }
    });
    formatData1.map((product) => {
      let newProduct = product;
      garmentsList.map((garment) => {
        let index = `garment${garment.id}`;
        if (!newProduct[index]) {
          newProduct[index] = 0;
        }
      });
      return newProduct;
    });
    setData(formatData1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const EditableCell = ({editing, dataIndex, title, children, ...restProps}) => {
    const inputNode = dataIndex === 'amountToBuy' ? <InputNumber /> : <Input />;
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

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      cantidadCompra: '',
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      setLoading(true);
      const row = await form.validateFields();
      setEditingKey('');

      editAmountToBuy(id, row.amountToBuy).then(() => {
        getGarmentsTableParameters(true).then((res) => {
          setGarmentsList(res);

          getAllDescriptions().then((res) => {
            setDataSource(res);
            setLoading(false);
          });
        });
      });
    } catch (errInfo) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('Descripción'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
    },
    ...garmentColumns,
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
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cantidad sugerida',
      dataIndex: 'suggestion',
      ...getColumnSearchProps('Cantidad'),
      sorter: (a, b) => a.suggestion - b.suggestion,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Stock mínimo',
      dataIndex: 'totalAverage',
      ...getColumnSearchProps('stock mínimo'),
      sorter: (a, b) => a.totalAverage - b.totalAverage,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Stock máximo',
      dataIndex: 'max',
      ...getColumnSearchProps('Stock máximo'),
      sorter: (a, b) => a.max - b.max,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Prioridad',
      dataIndex: 'priority',
      ...getColumnSearchProps('prioridad'),
      sorter: (a, b) => a.priority.localeCompare(b.priority),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',

      render: (_) => {
        let color = {
          Alta: 'red',
          Media: 'orange',
          Baja: 'green'
        };
        return {
          props: {
            style: {background: color[_], color: '#ececec', fontWeight: 'bold'}
          },
          children: <div>{_}</div>
        };
      }
    },
    {
      title: 'Cantidad a comprar',
      dataIndex: 'amountToBuy',
      editable: true,
      ...getColumnSearchProps('Cantidad a comprar'),
      sorter: (a, b) => a.amountToBuy - b.amountToBuy,
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
              onClick={() => save(record.id)}
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

  return {
    mergedColumns,
    EditableCell,
    dataSource,
    form,
    cancel,
    rowSelection,
    setDataSource,
    data,
    loading,
    selectedRowKeys
  };
};
