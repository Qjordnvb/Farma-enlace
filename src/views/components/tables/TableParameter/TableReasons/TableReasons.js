import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Select, Switch, Table} from 'antd';
import './style-reasons.css';
import Button from 'views/components/button/Button';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import {useCustomReasons} from './hooks';
import useCalcSize from '../../../../../hooks/useCalcSize';

function TableReasons() {
  const {
    dataSource,
    isAdd,
    addingFile,
    setAddingFile,
    resetAdd,
    onAddFile,
    onCreateReason,
    loading,
    EditableCell,
    mergedColumns,
    form
  } = useCustomReasons();
  const {Option} = Select;

  const cal = [
    'Fecha de ingreso del colaborador',
    'Fecha de última reposición',
    'Reposición  anterior'
  ];

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  const {height: tableHeight} = useCalcSize();

  return (
    <>
      <Form form={form} component={false}>
        <Table
          pagination={{
            pageSizeOptions: [10, 20, 30, 40],
            showSizeChanger: true,
            total: currentLength
          }}
          onChange={onChange}
          columns={mergedColumns}
          dataSource={dataSource}
          rowClassName={(record) => (!record.active ? 'disabled-row editable-row' : 'editable-row')}
          rowKey={(record) => record.id}
          scroll={{y: tableHeight - 300, x: 1000}}
          loading={loading}
          components={{
            body: {
              cell: EditableCell
            }
          }}
        ></Table>

        {isAdd && (
          <>
            <Modal
              className="modal-add-reasons"
              title="Agregar Motivo"
              visible={isAdd}
              okText="Crear Motivo"
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
                        setAddingFile({...addingFile, replacement: record});
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
                      className="input-add"
                      placeholder="Días"
                      min="0"
                      value={addingFile?.replacementAuto}
                      onChange={(e) => {
                        const {value} = e.target;

                        const controlledValue = Math.max(0, Math.min(365, Number(value || 0)));

                        setAddingFile({...addingFile, replacementAuto: controlledValue});
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
                        setAddingFile({...addingFile, payment: record});
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className={`item-form w-1/5 ${
                      addingFile?.payment === 'NO' ? 'input-disabled' : ''
                    }`}
                    label="Cuotas"
                  >
                    <Input
                      type="number"
                      className="input-add"
                      value={addingFile?.dues}
                      placeholder="1 a 100"
                      min={0}
                      onChange={(e) => {
                        const {value} = e.target;
                        //const controlledValue = Math.max(0, Math.min(100, Number(value || 0)));

                        setAddingFile((pre) => {
                          return {...pre, dues: value};
                        });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className={`item-form w-32 ${
                      addingFile?.payment === 'NO' ? 'input-disabled' : ''
                    }`}
                    label="Descuento Personal"
                  >
                    <Input
                      type={'number'}
                      max={100}
                      value={addingFile?.personalDiscount}
                      className={'input-add'}
                      onChange={(e) => {
                        const controlledValue = Math.max(0, Math.min(100, Number(e.target.value)));
                        let newCompanyDiscount = 100 - controlledValue;

                        setAddingFile({
                          ...addingFile,
                          companyDiscount: newCompanyDiscount,
                          personalDiscount: controlledValue
                        });
                      }}
                      suffix={'%'}
                    />
                  </Form.Item>
                  <Form.Item className="item-form w-40" label="Descuento Farmaenlace">
                    <Input
                      type={'number'}
                      max={100}
                      value={addingFile?.companyDiscount}
                      className={'input-add'}
                      onChange={(e) => {
                        const controlledValue = Math.max(0, Math.min(100, Number(e.target.value)));
                        let newPersonalDiscount = 100 - controlledValue;
                        if (addingFile.payment === 'SI') {
                          setAddingFile({
                            ...addingFile,
                            companyDiscount: controlledValue,
                            personalDiscount: newPersonalDiscount
                          });
                        } else {
                          setAddingFile({
                            ...addingFile,
                            companyDiscount: controlledValue
                          });
                        }
                      }}
                      suffix={'%'}
                    />
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </>
        )}
      </Form>
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
