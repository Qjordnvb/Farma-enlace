// Package
import React from 'react';
import {Table, Modal, Form, Input, Select} from 'antd';
// Components
//import Button from 'views/components/button/Button';
// Assets
import btnCarga from '../../../../assets/img/btn-carga.svg';
import btnDownload from '../../../../assets/img/btn-download.png';
//import btnNew from '../../../../assets/img/btn-new.svg';
// Hooks
import {useCustomOrders} from './hooks';
// Styles
import './style-orders.css';
import '../TableParameter/TableReasons/style-reasons.css';

const {Option} = Select;
const TableOrders = () => {
  const {
    columns,
    /*isAdd,
    addingFile,
    resetAdd,
    onAddFile,*/
    dataSource,
    /*setAddingFile,
    sucursales,
    distribuciones,
    tallas,
    options,*/
    isEditing,
    editingFile,
    setEditingFile,
    resetEditing,
    handleInputFile,
    inputFileRef,
    onSizeUpdate,
    tallas
  } = useCustomOrders();
  return (
    <div className="container-table pt-16">
      <Table
        pagination={{
          pageSize: 6
        }}
        columns={columns}
        dataSource={dataSource}
      />
      {isEditing && (
        <>
          <Modal
            id="modalEditOrders"
            className="modalEdit-garments"
            title="Editar"
            visible={isEditing}
            okText="Guardar"
            onCancel={() => {
              resetEditing();
            }}
            // Espera el retorno del endpoit para editar la información
            // onOk={() => {
            //   onEditGarment().then(() => {
            //     resetEditing();
            //   });
            // }}
            onOk={() => {
              onSizeUpdate();
              resetEditing();
            }}
          >
            <Form>
              <Form.Item className="item-form" label="Cédula">
                <Input className="input-add" value={editingFile?.CEDULA} disabled />
              </Form.Item>
              <Form.Item className="item-form" label="Talla">
                <Select
                  defaultValue={'M'}
                  value={editingFile?.TALLA}
                  onChange={(value) => {
                    setEditingFile({...editingFile, TALLA: value});
                  }}
                >
                  {tallas.map((suc, index) => {
                    return (
                      <Option key={index} value={suc}>
                        {suc}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}

      <label for="file" className="py-8">
        <img src={btnCarga} alt="download" width="274px" height="70px" />
        <input
          style={{visibility: 'hidden'}}
          ref={inputFileRef}
          onChange={handleInputFile}
          id="file"
          type="file"
          accept=".csv"
        />
      </label>
      <div className="flex justify-end items-end flex-col -mt-10">
        {/*<Button onClick={onAddFile} className="rounded-lg my-1 mr-3">
          <img src={btnNew} alt="new" width="274px" height="50px" />
        </Button>*/}
        <button className=" mt-3">
          <img className="ml-16" src={btnDownload} alt="charge" width="294px" height="50px" />
        </button>
      </div>
    </div>
  );
};
export default TableOrders;
