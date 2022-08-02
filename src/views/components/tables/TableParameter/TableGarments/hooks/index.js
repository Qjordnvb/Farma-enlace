import {useState} from 'react';
import {Switch} from 'antd';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';
export const useCustomGarments = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 251,
      descripcion: 'Camiseta Azul',
      estado: 'Activo'
    },
    {
      id: 252,
      descripcion: 'Camiseta Azuld',
      estado: 'Activo'
    },
    {
      id: 253,
      descripcion: 'Camiseta Azuls',
      estado: 'Activo'
    },
    {
      id: 254,
      descripcion: 'Camiseta Azul',
      estado: 'Activo'
    }
  ]);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const onChange = (record) => {
    `switch to ${record}`;
    record ? record.enabled : !record.enabled;
  };

  const columns = [
    {
      key: '1',
      title: 'Código',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'Descripción',
      dataIndex: 'descripcion'
    },
    {
      key: '3',
      title: 'Estado',
      dataIndex: 'estado'
    },
    {
      key: '4',
      title: 'Acción',
      width: '20%',
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
    isEditing,
    setIsEditing,
    editingFile,
    setEditingFile,
    isAdd,
    setIsAdd,
    addingFile,
    setAddingFile,
    dataSource,
    setDataSource,
    columns,
    resetEditing,
    resetAdd,
    onAddFile
  };
};
