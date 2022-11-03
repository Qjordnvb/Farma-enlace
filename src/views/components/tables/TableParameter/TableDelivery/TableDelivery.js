import React, {useEffect, useState} from 'react';
import {Form, message, Modal, Select, Table} from 'antd';
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
    onCreateDelivery,
    loading
  } = useCustomDelivery();

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(formatDataSource.length);
  }, [formatDataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  return (
    <div>
      <Table
        pagination={{
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
        scroll={{y: 400, x: 1500}}
        columns={columns}
        dataSource={formatDataSource}
        showSizeChanger
        loading={loading}
      />
      {isAdd && (
        <>
          <Modal
            title="Agregar Entrega"
            visible={isAdd}
            okText="Crear Entrega"
            onCancel={() => {
              resetAdd();
            }}
            onOk={async () => {
              if (addingFile.reasonId.length > 0 && addingFile.uniformId) {
                onCreateDelivery();
                resetAdd();
              } else {
                await message.warning('Debe seleccionar un motivo y un uniforme', 10);
              }
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
                  mode={'multiple'}
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
                  filterOption={(input, option) => {
                    return option.children.toLowerCase().includes(input.toLowerCase());
                  }}
                  onChange={(e) => {
                    setAddingFile({
                      ...addingFile,
                      uniformId: e
                    });
                  }}
                  showSearch
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
