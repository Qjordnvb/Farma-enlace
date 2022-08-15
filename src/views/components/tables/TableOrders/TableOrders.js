// Package
import React from 'react';
import {Table, Modal, Select, Form, Input} from 'antd';
// Components
import Button from 'views/components/button/Button';
// Assets
import btnCarga from '../../../../assets/img/btn-carga.svg';
import btnDownload from '../../../../assets/img/btn-download.png';
import btnNew from '../../../../assets/img/btn-new.svg';
// Hooks
import {useCustomOrders} from './hooks';
// Styles
import './style-orders.css';
import '../TableParameter/TableReasons/style-reasons.css';

const {Option} = Select;
const TableOrders = () => {
  const {
    columns,
    isAdd,
    addingFile,
    resetAdd,
    onAddFile,
    dataSource,
    setDataSource,
    setAddingFile,
    sucursales,
    distribuciones,
    tallas,
    options,
    isEditing,
    editingFile,
    setEditingFile,
    resetEditing
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
              <Form.Item className="item-form" label="N°">
                <Input
                  className="input-add"
                  value={editingFile?.n}
                  onChange={(e) => {
                    setEditingFile({...editingFile, n: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cédula">
                <Input
                  className="input-add"
                  value={editingFile?.id}
                  onChange={(e) => {
                    setEditingFile({...editingFile, id: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Colaborador">
                <Input
                  className="input-add"
                  value={editingFile?.colaborador}
                  onChange={(e) => {
                    setEditingFile({...editingFile, colaborador: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cargo">
                <Input
                  className="input-add"
                  value={editingFile?.cargo}
                  onChange={(e) => {
                    setEditingFile({...editingFile, cargo: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Género">
                <Input
                  className="input-add"
                  value={editingFile?.genero}
                  onChange={(e) => {
                    setEditingFile({...editingFile, genero: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Sucursal">
                <Input
                  className="input-add"
                  value={editingFile?.sucursal}
                  onChange={(e) => {
                    setEditingFile({...editingFile, sucursal: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Región">
                <Input
                  className="input-add"
                  value={editingFile?.region}
                  onChange={(e) => {
                    setEditingFile({...editingFile, region: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Fecha de ingreso">
                <Input
                  className="input-add"
                  value={editingFile?.fechaIngreso}
                  onChange={(e) => {
                    setEditingFile({...editingFile, fechaIngreso: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Distribución Administrativa">
                <Input
                  className="input-add"
                  value={editingFile?.distribution}
                  onChange={(e) => {
                    setEditingFile({...editingFile, distribution: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Número oficina">
                <Input
                  className="input-add"
                  value={editingFile?.numberOfi}
                  onChange={(e) => {
                    setEditingFile({...editingFile, numberOfi: e.target.value});
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Nombre de la oficina">
                <Input
                  className="input-add"
                  value={editingFile?.nameOfi}
                  onChange={(e) => {
                    setEditingFile({...editingFile, nameOfi: e.target.value});
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
            className="modal-add-orders"
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
                <Form.Item className="item-form" label="CI">
                  <Input
                    className="input-add"
                    placeholder="CI"
                    value={addingFile?.id}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, id: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Colaborador">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.colaborador}
                    onChange={(value) => {
                      setAddingFile({...addingFile, colaborador: value});
                    }}
                  >
                    {sucursales.map((suc, index) => {
                      return (
                        <Option key={index} value={suc}>
                          {suc}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item className="item-form" label="Cargo">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.cargo}
                    onChange={(value) => {
                      setAddingFile({...addingFile, cargo: value});
                    }}
                  >
                    {sucursales.map((suc, index) => {
                      return (
                        <Option key={index} value={suc}>
                          {suc}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item className="item-form" label="Género">
                  <Input
                    className="input-add"
                    placeholder="F / M"
                    value={addingFile?.genero}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, genero: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-around">
                <Form.Item className="item-form" label="Sucursal">
                  <Select
                    defaultValue={'Ubicación...'}
                    value={options?.sucursal}
                    onChange={(value) => {
                      setAddingFile({...addingFile, sucursal: value});
                    }}
                  >
                    {sucursales.map((suc, index) => {
                      return (
                        <Option key={index} value={suc}>
                          {suc}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item className="item-form" label="Región">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.region}
                    onChange={(value) => {
                      setAddingFile({...addingFile, region: value});
                    }}
                  >
                    {sucursales.map((suc, index) => {
                      return (
                        <Option key={index} value={suc}>
                          {suc}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item className="item-form" label="Fecha de ingreso">
                  <Input
                    type={'date'}
                    className="input-add"
                    placeholder="DD / MM /AAAA"
                    value={addingFile?.fechaIngreso}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, fechaIngreso: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Distribución administrativa">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.distribution}
                    onChange={(value) => {
                      setAddingFile({...addingFile, distribution: value});
                    }}
                  >
                    {distribuciones.map((suc, index) => {
                      return (
                        <Option key={index} value={suc}>
                          {suc}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex justify-around w-3/4">
                <Form.Item className="item-form" label="Número oficina">
                  <Input
                    className="input-add"
                    placeholder="00000000000"
                    value={addingFile?.numberOfi}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, numberOfi: e.target.value};
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item className="item-form" label="Nombre de oficina">
                  <Input
                    className="input-add"
                    placeholder="Nombre de oficina"
                    value={addingFile?.nameOfi}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, nameOfi: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Talla">
                  <Select
                    defaultValue={'M'}
                    value={options?.talla}
                    onChange={(value) => {
                      setAddingFile({...addingFile, talla: value});
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
              </div>
            </Form>
          </Modal>
        </>
      )}

      <label for="file" className="py-8">
        <img src={btnCarga} alt="download" width="274px" height="70px" />
        <input style={{visibility: 'hidden'}} id="file" type="file" accept=".xlsx" />
      </label>
      <div className="flex justify-end items-end flex-col -mt-10">
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
export default TableOrders;
