import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
import {CSVLink} from 'react-csv';
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
  const exampleSheet = [
    {
      CEDULA: '0123456789',
      NOMBRES: 'Juan',
      APELLIDOS: 'Perez',
      'TALLA UNIFORME': 'M',
      'TALLA MANDIL': 'M'
    }
  ];

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
      <div className="container-buttons flex pt-6 pb-14 justify-between ">
        <div className="flex flex-col">
          <label htmlFor="file" className={'ml-2'}>
            <img src={btnCarga} alt="download" width="230px" height="70px" />
            <input
              style={{visibility: 'hidden'}}
              id="file"
              type="file"
              accept=".csv"
              ref={inputFileRef}
              onChange={handleInputFile}
            />
          </label>
          <div className="flex flex-col items-center justify-center bg-green-500 text-center h-12  rounded-lg">
            <CSVLink filename={'PlANTILLA - ACTUALIZACION DE TALLAS.csv'} data={exampleSheet}>
              <h3 className={'text-neutral-50 font-bold'}>DESCARGAR PLANTILLA</h3>
            </CSVLink>
          </div>
        </div>

        <div className="flex justify-end items-end flex-col">
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
    </div>
  );
};

export default TableOrders;
