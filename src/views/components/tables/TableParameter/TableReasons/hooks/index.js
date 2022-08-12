import {useEffect, useState} from 'react';
import {Switch} from 'antd';
import {useUtils} from 'hooks';

export const useCustomReasons = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState({});
  const {getColumnSearchProps, getReasonsTableParameters, addReason, switchActiveReason} =
    useUtils();
  const [dataSource, setDataSource] = useState([]);

  const dataReasonsTable = function () {
    getReasonsTableParameters().then((response) => {
      console.log('data table', response);
      setDataSource(response);
    });
  };

  useEffect(() => {
    dataReasonsTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('adding file', addingFile);
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
    console.log('switch', record, selectedRows);
    switchActiveReason(record.id, selectedRows).then((res) => {
      console.log('res', res);
    });
  };

  const columns = [
    {
      key: '1',
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason.length - b.reason.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '2',
      title: 'Reposición automática',
      dataIndex: 'replacement',
      ...getColumnSearchProps('replacement'),
      sorter: (a, b) => a.replacement.length - b.replacement.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Reposición',
      dataIndex: 'replacementAuto',
      ...getColumnSearchProps('replacementAuto'),
      sorter: (a, b) => a.replacementManual.length - b.replacementManual.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '4',
      title: 'Cobro',
      dataIndex: 'payment',
      ...getColumnSearchProps('payment'),
      sorter: (a, b) => a.payment.length - b.payment.length,
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
      sorter: (a, b) => a.calculation.length - b.calculation.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '7',
      title: 'Descuento Personal',
      dataIndex: 'personalDiscount',
      ...getColumnSearchProps('personalDiscount'),
      sorter: (a, b) => a.discountPersonal.length - b.discountPersonal.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '8',
      title: 'Descuento Farmaenlace',
      dataIndex: 'companyDiscount',
      ...getColumnSearchProps('companyDiscount'),
      sorter: (a, b) => a.discountCompany.length - b.discountCompany.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '9',
      title: 'Acción',
      render: (record) => {
        return (
          <div className="flex-action">
            <Switch
              className="input-switch"
              defaultChecked={record.active}
              onChange={(selectedRows) => {
                onSwitchChange(record, selectedRows);
              }}
            />
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
    await addReason({...addingFile});
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
