import React from 'react';
import {Form, Table} from 'antd';
import {CSVLink} from 'react-csv';
import btnDownload from '../../../../assets/img/btn-generate.png';
import {useCustomInventory} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableInventory = () => {
  const {form, EditableCell, mergedColumns, data, cancel, rowSelection} = useCustomInventory();

  const headers = [
    {label: 'Descripcion', key: 'description'},
    {label: 'Prendas', key: 'prendas'},
    {label: 'Cantidad', key: 'cantidadCompra'}
  ];

  return (
    <div className="container-table pt-16">
      <Form form={form} component={false}>
        <Table
          scroll={{x: 2000, y: 300}}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 20,
            onChange: cancel,
            showSizeChanger: true
          }}
          rowSelection={rowSelection}
        />
      </Form>
      <div className="flex justify-end items-end flex-col">
        <CSVLink filename={'TableInventory.xlsx'} data={data} headers={headers} className="pt-2">
          <img
            className="btn-download"
            src={btnDownload}
            alt="btnDownload"
            width="250px"
            height="40px"
          />
        </CSVLink>
      </div>
    </div>
  );
};

export default TableInventory;
