import React, {useEffect, useState} from 'react';
import {DatePicker, Table} from 'antd';
import Button from 'views/components/button/Button';
import {useUtils} from '../../../../hooks';
import {useCustomReport} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';
import moment from 'moment';
import useCalcSize from '../../../../hooks/useCalcSize';

const {RangePicker} = DatePicker;

const TableReport = () => {
  const {columns, rowSelection, dataSource, loading, onDatePickerChange, dateRange} =
    useCustomReport();
  const {handleExport} = useUtils();

  const [currentLength, setCurrentLength] = useState(0);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  useEffect(() => {
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

    let formattedData = selectedData.map((employee) => {
      return {
        Colaborador: employee.COLABORADOR,
        Cargo: employee.CARGO,
        'Distribución Administrativa': employee.NOMBRE_CENTRO_COSTOS,
        'Código Centro de Gestión': employee.CODIGO_CENTRO_COSTOS,
        'Centro de Gestión': employee.NOMBRE_CENTRO_COSTOS,
        Talla: employee.talla,
        Kits: employee.descripcion,
        Fecha: employee.requestDate,
        Motivo: employee.reason,
        'Tiempo desde la última reposición': employee.timeSinceLastReplacement
      };
    });

    setExcelData(formattedData);
  }, [dataSource, rowSelection.selectedRowKeys]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  const {height: tableHeight} = useCalcSize();

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
        scroll={{x: 2000, y: tableHeight - 250}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
        loading={loading}
        rowKey={(record) => {
          return record.id;
        }}
      />
      <div className="flex items-end">
        {' '}
        <Button
          onClick={() => {
            handleExport(excelData, 'REPORTERIA');
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
