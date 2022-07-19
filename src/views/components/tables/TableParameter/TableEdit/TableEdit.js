import {useState} from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Table, Modal, Input} from 'antd';
import './style.css';
import Button from 'views/components/button/Button';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';

function TableEdit() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
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
      key: '5',
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

  const onAddFile = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newFile = {
      id: randomNumber,
      descripcion: 'Name ' + randomNumber,
      estado: randomNumber + '@gmail.com'
    };
    setDataSource((pre) => {
      return [...pre, newFile];
    });
  };
  // const onDelete= (record) => {
  //   Modal.confirm({
  //     title: 'Are you sure, you want to delete this student record?',
  //     okText: 'Yes',
  //     okType: 'danger',
  //     onOk: () => {
  //       setDataSource((pre) => {
  //         return pre.filter((student) => student.id !== record.id);
  //       });
  //     }
  //   });
  // };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingFile(null);
  };
  return (
    <>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 5
          }}
          columns={columns}
          dataSource={dataSource}
        ></Table>
        <Modal
          title="Edit File"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((file) => {
                if (file.id === editingFile.id) {
                  return editingFile;
                } else {
                  return file;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            placeholder="Descripción"
            value={editingFile?.descripcion}
            onChange={(e) => {
              setEditingFile((pre) => {
                return {...pre, descripcion: e.target.value};
              });
            }}
          />
          <Input
            placeholder="Estado"
            value={editingFile?.estado}
            onChange={(e) => {
              setEditingFile((pre) => {
                return {...pre, estado: e.target.value};
              });
            }}
          />
        </Modal>
      </div>
      <StyledGridList>
        <div className="btn-add">
          <Button
            onClick={onAddFile}
            className="py-2.5 px-8 rounded-lg my-4"
            width="224px"
            label="Crear prenda"
            variant="primary"
          />
        </div>
      </StyledGridList>
    </>
  );
}

export default TableEdit;
