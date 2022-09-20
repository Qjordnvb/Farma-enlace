import {useEffect, useState} from 'react';
import {DeleteFilled} from '@ant-design/icons';
import {Switch, Typography, Form, Popconfirm} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomReasons = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState({});
  const {getColumnSearchProps, getReasonsTableParameters, addReason, switchActiveReason} =
    useUtils();
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(null);

  const isEditing = (record) => record?.id === editingKey;

  const dataReasonsTable = function () {
    getReasonsTableParameters().then((response) => {
      setDataSource(response);
    });
  };

  useEffect(() => {
    dataReasonsTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
  }, [addingFile]);

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
    switchActiveReason(record.id, selectedRows).then(() => {
      // eslint-disable-next-line no-console
      dataReasonsTable();
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

      const {price} = row;
      console.log(price, key);
      /* editPrice({price, id: key}).then(() => {
        dataTable();
        isEditing(null);
        setEditingKey(null);
      });*/
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      key: '1',
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '2',
      title: 'Reposición automática',
      dataIndex: 'replacement',
      ...getColumnSearchProps('replacement'),
      sorter: (a, b) => a.replacement.localeCompare(b.replacement),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Reposición',
      dataIndex: 'replacementAuto',
      ...getColumnSearchProps('replacementAuto'),
      sorter: (a, b) => a.replacementAuto.localeCompare(b.replacementAuto),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_} días</div>;
      }
    },
    {
      key: '4',
      title: 'Cobro',
      dataIndex: 'payment',
      ...getColumnSearchProps('payment'),
      sorter: (a, b) => a.payment.localeCompare(b.payment),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '5',
      title: 'Cuotas',
      dataIndex: 'dues',
      ...getColumnSearchProps('dues'),
      sorter: (a, b) => a.dues.length - b.dues.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculation',
      ...getColumnSearchProps('calculation'),
      sorter: (a, b) => a.calculation.localeCompare(b.calculation),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '7',
      title: 'Descuento Personal',
      dataIndex: 'personalDiscount',
      ...getColumnSearchProps('personalDiscount'),
      sorter: (a, b) => a.personalDiscount.length - b.personalDiscount.length,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_}%</div>;
      }
    },
    {
      key: '8',
      title: 'Descuento Farmaenlace',
      dataIndex: 'companyDiscount',
      ...getColumnSearchProps('companyDiscount'),
      sorter: (a, b) => a.companyDiscount.length - b.companyDiscount.length,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_}%</div>;
      }
    },
    {
      key: '9',
      title: 'Acción',
      width: '12%',
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
                <img src={BtnEdit} alt="btn-edit" />
              </div>
            )}
            <Typography.Link
              // onClick={() => {
              //   onDelete(record.id);
              // }}
              style={{
                marginRight: 8,
                marginTop: -14
              }}
            >
              <DeleteFilled />
            </Typography.Link>
          </div>
        );
      }
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
      replacementAuto: '0 ',
      payment: 'NO',
      dues: '0',
      calculation: 'Fecha de ingreso del colaborador',
      personalDiscount: '0%',
      companyDiscount: '0%'
    });
  };
  const onCreateReason = async () => {
    await addReason({
      ...addingFile,
      personalDiscount: addingFile.personalDiscount,
      companyDiscount: addingFile.companyDiscount
    });
    dataReasonsTable();
  };

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
    onCreateReason
  };
};
