import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import btnDownload from '../../../../assets/img/btn-discount.png';
import {useUtils} from '../../../../hooks';
import {useCustomDiscount} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableDiscount = () => {
  const {columns, rowSelection, dataSource} = useCustomDiscount();
  const {handleExport} = useUtils();
  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };
  return (
    <div className="container-table pt-16">
      <Table
        scroll={{y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
        rowKey={(record) => record.id}
      />

      <img
        className="btn-download"
        src={btnDownload}
        alt="btnDownload"
        width="250px"
        height="40px"
        onClick={() => {
          handleExport(dataSource, 'DESCUENTO');
        }}
      />
    </div>
  );
};

export default TableDiscount;
