import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
import './style.css';
//import btnDownload from '../../../../../assets/img/btn-download.png';
import {useUtils} from '../../../../../hooks';
import {useCustomDescription} from './hooks';
import useCalcSize from '../../../../../hooks/useCalcSize';
import {ReactComponent as SpreadsheetIcon} from '../../../../../assets/spreadsheet.svg';
import {ReactComponent as ArrowDown} from '../../../../../assets/arrow-down.svg';
const TableDescription = () => {
  const {form, EditableCell, data, mergedColumns, cancel, loading, excelColumns, garmentColumns} =
    useCustomDescription();
  const {handleExport} = useUtils();
  const [currentLength, setCurrentLength] = useState(0);

  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    setCurrentLength(data.length);
  }, [data]);

  useEffect(() => {
    let formattedData = data.map((product) => {
      let formatGarments = garmentColumns.reduce((curr, garment) => {
        curr[garment.title] = product[garment?.dataIndex] ? product[garment?.dataIndex] : 0;
        return curr;
      }, {});

      return {
        'Código Producto': product.codigo,
        Descripción: product.descripcion,
        ...formatGarments,
        Marca: product.marca,
        Región: product.region
      };
    });
    setExcelData(formattedData);
  }, [data, excelColumns]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  const {height: tableHeight} = useCalcSize();

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
          scroll={{y: tableHeight - 230, x: 1500}}
          loading={loading}
        />
        <div className="flex justify-end">
          <div
            className="button-generate "

            onClick={() => {
              handleExport(excelData, 'DESCRIPCIÓN UNIFORMES');
            }}
          >
            {/*<img src={btnSave} className="btn-save" alt="btnDownload" />*/}

            <div>
              <SpreadsheetIcon />
              <ArrowDown />
            </div>
            <h3 className={'text-neutral-50 font-bold mb-0'}>Generar</h3>
          </div>
        </div>

      </>
    </Form>
  );
};

export default TableDescription;
