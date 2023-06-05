import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';
//import btnDownload from '../../../../assets/img/btn-generate.png';
import {useUtils} from '../../../../hooks';
import useCalcSize from '../../../../hooks/useCalcSize';
import {useCustomInventory} from './hooks';
import './style.css';
import {ReactComponent as SpreadsheetIcon} from '../../../../assets/spreadsheet.svg';
import {ReactComponent as ArrowDown} from '../../../../assets/arrow-down.svg';
const TableInventory = ({setSelected}) => {
  const {
    form,
    EditableCell,
    mergedColumns,
    data,
    rowSelection,
    loading,

    selectedItems,
    garmentColumns
  } = useCustomInventory();
  const {handleExport} = useUtils();
  const [excelData, setExcelData] = useState([]);

  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    setCurrentLength(data.length);
  }, [data]);

  useEffect(() => {
    let selectedData = [];

    if (rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length > 0) {
      rowSelection.selectedRowKeys.map((key) => {
        let findRow = data.filter((value) => value.id === key);
        if (findRow && findRow.length > 0) {
          selectedData.push(findRow[0]);
        }
      });
    } else {
      selectedData = data;
    }

    let formattedData = selectedData.map((employee) => {
      let formatGarments = garmentColumns.reduce((curr, garment) => {
        curr[garment.title] = employee[garment?.dataIndex] ? employee[garment?.dataIndex] : 0;
        return curr;
      }, {});
      return {
        Descripción: employee.descripcion,
        'Cantidad a comprar': employee.amountToBuy,
        'Cantidad sugerida': employee.suggestion,
        ...formatGarments,
        Prioridad: employee.priority,
        Stock: employee.stock,
        'Stock máximo': employee.max,
        'Stock mínimo': employee.totalAverage,
        Talla: employee.talla
      };
    });
    setExcelData(formattedData);
  }, [data, rowSelection.selectedRowKeys]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };
  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  const {height: tableHeight} = useCalcSize();

  return (
    <div className="container-table pt-2">
      <Form form={form} component={false}>
        <Table
          scroll={{x: 1500, y: tableHeight - 250}}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          loading={loading}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSizeOptions: [10, 20, 30, 40],
            showSizeChanger: true,
            total: currentLength
          }}
          onChange={onChange}
          rowSelection={rowSelection}
          rowKey={(record) => record.id}
        />
      </Form>
      <div className="flex justify-end items-end flex-col">
        <div
          onClick={() => {
            handleExport(excelData, 'INVENTARIO');
          }}
          className="button-generate"
        >
          <div>
            <SpreadsheetIcon />
            <ArrowDown />
          </div>
          <h3 className={'text-neutral-50 font-bold mb-0'}>Generar</h3>
        </div>
      </div>
    </div>
  );
};

export default TableInventory;
