import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
//import btnDownload from '../../../../assets/img/btn-download.png';
import {useUtils} from '../../../../hooks';
import {useCustomUniforms} from './hooks';
import './style-parameters.css';
import useCalcSize from '../../../../hooks/useCalcSize';
import {ReactComponent as SpreadsheetIcon} from '../../../../assets/spreadsheet.svg';
import {ReactComponent as ArrowDown} from '../../../../assets/arrow-down.svg';

const TableParameter = () => {
  const {dataSource, mergedColumns, loading, form, EditableCell} = useCustomUniforms();
  const {handleExport} = useUtils();
  const [currentLength, setCurrentLength] = useState(0);
  const [excelData, setExcelData] = useState([]);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);
  useEffect(() => {
    let formattedData = dataSource.map((product) => {
      return {
        Código: product.codigo,
        Marca: product.marca,
        Descripción: product.descripcion,
        Clase: product.clase,
        Talla: product.talla,
        Región: product.region,
        Género: product.genero,
        'Precio Uniforme': product.price,
        Estado: product.status
      };
    });
    setExcelData(formattedData);
  }, [dataSource]);

  const {height: tableHeight} = useCalcSize();

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  return (
    <Form form={form} component={false}>
      <Table
        pagination={{
          pageSizeOptions: [10, 20, 30, 40],
          total: currentLength,
          showSizeChanger: true
        }}
        scroll={{y: tableHeight - 210, x: 1300}}
        columns={mergedColumns}
        dataSource={dataSource}
        loading={loading}
        components={{
          body: {
            cell: EditableCell
          }
        }}
        onChange={onChange}
        rowClassName="editable-row"
      />
      <div
        className="flex justify-end"
        onClick={() => {
          handleExport(excelData, 'Productos');
        }}
      >
        <div
          className="button-generate"
        >
          {/*<img src={btnSave} className="btn-save" alt="btnDownload" />*/}

          <div>
            <SpreadsheetIcon />
            <ArrowDown />
          </div>
          <h3 className={'text-neutral-50 font-bold mb-0'}>Descargar</h3>
        </div>
      </div>
    </Form>
  );
};

export default TableParameter;
