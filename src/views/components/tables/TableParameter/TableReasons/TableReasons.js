import React from 'react';
import {Table, Modal, Input, Form, Switch, Select} from 'antd';
import './style.css';
import Button from 'views/components/button/Button';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import {useCustomReasons} from './hooks';

function TableReasons() {
  const {
    dataSource,
    setDataSource,
    setEditingFile,
    isEditing,
    editingFile,
    columns,
    isAdd,
    addingFile,
    setAddingFile,
    resetEditing,
    resetAdd,
    onAddFile
  } = useCustomReasons();
  const [options, setOptions] = React.useState([]);
  const {Option} = Select;

  const percentage = ['10%', '20%', '30%', '40%', '50%', '60%', '70%'];
  const cal = [' Fecha de ingreso del colaborador', 'Fecha de última reposición'];

  return (
    <>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 5
          }}
          columns={columns}
          dataSource={dataSource}
        ></Table>
        <>
          <Modal
            title="Editar"
            visible={isEditing}
            okText="Guardar"
            onCancel={() => {
              resetEditing();
            }}
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
              <Form.Item className="item-form" label="Motivo">
                <Input
                  className="input-add"
                  value={editingFile?.reason}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, reason: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Reposición automática">
                <Input
                  className="input-add"
                  value={editingFile?.replacement}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, replacement: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Reposición">
                <Input
                  className="input-add"
                  value={editingFile?.replacementManual}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, replacementManual: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cobro">
                <Input
                  className="input-add"
                  value={editingFile?.payment}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, payment: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cuotas">
                <Input
                  className="input-add"
                  value={editingFile?.dues}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, dues: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cálculo">
                <Input
                  className="input-add"
                  value={editingFile?.calculation}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, calculation: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Descuento Personal">
                <Input
                  className="input-add"
                  value={editingFile?.discountPersonal}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, discountPersonal: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Descuento Farmaenlace">
                <Input
                  className="input-add"
                  value={editingFile?.discountCompany}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, discountCompany: e.target.value};
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>

        <>
          <Modal
            className="modal-add-reasons"
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
            <Form id="modalAdd" className="w-full">
              <div className="flex">
                <Form.Item className="item-form" label="Motivo">
                  <Input
                    className="input-add"
                    placeholder="Motivo"
                    value={addingFile?.reason}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, reason: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Reposición automática">
                  <Switch
                    checkedChildren={<p>SI</p>}
                    unCheckedChildren={<p>NO</p>}
                    className="input-switch"
                    checked={addingFile?.replacement}
                    onChange={() => {
                      setAddingFile((pre) => {
                        return {...pre, replacement: 'SI'};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Reposición cantidad">
                  <Input
                    type="number"
                    className="input-add"
                    placeholder="Días"
                    value={addingFile?.replacementManual}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, replacementManual: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Cálculo desde">
                  <Select
                    defaultValue={'Fecha de ingreso del colaborador'}
                    value={options?.calculation}
                    onChange={() => {
                      // console.log(e);
                      setAddingFile((pre) => {
                        return {...pre, calculation: setOptions.calculation};
                      });
                    }}
                  >
                    {cal.map((cals, index) => {
                      return (
                        <Option key={index} value={cals}>
                          {cals}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className="flex items-center justify-around">
                <Form.Item className="item-form" label="Cobro">
                  <Switch
                    checkedChildren={<p>SI</p>}
                    unCheckedChildren={<p>NO</p>}
                    className="input-switch"
                    checked={addingFile?.payment}
                    onChange={() => {
                      setAddingFile((pre) => {
                        return {...pre, payment: 'SI'};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Cuotas">
                  <Input
                    className="input-add"
                    value={addingFile?.dues}
                    placeholder="1 a 100"
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, dues: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Descuento Personal">
                  <Select
                    defaultValue="5%"
                    value={options?.discountPersonal}
                    onChange={() => {
                      // console.log(e);
                      setAddingFile((pre) => {
                        return {...pre, discountPersonal: setOptions.discountPersonal};
                      });
                    }}
                  >
                    {percentage.map((percen, index) => {
                      return (
                        <Option key={index} value={percen}>
                          {percen}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item className="item-form" label="Descuento Farmaenlace">
                  <Select
                    defaultValue="5%"
                    value={options?.discountCompany}
                    onChange={() => {
                      // console.log(e);
                      setAddingFile((pre) => {
                        return {...pre, discountCompany: setOptions.discountCompany};
                      });
                    }}
                  >
                    {percentage.map((percen, index) => {
                      return (
                        <Option key={index} value={percen}>
                          {percen}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </>
      </div>
      <StyledGridList>
        <div className="btn-add">
          <Button
            onClick={onAddFile}
            className="py-2.5 px-8 rounded-lg my-4"
            width="224px"
            label="Crear"
            variant="primary"
          />
        </div>
      </StyledGridList>
    </>
  );
}

export default TableReasons;
