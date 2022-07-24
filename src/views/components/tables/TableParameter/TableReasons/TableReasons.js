import React from 'react';
import {Table, Modal, Input, Form} from 'antd';
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
                  <Input
                    className="input-add"
                    value={addingFile?.replacement}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, replacement: e.target.value};
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
              </div>
              <div className="flex flex-wrap">
                <Form.Item className="item-form" label="Cálculo desde">
                  <Input
                    className="input-add"
                    placeholder="Cálculo desde"
                    value={addingFile?.calculation}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, calculation: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Cobro">
                  <Input
                    className="input-add"
                    value={addingFile?.payment}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, payment: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Cuotas">
                  <Input
                    type="number"
                    className="input-add"
                    placeholder="1 a 100"
                    value={addingFile?.dues}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, dues: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Descuento Personal">
                  <Input
                    className="input-add"
                    placeholder="0%"
                    value={addingFile?.discountPersonal}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, discountPersonal: e.target.value};
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Descuento Farmaenlace">
                  <Input
                    className="input-add"
                    placeholder="10%"
                    value={addingFile?.discountCompany}
                    onChange={(e) => {
                      setAddingFile((pre) => {
                        return {...pre, discountCompany: e.target.value};
                      });
                    }}
                  />
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
