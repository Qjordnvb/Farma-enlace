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
    onAddOrder,
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
          pageSize: 5
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
              <div className="flex justify-around">
                <Form.Item className="item-form" label="CI">
                  <Input
                    className="input-add"
                    placeholder="CI"
                    value={addingFile?.ci}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, ci: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Colaborador">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.collaborator}
                    onChange={(value) => {
                      setAddingFile({...addingFile, collaborator: value});
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
                    value={addingFile?.position}
                    onChange={(e) => {
                      setAddingFile({...addingFile, position: e.target.value});
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Distribución administrativa">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.administrativeDistribution}
                    onChange={(value) => {
                      setAddingFile({...addingFile, administrativeDistribution: value});
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
                    value={options?.officePosition}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, officePosition: e.target.value};
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
                    value={addingFile?.officeName}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, officeName: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Talla">
                  <Select
                    defaultValue={'M'}
                    value={options?.size}
                    onChange={(value) => {
                      setAddingFile({...addingFile, size: value});
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
                    value={addingFile?.requestData}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, requestData: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Motivo">
                  <Input
                    className="input-add"
                    placeholder="00000000000"
                    value={addingFile?.reason}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, reason: e.target.value};
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
                    value={addingFile?.timeSinceLastReplacement}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, timeSinceLastReplacement: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Estado de la solicitud">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.requestStatus}
                    onChange={(value) => {
                      setAddingFile({...addingFile, requestStatus: value});
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
                    value={addingFile?.dateConsumptionOrder}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, dateConsumptionOrder: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="N° Orden de consumo">
                  <Input
                    className="input-add"
                    placeholder="10 meses"
                    value={addingFile?.consumptionOrderNumber}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, consumptionOrderNumber: e.target.value};
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
                    value={options?.officePosition}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, officePosition: e.target.value};
=======
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
>>>>>>> master
                      });
                    }}
                  />
                </Form.Item>
<<<<<<< consumption-orders
              </div>
              <div className="flex justify-around">
                <Form.Item className="item-form" label="Nombre de la oficina">
                  <Input
                    className="input-add"
                    placeholder="Nombre de la oficina"
                    value={addingFile?.officeName}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, officeName: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Talla">
                  <Select
                    defaultValue={'M'}
                    value={options?.size}
                    onChange={(value) => {
                      setAddingFile({...addingFile, size: value});
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
=======
>>>>>>> master
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
<<<<<<< consumption-orders
                <Form.Item className="item-form" label="Fecha de solicitud">
                  <Input
                    type={'date'}
                    className="input-add"
                    placeholder="DD / MM /AAAA"
                    value={addingFile?.requestData}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, requestData: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Motivo">
                  <Input
                    className="input-add"
                    placeholder="00000000000"
                    value={addingFile?.reason}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, reason: e.target.value};
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
                    value={addingFile?.timeSinceLastReplacement}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, timeSinceLastReplacement: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Estado de la solicitud">
                  <Select
                    defaultValue={'Seleccionar...'}
                    value={options?.requestStatus}
                    onChange={(value) => {
                      setAddingFile({...addingFile, requestStatus: value});
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
                    value={addingFile?.dateConsumptionOrder}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, dateConsumptionOrder: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="N° Orden de consumo">
                  <Input
                    className="input-add"
                    placeholder="10 meses"
                    value={addingFile?.consumptionOrderNumber}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, consumptionOrderNumber: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
=======
>>>>>>> master
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
