import { useState,useEffect} from 'react';
import {Switch} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomGarments = () => {
  const {getColumnSearchProps,getGarmentsTableParameters,switchActiveGarment} = useUtils();

  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [dataSource, setDataSource] = useState([

  ]);

  const dataReasonsTable =  function () {
    getGarmentsTableParameters().then((response) => {
      console.log("data table",response);
      setDataSource(response);
    });

  }; 

  useEffect(() => {
    dataReasonsTable();
  }, []);

  



  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const onSwitchChange = (record, selectedRows) => {
    console.log('switch', record, selectedRows);
    switchActiveGarment(record.id,selectedRows).then(res => {
      console.log('res',res);
    });
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
      dataIndex: 'active',
   
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
              defaultChecked={record.active}
              onChange={(selectedRows) => {
                onSwitchChange(record, selectedRows);
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
