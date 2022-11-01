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
  const [excelData, setExcelData] = useState([]);
  const {handleExport} = useUtils();
  const exampleSheet = [
    {
      CEDULA: '',
      NOMBRES: '',
      APELLIDOS: '',
      'TALLA UNIFORME': '',
      'TALLA MANDIL': ''
    }
  ];

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  useEffect(() => {
    let formattedData = dataSource.map((employee) => {
      return {
        Cédula: employee.CEDULA,
        Colaborador: employee.COLABORADOR,
        Cargo: employee.CARGO,
        Género: employee.SEXO,
        Sucursal: employee.NOMBRE_SUCURSAL,
        Región: employee.REGION,
        'Fecha de ingreso': employee.FECHA_INGRESO,
        'Distribución Administrativa': employee.NOMBRE_CENTRO_COSTOS,
        'Número oficina': employee.CODIGO_OFICINA,
        'Nombre de la oficina': employee.NOMBRE_OFICINA,
        'Talla uniforme': employee.TALLA,
        'Talla mandil': employee.TALLA_MANDIL
      };
    });
    setExcelData(formattedData);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  return (
    <div className="container-table pt-2">
      <Form form={form} component={false}>
        <Table
          scroll={{x: 2000, y: 400}}
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
      <div className="container-buttons flex pt-6 pb-14 justify-between cursor-pointer">
        <div className="flex flex-col">
          <label htmlFor="file">
            <img src={btnCarga} alt="download" width="230px" height="70px" />
            <input
              style={{visibility: 'hidden'}}
              id="file"
              type="file"
              accept=".xlsx, .xls"
              ref={inputFileRef}
              onChange={handleInputFile}
            />
          </label>
          <div
            className="button__add"
            onClick={() => {
              handleExport(exampleSheet, 'PLANTILLA - ACTUALIZACION');
            }}
          >
            <h3 className={'text-neutral-50 font-bold mb-0'}>DESCARGAR PLANTILLA</h3>
          </div>
        </div>

        <div className="flex justify-end items-end flex-col">
          <div
            onClick={() => {
              handleExport(excelData, 'ACTUALIZACIÓN DE TALLAS');
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
