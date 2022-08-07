import {useState} from 'react';
import {Switch} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomGarments = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      id: 251,
      descripcion: 'Camiseta Azul',
      estado: 'Activo'
    },
    {
      id: 252,
      descripcion: 'Camiseta Roja',
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

  const onChange = (record, selectedRows) => {
    let auxArray = JSON.parse(JSON.stringify(dataSource));
    for (let i = 0; i < auxArray.length; i++) {
      if (auxArray[i].id === record.id) {
        auxArray[i].estado = selectedRows ? 'Activo' : 'Inactivo';
      }
    }

    record ? record.enabled : !record.enabled;
    setDataSource(auxArray);
  };

  const columns = [
    {
      key: '1',
      title: 'Código',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '2',
      title: 'Descripción',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion.length - b.descripcion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Estado',
      dataIndex: 'estado',
      ...getColumnSearchProps('estado'),
      sorter: (a, b) => a.estado.length - b.estado.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '4',
      title: 'Acción',
      width: '20%',
      render: (record) => {
        return (
          <div className="flex-action">
            <Switch
              className="input-switch"
              defaultChecked
              onChange={(selectedRows) => {
                onChange(record, selectedRows);
              }}
            />
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
