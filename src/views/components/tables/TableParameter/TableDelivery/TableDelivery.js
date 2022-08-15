import React from 'react';
import {Table, Modal, Form, Select} from 'antd';
import './style.css';

import btnAdd from '../../../../../assets/img/add.png';
import {useCustomDelivery} from './hooks';
/*const {Search} = Input;*/
const {Option} = Select;
export default function TableDelivery() {
  const {
    formatDataSource,

    columns,
    isAdd,
    addingFile,
    setAddingFile,
    resetAdd,
    onAddFile,
    reasonsList,
    productsList,
    onCreateDelivery
  } = useCustomDelivery();
  return (
    <div>
      <Table columns={columns} dataSource={formatDataSource} />
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
              onCreateDelivery();
              resetAdd();
            }}
          >
            <Form id="modalDelivery">
              <Form.Item className="item-form" label="Motivos">
                <Select
                  placeholder={'000001'}
                  value={addingFile?.reason}
                  onChange={(e) => {
                    setAddingFile({
                      ...addingFile,
                      reasonId: e
                    });
                  }}
                  className="input-add"
                  showSearch
                  filterOption={(input, option) => {
                    return option.children.toLowerCase().includes(input.toLowerCase());
                  }}
                >
                  {reasonsList.map((reason) => {
                    return (
                      <Option key={reason.id} value={reason.id}>
                        {reason.reason}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="item-form" label="Uniformes">
                <Select
                  className="input-add"
                  placeholder={'Seleccionar...'}
                  value={addingFile?.uniformId}
                  onChange={(e) => {
                    setAddingFile({...addingFile, uniformId: e});
                  }}
                  showSearch
                  filterOption={(input, option) => {
                    return option.children.toLowerCase().includes(input.toLowerCase());
                  }}
                >
                  {productsList.map((product) => {
                    return (
                      <Option key={product.id} value={product.id}>
                        {product.descripcion}
                      </Option>
                    );
                  })}
                </Select>
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
