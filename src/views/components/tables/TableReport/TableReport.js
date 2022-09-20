import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import btnDownload from '../../../../assets/img/btn-discount.png';
import {useUtils} from '../../../../hooks';
import {useCustomReport} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableReport = () => {
  const {columns, rowSelection, dataSource} = useCustomReport();
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
        scroll={{x: 2000, y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
      />
      <img
        className="btn-download"
        src={btnDownload}
        alt="btnDownload"
        width="250px"
        height="40px"
        onClick={() => {
          handleExport(dataSource, 'REPORTERIA');
        }}
      />
    </div>
  );
};

export default TableReport;
