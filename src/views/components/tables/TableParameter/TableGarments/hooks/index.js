import {useState} from 'react';
import {EditOutlined} from '@ant-design/icons';
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
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditFile(record);
              }}
            />
          </>
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
