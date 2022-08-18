import React from 'react';
import {Table, Form, Input, Modal} from 'antd';
import {CSVLink} from 'react-csv';
import Button from 'views/components/button/Button';
import btnCarga from '../../../../../assets/img/btn-carga.svg';
import btnNew from '../../../../../assets/img/btn-new.svg';
import btnDownload from '../../../../../assets/img/btn-order.svg';

import {useCustomIntake} from './hooks';
import './style.css';
import '../../TableParameter/TableReasons/style-reasons.css';

const TableIntake = () => {
  const {Search} = Input;
  const {
    dataSource,
    columns,
    rowSelection,
    isAdd,
    onAddFile,
    onAddOrder,
    resetAdd,
    addingFile,
    setAddingFile
  } = useCustomIntake();

  // eslint-disable-next-line no-console
  const onSearch = (value) => console.log(value);
  return (
    <div className="container-table pt-16">
      <Table
        scroll={{x: 2500, y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 3
        }}
      />
      {isAdd && (
        <>
          <Modal
            id="modal-add-orders-intake"
            className="modal-add-intake"
            title="Nueva Prenda"
            visible={isAdd}
            okText="AÑADIR"
            onCancel={() => {
              resetAdd();
            }}
            onOk={() => {
              onAddOrder();
            }}
          >
            <Form id="modalAdd" className="w-full">
              <div className="flex flex-col justify-around">
                <Form.Item className="item-form" label="Colaboradores">
                  <Search
                    className="input-add"
                    placeholder="Colaboradores"
                    onSearch={onSearch}
                    value={addingFile?.colaborador}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, colaborador: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Descripcion">
                  <Search
                    className="input-add"
                    placeholder="Descripcion"
                    onSearch={onSearch}
                    value={addingFile?.description}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, description: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </>
      )}
      <label htmlFor="file" className="py-8">
        <img src={btnCarga} alt="download" width="230px" height="70px" />
        <input style={{visibility: 'hidden'}} id="file" type="file" accept=".xlsx" />
      </label>
      <div className="flex justify-end items-end flex-col -mt-10">
        <Button onClick={onAddFile} className="rounded-lg my-1 mr-2">
          <img src={btnNew} alt="new" width="220px" height="50px" />
        </Button>
        <CSVLink filename={'TableOrderIntake.xlsx'} data={dataSource} className="pt-2">
          <img
            className="btn-download"
            src={btnDownload}
            alt="btnDownload"
            width="290px"
            height="40px"
          />
        </CSVLink>
      </div>
    </div>
  );
};

export default TableIntake;
