import {useEffect, useState} from 'react';
import {DeleteFilled} from '@ant-design/icons';
import {message, Switch, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/edit-icon.svg';

export const useCustomGarments = () => {
  const {
    getColumnSearchProps,
    getGarmentsTableParameters,
    switchActiveGarment,
    addGarment,
    editGarmentDescription,
    deleteGarment
  } = useUtils();

  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataReasonsTable = () => {
    setLoading(true);
    getGarmentsTableParameters()
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

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const onSwitchChange = (record, selectedRows) => {
    setLoading(true);
    switchActiveGarment(record.id, selectedRows)
      .then(async () => {
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
      });
  };

  const onDelete = (id) => {
    setLoading(true);
    deleteGarment(id)
      .then(() => {
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
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
      sorter: (a, b) => a.description?.localeCompare(b.description),
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
    setLoading(true);
    await addGarment({...addingFile})
      .then(async () => {
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
      });
  };

  const onEditGarment = async () => {
    setLoading(true);
    editGarmentDescription({...editingFile})
      .then(async () => {
        dataReasonsTable();
        message.success('Operación realizada con éxito');
      })
      .catch(() => {
        message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
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
    onEditGarment,
    loading
  };
};
