import {Table, Modal, Input, Form} from 'antd';
import './style.css';
import Button from 'views/components/button/Button';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import {useCustomGarments} from './hooks';

function TableGarments() {
  const {
    dataSource,
    setDataSource,
    setEditingFile,
    isEditing,
    editingFile,
    columns,
    isAdd,
    addingFile,
    setAddingFile,
    resetEditing,
    resetAdd,
    onAddFile
  } = useCustomGarments();
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
        <>
          <Modal
            title="Editar"
            visible={isEditing}
            okText="Guardar"
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
            <Form>
              <Form.Item className="item-form" label="Descripción">
                <Input
                  placeholder="Descripción"
                  value={editingFile?.descripcion}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, descripcion: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Estado">
                <Input
                  placeholder="Estado"
                  value={editingFile?.estado}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, estado: e.target.value};
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>

        <>
          <Modal
            title="Agregar Prenda"
            visible={isAdd}
            okText="Crear Prenda"
            onCancel={() => {
              resetAdd();
            }}
            onOk={() => {
              setDataSource(() => {
                return [...dataSource, addingFile];
              });

              resetAdd();
            }}
          >
            <Form id="modalAdd">
              <Form.Item className="item-form" label="Código">
                <Input
                  className="input-add"
                  placeholder="Código"
                  value={addingFile?.id}
                  onChange={(e) => {
                    setAddingFile(() => {
                      return {id: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Descripción">
                <Input
                  className="input-add"
                  placeholder="Descripción"
                  value={addingFile?.descripcion}
                  onChange={(e) => {
                    setAddingFile((pre) => {
                      return {...pre, descripcion: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Estado">
                <Input
                  className="input-add"
                  label="Estado"
                  placeholder="Estado"
                  value={addingFile?.estado}
                  onChange={(e) => {
                    setAddingFile((pre) => {
                      return {...pre, estado: e.target.value};
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
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

export default TableGarments;
