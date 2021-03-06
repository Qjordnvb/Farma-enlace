import {useState} from 'react';
import {Switch} from 'antd';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomReasons = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      reason: 'Personal nuevo',
      replacement: 'NO',
      replacementManual: '3',
      payment: 'NO',
      dues: '0',
      calculation: 'Desde la fecha de ingreso',
      discountPersonal: '0%',
      discountCompany: '50%'
    },
    {
      id: 2,
      reason: 'Personal nuevo',
      replacement: 'NO',
      replacementManual: '3',
      payment: 'NO',
      dues: '0',
      calculation: 'Desde la fecha de ingreso',
      discountPersonal: '0%',
      discountCompany: '50%'
    }
  ]);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const onChange = (checked) => {
    `switch to ${checked}`;
  };

  const columns = [
    {
      key: '1',
      title: 'Motivo',
      dataIndex: 'reason'
    },
    {
      key: '2',
      title: 'Reposición automática',
      dataIndex: 'replacement'
    },
    {
      key: '3',
      title: 'Reposición',
      dataIndex: 'replacementManual'
    },
    {
      key: '4',
      title: 'Cobro',
      dataIndex: 'payment'
    },
    {
      key: '5',
      title: 'Cuotas',
      dataIndex: 'dues'
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculation'
    },
    {
      key: '7',
      title: 'Descuento Personal',
      dataIndex: 'discountPersonal'
    },
    {
      key: '8',
      title: 'Descuento Farmaenlace',
      dataIndex: 'discountCompany'
    },
    {
      key: '9',
      title: 'Acción',
      render: (record) => {
        return (
          <div className="flex-action">
            <Switch className="input-switch" defaultChecked onChange={onChange} />
            <div
              onClick={() => {
                onEditFile(record);
              }}
              className="btn-edit"
            >
              <img src={BtnEdit} alt="btn-edit" />
            </div>
          </div>
        );
      }
    }
  ];

  const resetEditing = () => {
    setIsEditing(false);
    setEditingFile(null);
  };

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
    dataSource,
    setDataSource,
    isEditing,
    setIsEditing,
    editingFile,
    setEditingFile,
    columns,
    isAdd,
    setIsAdd,
    addingFile,
    setAddingFile,
    resetEditing,
    resetAdd,
    onAddFile
  };
};
