import React from 'react';
import {Table} from 'antd';
import {CSVLink} from 'react-csv';
import btnDownload from '../../../../assets/img/btn-download.png';
import {useCustomUniforms} from './hooks';

import './style-parameters.css';

const TableParameter = () => {
  const {dataSource, columns} = useCustomUniforms();
  return (
    <>
      <Table
        pagination={{
          pageSize: 6
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <div className="flex justify-end">
        <CSVLink filename={'TableContent.csv'} data={dataSource} className="btn-download">
          <img className="btn-download" src={btnDownload} alt="btnDownload" />
        </CSVLink>
      </div>
    </>
  );
};

export default TableParameter;
