import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';

import btnDownload from '../../../../assets/img/btn-generate.png';
import {useUtils} from '../../../../hooks';
import {useCustomInventory} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableInventory = () => {
  const {form, EditableCell, mergedColumns, data, rowSelection} = useCustomInventory();
  const {handleExport} = useUtils();

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(data.length);
  }, [data]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

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
            pageSizeOptions: [10, 20, 30, 40],
            showSizeChanger: true,
            total: currentLength
          }}
          onChange={onChange}
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
        />
      </Form>
      <div className="flex justify-end items-end flex-col">
        <img
          className="btn-download"
          src={btnDownload}
          alt="btnDownload"
          width="250px"
          height="40px"
          onClick={() => {
            handleExport(data, 'INVENTARIO');
          }}
        />
      </div>
    </div>
  );
};

export default TableInventory;
