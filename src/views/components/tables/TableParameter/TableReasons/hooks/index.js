import React, {useEffect, useState} from 'react';
import {DeleteFilled} from '@ant-design/icons';
import {Form, Input, message, Popconfirm, Select, Switch, Typography} from 'antd';
import {useUtils} from 'hooks';

import BtnEdit from '../../../../../../assets/edit-icon.svg';

const {Option} = Select;
export const useCustomReasons = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState({});
  const {
    getColumnSearchProps,
    getReasonsTableParameters,
    addReason,
    switchActiveReason,
    deleteReason,
    editReason
  } = useUtils();
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditing = (record) => record?.id === editingKey;

  const dataReasonsTable = function () {
    setLoading(true);
    getReasonsTableParameters()
      .then((response) => {
        setLoading(false);
        setDataSource(response);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dataReasonsTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (record, selectedRows) => {
    let auxArray = JSON.parse(JSON.stringify(dataSource));
    for (let i = 0; i < auxArray.length; i++) {
      if (auxArray[i].id === record.id) {
        auxArray[i].replacement = selectedRows ? 'SI' : 'NO';
      }
    }

    record ? record.enabled : !record.enabled;
    setDataSource(auxArray);
  };

  const onSwitchChange = (record, selectedRows) => {
    setLoading(true);
    switchActiveReason(record.id, selectedRows)
      .then(() => {
        // eslint-disable-next-line no-console
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        setLoading(false);
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
      });
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
      const row = await form.validateFields();

      // eslint-disable-next-line no-console
      editReason({id: key, ...row})
        .then(() => {
          setLoading(true);
          dataReasonsTable();
          isEditing(null);
          setEditingKey(null);
          message.success('Operación realizada con éxito');
        })
        .catch(() => {
          message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
        });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const onDelete = (id) => {
    setLoading(true);
    deleteReason(id)
      .then(() => {
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        setLoading(false);
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
      });
  };

  const cal = ['Fecha de ingreso del colaborador', 'Fecha de última reposición'];

  const EditableCell = ({editing, dataIndex, children, ...restProps}) => {
    let inputNode;
    if (dataIndex === 'replacementAuto' || dataIndex === 'dues') {
      inputNode = <Input type={'number'} />;
    } else if (dataIndex === 'personalDiscount' || dataIndex === 'companyDiscount') {
      inputNode = (
        <Input
          type={'number'}
          max={100}
          onChange={(e) => {
            const controlledValue = Math.max(0, Math.min(100, Number(e.target.value)));
            let newDiscount = 100 - controlledValue;
            form.setFieldValue(dataIndex, controlledValue);
            let newName = dataIndex === 'personalDiscount' ? 'companyDiscount' : 'personalDiscount';
            form.setFieldValue(newName, newDiscount);
          }}
          suffix={'%'}
        />
      );
    } else if (dataIndex === 'calculation') {
      inputNode = (
        <Select
          defaultValue={'Fecha de ingreso del colaborador'}
          value={addingFile?.calculation}
          onChange={(value) => {
            setAddingFile({...addingFile, calculation: value});
          }}
        >
          {cal.map((cals, index) => {
            return (
              <Option key={index} value={cals}>
                {cals}
              </Option>
            );
          })}
        </Select>
      );
    } else if (dataIndex === 'replacement' || dataIndex === 'payment') {
      inputNode = <Switch />;
    } else {
      inputNode = <Input />;
    }

    let formNode = (
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0
        }}
        rules={[
          {
            required: true,
            message: `Por favor inserte un precio`
          }
        ]}
      >
        {inputNode}
      </Form.Item>
    );

    if (dataIndex === 'replacement' || dataIndex === 'payment') {
      formNode = (
        <Form.Item
          name={dataIndex}
          valuePropName={'checked'}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Por favor inserte un precio`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      );
    }
    return <td {...restProps}>{editing ? <>{formNode}</> : children}</td>;
  };

  const columns = [
    {
      key: '1',
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('motivo'),
      sorter: (a, b) => a.reason?.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
      editable: true,
      width: 10,
      align: 'center'
    },
    {
      key: '2',
      title: 'Reposición automática',
      dataIndex: 'replacement',
      sorter: (a, b) => a.replacement - b.replacement,
      sortDirections: ['descend', 'ascend'],
      editable: true,
      width: 8,
      render: (_) => {
        return <div>{_ ? 'SI' : 'NO'}</div>;
      },
      align: 'center'
    },
    {
      key: '3',
      title: 'Reposición',
      dataIndex: 'replacementAuto',
      ...getColumnSearchProps('reposicion'),
      sorter: (a, b) => {
        return a.replacementAuto - b.replacementAuto;
      },
      sortDirections: ['descend', 'ascend'],
      width: 10,
      render: (_) => {
        return <div>{_} días</div>;
      },
      editable: true,
      align: 'center'
    },
    {
      key: '4',
      title: 'Cobro',
      dataIndex: 'payment',
      sorter: (a, b) => {
        return a?.payment - b?.payment;
      },
      sortDirections: ['descend', 'ascend'],
      width: 8,
      render: (_) => {
        return <div>{_ ? 'SI' : 'NO'}</div>;
      },
      editable: true,
      align: 'center'
    },
    {
      key: '5',
      title: 'Cuotas',
      dataIndex: 'dues',
      ...getColumnSearchProps('cuotas'),
      sorter: (a, b) => a.dues - b.dues,
      sortDirections: ['descend', 'ascend'],
      editable: true,
      width: 7,
      align: 'center'
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculation',
      ...getColumnSearchProps('calculo'),
      sorter: (a, b) => a.calculation?.localeCompare(b.calculation),
      sortDirections: ['descend', 'ascend'],
      editable: true,
      width: 10,
      align: 'center'
    },
    {
      key: '7',
      title: 'Descuento Personal',
      dataIndex: 'personalDiscount',
      ...getColumnSearchProps('descuento personal'),
      sorter: (a, b) => a.personalDiscount - b.personalDiscount,
      sortDirections: ['descend', 'ascend'],
      width: 8,
      render: (_) => {
        return <div>{_}%</div>;
      },
      editable: true,
      align: 'center'
    },
    {
      key: '8',
      title: 'Descuento Farmaenlace',
      dataIndex: 'companyDiscount',
      ...getColumnSearchProps('descuento farmaenlace'),
      sorter: (a, b) => a.companyDiscount - b.companyDiscount,
      sortDirections: ['descend', 'ascend'],
      width: 8,
      render: (_) => {
        return <div>{_}%</div>;
      },
      editable: true,
      align: 'center'
    },
    {
      key: '9',
      title: 'Acción',
      fixed: 'right',
      width: 10,
      render: (record) => {
        const editable = isEditing(record);
        return (
          <div className="flex-action">
            <Switch
              className="input-switch"
              defaultChecked={record.active}
              onChange={(selectedRows) => {
                onSwitchChange(record, selectedRows);
              }}
            />
            <div>
              {editable ? (
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
                <div onClick={() => edit(record)} className="btn-edit">
                  <img src={BtnEdit} className="w-6" alt="btn-edit" />
                </div>
              )}
            </div>

            <Typography.Link
              onClick={() => {
                onDelete(record.id);
              }}
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <DeleteFilled />
            </Typography.Link>
          </div>
        );
      },
      align: 'center'
    }
  ];

  const resetAdd = () => {
    setIsAdd(false);
    setAddingFile(null);
  };

  const onAddFile = async () => {
    setIsAdd(true);

    setAddingFile({
      reason: '',
      replacement: 'NO',
      replacementAuto: '0',
      payment: 'NO',
      dues: '0',
      calculation: 'Fecha de ingreso del colaborador',
      personalDiscount: '0',
      companyDiscount: '0'
    });
  };
  const onCreateReason = async () => {
    setLoading(true);
    addReason({
      ...addingFile,
      personalDiscount: addingFile.personalDiscount,
      companyDiscount: addingFile.companyDiscount
    })
      .then(() => {
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        setLoading(false);
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
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
        inputType:
          col.dataIndex === 'replacementAuto' ||
          col.dataIndex === 'dues' ||
          col.dataIndex === 'personalDiscount' ||
          col.dataIndex === 'companyDiscount'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return {
    dataSource,
    setDataSource,
    columns,
    isAdd,
    setIsAdd,
    addingFile,
    setAddingFile,
    resetAdd,
    onAddFile,
    onChange,
    onCreateReason,
    loading,
    EditableCell,
    mergedColumns,
    form
  };
};
