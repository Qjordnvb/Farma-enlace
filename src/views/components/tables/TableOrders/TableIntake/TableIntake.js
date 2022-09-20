import React, {useEffect, useState} from 'react';
import {Table, Form, Modal, Select, DatePicker} from 'antd';
import moment from 'moment';
import Button from 'views/components/button/Button';
import btnNew from '../../../../../assets/img/btn-new.svg';
import {useCustomIntake} from './hooks';
import './style.css';
import '../../TableParameter/TableReasons/style-reasons.css';

const {RangePicker} = DatePicker;
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
    employeesList,
    productsList,
    createConsumptionOrders,
    onDatePickerChange,
    dateRange
  } = useCustomIntake();

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  // eslint-disable-next-line no-console
  return (
    <div className="container-table pt-16">
      <Table
        scroll={{x: 2500, y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
        rowKey={(record) => record.id}
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
                  <Select
                    placeholder={'Colaboradores'}
                    value={addingFile?.colaborador}
                    onChange={(e) => {
                      setAddingFile({
                        ...addingFile,
                        colaborador: e
                      });
                    }}
                    className="input-add"
                    showSearch
                    filterOption={(input, option) => {
                      return option.children.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {employeesList.map((employee) => {
                      return (
                        <Select.Option key={employee.id} value={employee.CEDULA}>
                          {employee.COLABORADOR}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item className="item-form" label="Descripcion">
                  <Select
                    placeholder={'Descripcion'}
                    value={addingFile?.descripcion}
                    onChange={(e) => {
                      setAddingFile({
                        ...addingFile,
                        descripcion: e
                      });
                    }}
                    className="input-add"
                    showSearch
                    filterOption={(input, option) => {
                      return option.children.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {productsList.map((product) => {
                      return (
                        <Select.Option key={product.id} value={product.id}>
                          {product.descripcion}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </>
      )}
      <div className="flex justify-end items-end flex-col">
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')]
          }}
          showTime
          format="YYYY/MM/DD"
          onChange={onDatePickerChange}
          value={[dateRange.from, dateRange.to]}
        />
        <Button onClick={onAddFile} className="rounded-lg my-1 mr-2">
          <img src={btnNew} alt="new" width="220px" height="50px" />
        </Button>
        <Button onClick={createConsumptionOrders} className="rounded-lg my-5 mr-2 p-4">
          Generar orden de consumo
        </Button>
      </div>
    </div>
  );
};

export default TableIntake;
