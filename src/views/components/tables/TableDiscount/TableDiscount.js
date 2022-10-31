import React, {useEffect, useState} from 'react';
import {DatePicker, Table} from 'antd';
import btnDownload from '../../../../assets/img/btn-discount.png';
import {useUtils} from '../../../../hooks';
import {useCustomDiscount} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';
import moment from 'moment';
const {RangePicker} = DatePicker;

const TableDiscount = () => {
  const {columns, rowSelection, dataSource, loading, dateRange, onDatePickerChange} =
    useCustomDiscount();
  const {handleExport} = useUtils();
  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    console.log('dataSource', dataSource);
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };
  return (
    <div className="container-table pt-2">
      <div className="flex justify-end items-end flex-col">
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')]
          }}
          showTime
          format="YYYY/MM/DD"
          onChange={onDatePickerChange}
          value={[dateRange.from, dateRange.to]}
        />
      </div>
      <Table
        scroll={{x: 2000, y: 400}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
        rowKey={(record) => {
          return record.id;
        }}
        loading={loading}
      />
      <div className="ml-auto">
        <img
          className="ml-auto"
          src={btnDownload}
          alt="btnDownload"
          width="250px"
          height="40px"
          onClick={() => {
            let selectedData = [];
            if (rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length > 0) {
              rowSelection.selectedRowKeys.map((key) => {
                let findRow = dataSource.filter((value) => value.id === key);
                if (findRow && findRow.length > 0) {
                  selectedData.push(findRow[0]);
                }
              });
            } else {
              selectedData = dataSource;
            }

            selectedData = selectedData.map((row) => {
              const {
                COLABORADOR,
                CARGO,
                NOMBRE_CENTRO_COSTOS,
                CODIGO_CENTRO_COSTOS,
                CODIGO_OFICINA,
                NOMBRE_OFICINA,
                requestDate,
                dues,
                price,
                CEDULA
              } = row;
              return {
                'Código oficina': CODIGO_OFICINA,
                'Nombre oficina': NOMBRE_OFICINA,
                'Codigo centro de costos': CODIGO_CENTRO_COSTOS,
                'Nombre centro de costos': NOMBRE_CENTRO_COSTOS,
                Cedula: CEDULA,
                Nombres: COLABORADOR,
                Cargo: CARGO,
                'Valor (Valor cubierto por el colaborador)': price,
                Cuotas: dues,
                'Fecha de consumo (Dia/Mes/Año)': moment(requestDate).format('DD-MM-YYYY')
              };
            });
            handleExport(selectedData, 'DESCUENTO');
          }}
        />
      </div>
    </div>
  );
};

export default TableDiscount;
