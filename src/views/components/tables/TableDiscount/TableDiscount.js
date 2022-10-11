import React, {useEffect, useState} from 'react';
import {Table} from 'antd';
import btnDownload from '../../../../assets/img/btn-discount.png';
import {useUtils} from '../../../../hooks';
import {useCustomDiscount} from './hooks';
import './style.css';
import '../TableParameter/TableReasons/style-reasons.css';

const TableDiscount = () => {
  const {columns, rowSelection, dataSource, loading} = useCustomDiscount();
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
      <Table
        scroll={{y: 300}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSizeOptions: [10, 20, 30, 40],
          showSizeChanger: true,
          total: currentLength
        }}
        onChange={onChange}
        rowKey={(record) => record.id}
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
                CODIGO_OFICINA,
                NOMBRE_OFICINA,
                TALLA,
                descripcion,
                requestDate,
                dues,
                price,
                consumptionOrderNumber,
                ultimaActualizacion,
                requestStatus
              } = row;
              return {
                COLABORADOR,
                CARGO,
                NOMBRE_CENTRO_COSTOS,
                CODIGO_OFICINA,
                NOMBRE_OFICINA,
                TALLA,
                DESCRIPCION: descripcion,
                FECHA: requestDate,
                CUOTAS: dues,
                PRICE: price,
                'NUMERO ORDEN DE CONSUMO': consumptionOrderNumber,
                'ULTIMA ACTUALIZACION': ultimaActualizacion,
                ESTADO: requestStatus
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
