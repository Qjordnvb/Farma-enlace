import {useEffect, useState} from 'react';

import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomDescription = () => {
  const originData = [];
  const [form] = Form.useForm();
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditing = (record) => record.id === editingKey;

  const {
    getColumnSearchProps,
    getAllDescriptions,
    getGarmentsTableParameters,
    updateGarmentQuantity
  } = useUtils();

  const [dataTable, setDataTable] = useState([]);
  const [garmentsList, setGarmentsList] = useState([]);
  const [garmentColumns, setGarmentsColumns] = useState([]);

  useEffect(() => {
    setLoading(true);
    getGarmentsTableParameters(true).then((res) => {
      setGarmentsList(res);

      getAllDescriptions().then((res) => {
        setDataTable(res);
        setLoading(false);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let getColumns = garmentsList.map((garment) => {
      return {
        title: garment.description,
        dataIndex: `garment${garment.id}`,
        editable: true
      };
    });
    setGarmentsColumns(getColumns);
  }, [garmentsList]);
  /**/
  useEffect(() => {
    let formatData1 = dataTable.map((product) => {
      if (product.garmentTypes.length > 0) {
        let formatGarment = product.garmentTypes?.reduce(function (res, garmentType) {
          res[`garment${garmentType?.garments[0]?.garmentId}_obj`] = {
            ...garmentType,
            ...garmentType?.garments[0]
          };

          res[`garment${garmentType?.garments[0]?.garmentId}`] = garmentType?.quantity;

          delete res[`garment${garmentType?.garments[0]?.garmentId}`]?.garments;
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
  }, [dataTable]);

  const EditableCell = ({editing, dataIndex, title, inputType, children, ...restProps}) => {
    const inputNode = inputType === 'garments' ? <InputNumber /> : <Input />;
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

  const edit = (record) => {
    form.setFieldsValue({
      garment1: '',
      garment2: '',
      garment3: '',
      garment4: '',
      garment5: '',
      garment6: '',
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      setLoading(true);
      let findRow = data.find((obj) => obj.id === key);

      const row = await form.validateFields();

      Object.keys(row).map((rowKey) => {
        if (findRow[`${rowKey}_obj`]?.garmentTypeId) {
          updateGarmentQuantity({
            quantity: row[rowKey],
            garmentTypeId: findRow[`${rowKey}_obj`].garmentTypeId,
            uniformId: key
          }).then(() => {
            getAllDescriptions()
              .then((res) => {
                setDataTable(res);
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
              });
            setEditingKey('');
          });
        } else {
          updateGarmentQuantity({
            quantity: row[rowKey],
            garmentId: Number(rowKey.substring(7, 9)),
            uniformId: key
          })
            .then(() => {
              getAllDescriptions().then((res) => {
                setDataTable(res);
                setLoading(false);
              });
              setEditingKey('');
            })
            .catch(() => {
              setLoading(false);
            });
        }
      });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'N°',
      dataIndex: 'id'
    },
    {
      title: 'Código Producto',
      dataIndex: 'codigo',
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion?.localeCompare(b.descripcion),
      sortDirections: ['descend', 'ascend']
    },
    ...garmentColumns,

    {
      title: 'Marca',
      dataIndex: 'marca',
      ...getColumnSearchProps('marca'),
      sorter: (a, b) => a.marca.localeCompare(b.marca),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'region',
      ...getColumnSearchProps('region'),
      sorter: (a, b) => a.region?.localeCompare(b.region),
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
          <div disabled={editingKey !== ''} onClick={() => edit(record)} className="btn-edit">
            <img src={BtnEdit} alt="btn-edit" />
          </div>
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
        inputType: col.dataIndex === 'garments' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return {
    form,
    EditableCell,
    data,
    mergedColumns,
    cancel,
    loading
  };
};
