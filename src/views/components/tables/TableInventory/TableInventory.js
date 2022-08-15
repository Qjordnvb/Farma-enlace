import React from 'react';
import {Form, Table, Modal, Input} from 'antd';

import Button from 'views/components/button/Button';
import btnDownload from '../../../../assets/img/btn-generate.png';
import btnNew from '../../../../assets/img/btn-new.svg';
import {useCustomInventory} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableInventory = () => {
  const {
    form,
    EditableCell,
    mergedColumns,
    dataSource,
    cancel,
    rowSelection,
    isAdd,
    addingFile,
    setDataSource,
    onAddFile,
    resetAdd,
    setAddingFile
  } = useCustomInventory();
  return (
    <div className="container-table pt-16">
      <Form form={form} component={false}>
        <Table
          scroll={{y: 300}}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 1,
            onChange: cancel
          }}
          rowSelection={rowSelection}
        />
        {isAdd && (
          <>
            <Modal
              id="modal-add-orders-buy"
              className="modal-add-buy"
              title="Nueva Prenda"
              visible={isAdd}
              okText="AÑADIR"
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
              <Form id="modalAdd" className="w-full">
                <div className="flex justify-around">
                  <Form.Item className="item-form" label="Descripción">
                    <Input
                      className="input-add"
                      placeholder="Descripción "
                      value={addingFile?.description}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, description: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Prendas ">
                    <Input
                      className="input-add"
                      placeholder="Prendas "
                      value={addingFile?.prendas}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, prendas: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Talla">
                    <Input
                      className="input-add"
                      placeholder="Talla"
                      value={addingFile?.talla}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, talla: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Marca">
                    <Input
                      className="input-add"
                      placeholder="Marca"
                      value={addingFile?.marca}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, marca: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Stock">
                    <Input
                      className="input-add"
                      placeholder="Stock"
                      value={addingFile?.stock}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, stock: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-around">
                  <Form.Item className="item-form" label="Cantidad sugerida">
                    <Input
                      className="input-add"
                      placeholder="Cantidad"
                      value={addingFile?.cantidad}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, cantidad: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Stock mínimo">
                    <Input
                      className="input-add"
                      placeholder="Stock mínimo"
                      value={addingFile?.stockMin}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, stockMin: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Stock máximo">
                    <Input
                      className="input-add"
                      placeholder="Stock máximo"
                      value={addingFile?.stockMax}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, stockMax: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item className="item-form" label="Cantidad a comprar">
                    <Input
                      className="input-add"
                      placeholder="Cantidad a comprar"
                      value={addingFile?.cantidadCompra}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, cantidadCompra: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </>
        )}
      </Form>
      <div className="flex justify-end items-end flex-col">
        <Button onClick={onAddFile} className="rounded-lg my-1 mr-3">
          <img src={btnNew} alt="new" width="274px" height="50px" />
        </Button>
        <button className=" mt-3">
          <img className="ml-16" src={btnDownload} alt="charge" width="294px" height="50px" />
        </button>
      </div>
    </div>
  );
};

export default TableInventory;
