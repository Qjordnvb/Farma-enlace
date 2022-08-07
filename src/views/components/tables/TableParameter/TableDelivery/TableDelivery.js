import React from 'react';
import {Table, Modal, Input, Form} from 'antd';
import './style.css';

import btnAdd from '../../../../../assets/img/add.png';
import {useCustomDelivery} from './hooks';
const {Search} = Input;
export default function TableDelivery() {
  const {
    dataSource,
    setDataSource,
    columns,
    isAdd,
    addingFile,
    setAddingFile,
    resetAdd,
    onAddFile
  } = useCustomDelivery();
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
      {isAdd && (
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
              <Form.Item className="item-form" label="Motivos">
                <Input
                  className="input-add"
                  placeholder="000001"
                  value={addingFile?.motivo}
                  onChange={(e) => {
                    setAddingFile(() => {
                      return {motivo: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Uniformes">
                <Search
                  className="input-add"
                  placeholder="Seleccionar..."
                  value={addingFile?.prendas}
                  onChange={(e) => {
                    setAddingFile((pre) => {
                      return {...pre, prendas: e.target.value};
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}

      <div className="flex justify-end">
        <button onClick={onAddFile}>
          <img src={btnAdd} alt={'add'} />{' '}
        </button>
      </div>
    </div>
  );
}
