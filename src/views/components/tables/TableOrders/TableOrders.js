import React from 'react';
import {Form, Table} from 'antd';
import {CSVLink} from 'react-csv';
import btnDownload from '../../../../assets/img/btn-generate.png';

import {useCustomOrders} from './hooks';
import './style-orders.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableOrders = () => {
  const {form, EditableCell, mergedColumns, dataSource, cancel, rowSelection} = useCustomOrders();

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
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 3,
            onChange: cancel
          }}
          rowSelection={rowSelection}
        />
      </Form>
      <div className="flex justify-end items-end flex-col">
        <CSVLink filename={'TableOrders.xlsx'} data={dataSource} className="pt-2">
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

export default TableOrders;
