import React from 'react';
import {Form, Table} from 'antd';
import './style.css';
import {CSVLink} from 'react-csv';
import btnDownload from '../../../../../assets/img/btn-download.png';
import btnSave from '../../../../../assets/img/btn-save.png';
import {useCustomDescription} from './hooks';

const TableDescription = () => {
  const {form, EditableCell, data, mergedColumns, cancel} = useCustomDescription();
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
            onChange: cancel
          }}
          scroll={{y: 500}}
        />
        <div className="flex justify-end">
          <img src={btnSave} className="btn-save" alt="btnDownload" />
          <CSVLink filename={'TableContent.csv'} data={data} className="btn-download">
            <img className="btn-download" src={btnDownload} alt="btnDownload" />
          </CSVLink>
        </div>
      </>
    </Form>
  );
};

export default TableDescription;
