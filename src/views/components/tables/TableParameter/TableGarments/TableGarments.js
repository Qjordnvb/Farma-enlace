import {Table, Modal, Input, Form, Select} from 'antd';
import {Option} from 'antd/es/mentions';
import './style.css';
import Button from 'views/components/button/Button';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import {useCustomGarments} from './hooks';
import {useEffect, useState} from 'react';

function TableGarments() {
  const {
    dataSource,
    setEditingFile,
    isEditing,
    editingFile,
    columns,
    isAdd,
    addingFile,
    setAddingFile,
    resetEditing,
    resetAdd,
    onAddFile,
    onCreateGarment,
    onEditGarment
  } = useCustomGarments();

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  return (
    <>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            total: currentLength
          }}
          onChange={onChange}
          scroll={{y: 400}}
          columns={columns}
          dataSource={dataSource}
          rowClassName={(record) => {
            return record.active ? null : 'disabled-row';
          }}
        ></Table>
        {isEditing && (
          <>
            <Modal
              className="modalEdit-garments"
              title="Editar"
              visible={isEditing}
              okText="Guardar"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                onEditGarment().then(() => {
                  resetEditing();
                });
              }}
            >
              <Form>
                <Form.Item className="item-form" label="Descripción">
                  <Input
                    placeholder="Descripción"
                    value={editingFile?.description}
                    onChange={(e) => {
                      setEditingFile({...editingFile, description: e.target.value});
                    }}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}

        {isAdd && (
          <>
            <Modal
              className="modalAdd-garments"
              title="Agregar Prenda"
              visible={isAdd}
              okText="Crear Prenda"
              onCancel={() => {
                resetAdd();
              }}
              onOk={() => {
                onCreateGarment().then(() => {
                  resetAdd();
                });
              }}
            >
              <Form id="modalAdd">
                <Form.Item className="item-form" label="Descripción">
                  <Input
                    className="input-add"
                    placeholder="Descripción"
                    value={addingFile?.description}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, description: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Estado">
                  <Select
                    defaultValue={true}
                    placeholder="Estado"
                    onChange={(e) => {
                      setAddingFile({
                        ...addingFile,
                        active: e
                      });
                    }}
                  >
                    <Option value={true}>Activo</Option>
                    <Option value={false}>Inactivo</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
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
