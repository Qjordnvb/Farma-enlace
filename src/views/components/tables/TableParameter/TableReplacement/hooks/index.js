import {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Popconfirm, Typography} from 'antd';
import moment from 'moment';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/edit-icon.svg';

export const useCustomReplacement = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [editingFile, setEditingFile] = useState(null);
  const [editId, setEditId] = useState();
  const {getColumnSearchProps, getAllRepositionParameters, editRepositionParameter} = useUtils();
  const [editingKey, setEditingKey] = useState(null);
  const [currentLength, setCurrentLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const isEditing = (record) => record?.id === editingKey;

  const [dataSource, setDataSource] = useState([]);

  const onTableChange = (pagination, filters, sorter, extra) => {
    setCurrentLength(extra.currentDataSource.length);
  };
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  useEffect(() => {
    setLoading(true);
    getAllRepositionParameters()
      .then((res) => {
        setDataSource(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EditableCell = ({editing, dataIndex, title, children, ...restProps}) => {
    let inputNode;
    if (title === 'Porcentajes') {
      inputNode = (
        <Input
          type="number"
          defaultValue={15}
          onChange={(e) => {
            const controlledValue = Math.max(0, Math.min(100, Number(e.target.value)));
            form.setFieldsValue({[dataIndex]: controlledValue});
          }}
          suffix="%"
        />
      );
    } else if (dataIndex === 'reposicion') {
      inputNode = <InputNumber min={0} />;
    } else {
      inputNode = <Input />;
    }

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
                message: `Por favor ingrese un ${title.toLowerCase()}!`
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
      const row = await form.validateFields();
      let getUser = window.localStorage.getItem('MY_AUTH_APP');
      let user = {};
      if (getUser !== 'undefined') {
        user = JSON.parse(getUser);
      }

      const {porcentaje, reposicion} = row;
      editRepositionParameter({
        porcentaje,
        reposicion,
        id: key,
        ultimaActualizacion: user?.user?.nombrecorto ? user?.user?.nombrecorto : 'jjarrin'
      })
        .then(() => {
          message.success('Operación realizada con éxito');
          getAllRepositionParameters().then((res) => {
            setLoading(false);
            setDataSource(res);
            setEditingKey(null);
            isEditing(null);
          });
        })
        .catch(() => {
          setLoading(false);
          message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
        });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      key: '0',
      title: 'N°',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
      width: '4%',
      align: 'center'
    },
    {
      key: '1',
      title: 'Código bodega',
      dataIndex: 'codigo',
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ['descend', 'ascend'],
      width: '8%',
      align: 'center'
    },
    {
      key: '2',
      title: 'Descripción',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion.length - b.descripcion.length,
      sortDirections: ['descend', 'ascend'],
      width: '10%',
      align: 'center'
    },
    {
      key: '3',
      title: 'Talla',
      dataIndex: 'talla',
      ...getColumnSearchProps('talla'),
      sorter: (a, b) => a.talla.length - b.talla.length,
      sortDirections: ['descend', 'ascend'],
      width: '5%',
      align: 'center',
      onFilter: (value, record) => {
        return record.talla?.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '4',
      title: 'Género',
      dataIndex: 'genero',
      ...getColumnSearchProps('genero'),
      sorter: (a, b) => a.genero.length - b.genero.length,
      sortDirections: ['descend', 'ascend'],
      width: '6%',
      align: 'center',
      onFilter: (value, record) => {
        return record.genero?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '5',
      title: 'Porcentajes',
      dataIndex: 'porcentaje',
      ...getColumnSearchProps('porcentaje'),
      sorter: (a, b) => a.porcentaje.length - b.porcentaje.length,
      sortDirections: ['descend', 'ascend'],
      editable: true,
      width: '7%',
      render: (_) => {
        return (
          <div>
            {_}
            {_ && '%'}
          </div>
        );
      },
      align: 'center',
      onFilter: (value, record) => {
        return record.porcentaje?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '6',
      title: 'Reposición',
      dataIndex: 'reposicion',
      ...getColumnSearchProps('reposicion'),
      sorter: (a, b) => a.reposicion - b.reposicion,
      sortDirections: ['descend', 'ascend'],
      editable: true,
      render: (_) => {
        return (
          <div>
            {_} {_ && 'dias'}
          </div>
        );
      },
      width: '7%',
      align: 'center',
      onFilter: (value, record) => {
        return record.reposicion?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '7',
      title: 'Sugerido mínimo',
      dataIndex: 'totalAverage',
      ...getColumnSearchProps('totalAverage'),
      sorter: (a, b) => a.totalAverage - b.totalAverage,
      sortDirections: ['descend', 'ascend'],
      width: '7%',
      align: 'center',
      onFilter: (value, record) => {
        return record.totalAverage?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '8',
      title: 'Sugerido máximo',
      dataIndex: 'max',
      ...getColumnSearchProps('max'),
      sorter: (a, b) => a.max - b.max,
      sortDirections: ['descend', 'ascend'],
      width: '7%',
      align: 'center',
      onFilter: (value, record) => {
        return record.max?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '9',
      title: 'Última modificación',
      dataIndex: 'ultimaActualizacion',
      ...getColumnSearchProps('ultimaActualizacion'),
      sorter: (a, b) => a.ultimaActualizacion?.localeCompare(b.ultimaActualizacion),
      sortDirections: ['descend', 'ascend'],
      width: '8%',
      align: 'center',
      onFilter: (value, record) => {
        return record.ultimaActualizacion?.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '10',
      title: 'Fecha de modificación',
      dataIndex: 'updatedAt',
      ...getColumnSearchProps('Fecha de modificación'),
      sorter: (a, b) => a.updatedAt?.localeCompare(b.updatedAt),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      },
      width: '6%',
      align: 'center',
      onFilter: (value, record) => {
        return record.updatedAt?.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      title: 'Acción',
      fixed: 'right',
      dataIndex: 'accion',
      width: '5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)}>Guardar</Typography.Link>
            <br />
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <div disabled={editingKey !== ''} onClick={() => edit(record)} className="btn-edit">
            <img src={BtnEdit} className="w-6" alt="btn-edit" />
          </div>
        );
      },
      align: 'center'
    }
  ];

  const resetEditing = () => {
    //setIsEditing(false);
    setEditingFile(null);
    setEditId(null);
  };

  const resetAdd = () => {
    setIsAdd(false);
    setAddingFile(null);
  };

  const onAddFile = () => {
    setIsAdd(true);
    setDataSource(() => {
      return [...dataSource];
    });
  };

  const onEditReplacement = async () => {
    setLoading(true);
    editRepositionParameter({...editingFile, id: editId}).then(() => {
      getAllRepositionParameters()
        .then((res) => {
          setLoading(false);
          setDataSource(res);
        })
        .catch(() => {
          setLoading(false);
        });
    });
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'reposicion' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return {
    dataSource,
    setDataSource,
    isEditing,
    editingFile,
    setEditingFile,
    columns,
    isAdd,
    setIsAdd,
    addingFile,
    setAddingFile,
    resetEditing,
    resetAdd,
    onAddFile,
    onEditReplacement,
    EditableCell,
    mergedColumns,
    form,
    onTableChange,
    currentLength,
    loading
  };
};
