import React from 'react';
import {Table, Form, Input, Select, Modal} from 'antd';

import Button from 'views/components/button/Button';
import btnCarga from '../../../../../assets/img/btn-carga.svg';
import btnNew from '../../../../../assets/img/btn-new.svg';
import btnDownload from '../../../../../assets/img/btn-order.svg';

import {useCustomIntake} from './hooks';
import './style.css';
import '../../TableParameter/TableReasons/style-reasons.css';
const {Option} = Select;
const TableIntake = () => {
  const {
    dataSource,
    columns,
    rowSelection,
    isAdd,
    onAddFile,
    setDataSource,
    resetAdd,
    addingFile,
    setAddingFile,
    options,
    sucursales,
    tallas,
    distribuciones
  } = useCustomIntake();
  return (
    <div className="container-table pt-16">
      <Table
        scroll={{x: 2500, y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 1
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
                  <Input
                    className="input-add"
                    value={addingFile?.cargo}
                    onChange={(e) => {
                      setAddingFile({...addingFile, cargo: e.target.value});
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
                <Form.Item className="item-form" label="Código oficina ">
                  <Input
                    className="input-add"
                    placeholder="Código oficina"
                    value={options?.idOfi}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, idOfi: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-around">
                <Form.Item className="item-form" label="Nombre de la oficina">
                  <Input
                    className="input-add"
                    placeholder="Nombre de la oficina"
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
                <Form.Item className="item-form" label="Descripcion">
                  <Input
                    className="input-add"
                    placeholder="Descripcion"
                    value={options?.description}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, description: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Fecha de solicitud">
                  <Input
                    type={'date'}
                    className="input-add"
                    placeholder="DD / MM /AAAA"
                    value={addingFile?.fechaSolicitud}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, fechaSolicitud: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Motivo">
                  <Input
                    className="input-add"
                    placeholder="00000000000"
                    value={addingFile?.motivo}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, motivo: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-around w-10/12">
                <Form.Item className="item-form" label="Tiempo desde la última reposición">
                  <Input
                    className="input-add"
                    placeholder="10 meses"
                    value={addingFile?.ultimaReposicion}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, ultimaReposicion: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Estado de la solicitud">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.estadoSolicitud}
                    onChange={(value) => {
                      setAddingFile({...addingFile, estadoSolicitud: value});
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
                <Form.Item className="item-form" label="Fecha orden de consumo">
                  <Input
                    type={'date'}
                    className="input-add"
                    placeholder="DD / MM /AAAA"
                    value={addingFile?.fechaOC}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, fechaOC: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="N° Orden de consumo">
                  <Input
                    className="input-add"
                    placeholder="10 meses"
                    value={addingFile?.numeroOC}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, numeroOC: e.target.value};
                      });
                    }}
                  />
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

export default TableIntake;
