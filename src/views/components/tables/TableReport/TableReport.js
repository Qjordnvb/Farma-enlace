import React from 'react';
import {Table} from 'antd';
import {CSVLink} from 'react-csv';
import btnDownload from '../../../../assets/img/btn-discount.png';
import {useCustomReport} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableReport = () => {
  const {columns, rowSelection, dataSource} = useCustomReport();
  return (
    <div className="container-table pt-16">
      <Table
        scroll={{x: 2000, y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [10, 20, 30, 40]
        }}
      />
      <CSVLink filename={'TableReport.xlsx'} data={dataSource} className="pt-2 flex justify-end">
        <img
          className="btn-download"
          src={btnDownload}
          alt="btnDownload"
          width="250px"
          height="40px"
        />
      </CSVLink>
    </div>
  );
};

export default TableReport;
