import {useState, useEffect} from 'react';
import {DeleteFilled} from '@ant-design/icons';
import {Switch, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomGarments = () => {
  const {
    getColumnSearchProps,
    getGarmentsTableParameters,
    switchActiveGarment,
    addGarment,
    editGarmentDescription
  } = useUtils();

  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  const dataReasonsTable = function () {
    getGarmentsTableParameters().then((response) => {
      setDataSource(response);
    });
  };

  useEffect(() => {
    dataReasonsTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const onSwitchChange = (record, selectedRows) => {
    switchActiveGarment(record.id, selectedRows).then(async () => {
      await dataReasonsTable();
    });
  };

  const columns = [
    {
      key: '1',
      title: 'Código',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend'
    },
    {
      key: '2',
      title: 'Descripción',
      dataIndex: 'description',
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Estado',
      dataIndex: 'active',
      sorter: (a, b) => a.active - b.active,
      ...getColumnSearchProps('active'),
      render: (record) => {
        return <div>{record ? <p>Activo</p> : <p>Inactivo</p>}</div>;
      }
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
              checked={record.active}
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

  const resetEditing = () => {
    setIsEditing(false);
    setEditingFile(null);
  };

  const resetAdd = () => {
    setIsAdd(false);
    setAddingFile(null);
  };

  const onAddFile = async () => {
    setIsAdd(true);
  };

  const onCreateGarment = async () => {
    await addGarment({...addingFile}).then(async () => {
      await dataReasonsTable();
    });
  };

  const onEditGarment = async () => {
    editGarmentDescription({...editingFile}).then(async () => {
      await dataReasonsTable();
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
    onAddFile,
    onCreateGarment,
    onEditGarment
  };
};
