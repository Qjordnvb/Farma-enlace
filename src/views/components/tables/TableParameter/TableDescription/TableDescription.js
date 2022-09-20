import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
import './style.css';
import btnDownload from '../../../../../assets/img/btn-download.png';
import {useUtils} from '../../../../../hooks';
import {useCustomDescription} from './hooks';

const TableDescription = () => {
  const {form, EditableCell, data, mergedColumns, cancel} = useCustomDescription();
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
    <Form form={form} component={false}>
      <>
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSizeOptions: [10, 20, 30, 40],
            total: currentLength,
            showSizeChanger: true
          }}
          onChange={onChange}
          scroll={{y: 500, x: 2000}}
        />
        <div
          className="flex justify-end"
          onClick={() => {
            handleExport(data, 'DESCRIPCIÓN UNIFORMES');
          }}
        >
          {/*<img src={btnSave} className="btn-save" alt="btnDownload" />*/}

          <img className="btn-download" src={btnDownload} alt="btnDownload" />
        </div>
      </>
    </Form>
  );
};

export default TableDescription;
