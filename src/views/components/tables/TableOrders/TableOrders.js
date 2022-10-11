import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
import btnCarga from '../../../../assets/img/btn-carga.svg';
import btnDownload from '../../../../assets/img/btn-generate.png';
import {useUtils} from '../../../../hooks';
import {useCustomOrders} from './hooks';
import './style-orders.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableOrders = () => {
  const {form, EditableCell, mergedColumns, dataSource, inputFileRef, handleInputFile, loading} =
    useCustomOrders();

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
          loading={loading}
          pagination={{
            pageSizeOptions: [10, 20, 30, 40],
            showSizeChanger: true,
            total: currentLength
          }}
          onChange={onChange}
        />
      </Form>
      <label htmlFor="file" className="py-8">
        <img src={btnCarga} alt="download" width="230px" height="70px" />
        <input
          style={{visibility: 'hidden'}}
          id="file"
          type="file"
          accept=".json"
          ref={inputFileRef}
          onChange={handleInputFile}
        />
      </label>
      <div className="flex justify-end items-end flex-col -mt-12">
        <div
          onClick={() => {
            handleExport(dataSource, 'ACTUALIZACIÓN DE TALLAS');
          }}
        >
          <img
            className="btn-download"
            src={btnDownload}
            alt="btnDownload"
            width="250px"
            height="40px"
          />
        </div>
      </div>
    </div>
  );
};

export default TableOrders;
