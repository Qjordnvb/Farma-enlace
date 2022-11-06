import React, {useEffect, useState} from 'react';
import {DatePicker, message, Select, Table} from 'antd';
import btnDownload from '../../../../assets/img/btn-discount.png';
import {useUtils} from '../../../../hooks';
import {useCustomDiscount} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';
import moment from 'moment';
import useCalcSize from '../../../../hooks/useCalcSize';

const {RangePicker} = DatePicker;

const TableDiscount = () => {
  const {
    columns,
    rowSelection,
    dataSource,
    loading,
    dateRange,
    onDatePickerChange,
    onStatusChange,
    status,
    getOrdersTable
  } = useCustomDiscount();
  const {handleExport, updateDiscountStatus} = useUtils();
  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  const {height: tableHeight} = useCalcSize();

  return (
    <div className="container-table pt-2">
      <div className="flex justify-end items-end">
        <div className={'mr-4'}>
          <Select
            onChange={onStatusChange}
            className={'w-48 mr-4'}
            placeholder={'Estado de orden'}
            showSearch={true}
            options={[
              {label: 'Todos', value: 'Todos'},
              {label: 'No generado', value: 'No generado'},
              {label: 'Generado', value: 'Generado'}
            ]}
          ></Select>
        </div>
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
            updateDiscountStatus(rowSelection.selectedRowKeys)
              .then(() => {
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
                getOrdersTable(dateRange, status);
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
              })
              .catch(() => {
                message.error('Error al generar descuento');
              });
          }}
        />
      </div>
    </div>
  );
};

export default TableDiscount;
