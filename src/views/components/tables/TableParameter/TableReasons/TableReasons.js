import React from 'react';
import {Table, Modal, Input, Form, Switch, Select} from 'antd';
import './style.css';
import Button from 'views/components/button/Button';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import {useCustomReasons} from './hooks';

function TableReasons() {
  const {
    dataSource,
    columns,
    isAdd,
    addingFile,
    setAddingFile,
    resetAdd,
    onAddFile,
    onCreateReason
  } = useCustomReasons();
  const {Option} = Select;

  const percentage = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%'];
  const cal = ['Fecha de ingreso del colaborador', 'Fecha de última reposición'];

  return (
    <>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 10
          }}
          columns={columns}
          dataSource={dataSource}
          rowClassName={(record) => record.replacement === 'NO' && 'disabled-row'}
          rowKey={(record) => record.id}
          scroll={{y: 500}}
        ></Table>

        {isAdd && (
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
                onCreateReason().then(() => {
                  resetAdd();
                });
              }}
            >
              <Form id="modalAdd" className="w-full flex flex-col justify-around items-center">
                <div className="flex w-full">
                  <Form.Item className="item-form w-full" label="Motivo">
                    <Input
                      className="input-add"
                      placeholder="Motivo"
                      value={addingFile?.reason}
                      onChange={(e) => {
                        setAddingFile({...addingFile, reason: e.target.value});
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="flex items-center justify-around w-full">
                  <Form.Item className="item-form" label="Reposición automática">
                    <Switch
                      className="input-switch"
                      value={addingFile?.replacement}
                      onChange={(record) => {
                        setAddingFile({...addingFile, replacement: !record ? 'NO' : 'SI'});
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className={`item-form-custom ${
                      addingFile?.replacement === 'NO' ? 'input-disabled' : ''
                    }`}
                    label="Reposición cantidad"
                  >
                    <Input
                      type="number"
                      id="item-form-w"
                      className="input-add "
                      placeholder="Días"
                      value={addingFile?.replacementAuto}
                      onChange={(e) => {
                        setAddingFile((pre) => {
                          return {...pre, replacementAuto: e.target.value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className={`item-form ${
                      addingFile?.replacement === 'NO' ? 'input-disabled' : ''
                    }`}
                    label="Cálculo desde"
                  >
                    <Select
                      defaultValue={'Fecha de ingreso del colaborador'}
                      value={addingFile?.calculation}
                      onChange={(value) => {
                        setAddingFile({...addingFile, calculation: value});
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
                <div className="flex items-center justify-around w-full">
                  <Form.Item className="item-form" label="Cobro">
                    <Switch
                      className="input-switch"
                      value={addingFile?.payment}
                      onChange={(record) => {
                        setAddingFile({...addingFile, payment: !record ? 'NO' : 'SI'});
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className={`item-form ${addingFile?.payment === 'NO' ? 'input-disabled' : ''}`}
                    label="Cuotas"
                  >
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
                  <Form.Item
                    className={`item-form ${addingFile?.payment === 'NO' ? 'input-disabled' : ''}`}
                    label="Descuento Personal"
                  >
                    <Select
                      defaultValue="0%"
                      value={addingFile?.personalDiscount}
                      onChange={(value) => {
                        setAddingFile({...addingFile, personalDiscount: value});
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
                      defaultValue="0%"
                      value={addingFile?.companyDiscount}
                      onChange={(value) => {
                        setAddingFile({...addingFile, companyDiscount: value});
                      }}
                    >
                      {percentage.map((percent, index) => {
                        return (
                          <Option key={index} value={percent}>
                            {percent}
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
