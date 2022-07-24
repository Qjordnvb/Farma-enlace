import {useState} from 'react';
import {EditOutlined} from '@ant-design/icons';

export const useCustomDescription = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      n: 1,
      code: 'John Brown',
      description: 32,
      garments: 'New York No. 1 Lake Park',
      brand: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      region: 'New York No. 1 Lake Park'
    },
    {
      n: 2,
      code: 'John Brown',
      description: 32,
      garments: 'New York No. 1 Lake Park',
      brand: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      region: 'New York No. 1 Lake Park'
    }
  ]);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const columns = [
    {
      key: '1',
      title: 'N°',
      dataIndex: 'n'
    },
    {
      key: '2',
      title: 'Código Producto',
      dataIndex: 'code'
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'description'
    },
    {
      key: '4',
      title: 'Prendas',
      dataIndex: 'garments'
    },
    {
      key: '5',
      title: 'Marca',
      dataIndex: 'brand'
    },
    {
      key: '6',
      title: 'Región',
      dataIndex: 'region'
    },
    {
      key: '7',
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
