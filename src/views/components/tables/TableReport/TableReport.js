import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import Button from 'views/components/button/Button';
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
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
      />
      <div className="flex items-end">
        {' '}
        <Button
          onClick={() => {
            handleExport(dataSource, 'REPORTERIA');
          }}
          variant="primary"
          className="rounded-md p-2 btn-report"
        >
          <span>Generar reporte</span>
        </Button>
      </div>
    </div>
  );
};

export default TableReport;
