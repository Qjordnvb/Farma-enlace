import React, {useEffect, useState} from 'react';
import {Table, Form /*Modal, Input, Form*/} from 'antd';

import './style.css';
import moment from 'moment';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import btnDownload from '../../../../../assets/img/btn-download.png';
import {useUtils} from '../../../../../hooks';
import {useCustomReplacement} from './hooks';

function TableReplacement() {
  const {dataSource, form, mergedColumns, EditableCell, loading} = useCustomReplacement();
  const {handleExport} = useUtils();
  const [currentLength, setCurrentLength] = useState(0);
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  useEffect(() => {
    let formattedData = dataSource.map((product) => {
      return {
        'Código bodega': product.codigo,
        Descripción: product.descripcion,
        Talla: product.talla,
        Género: product.genero,
        Porcentajes: product.porcentaje,
        Reposición: product.reposicion,
        'Sugerido mínimo': product.totalAverage,
        'Sugerido máximo': product.max,
        'Última modificación': product.ultimaActualizacion,
        'Fecha de modificación': moment(product.updatedAt).format('DD/MM/YYYY')
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
    <Form form={form} component={false}>
      {' '}
      <div>
        <Table
          pagination={{
            pageSizeOptions: [10, 20, 30, 40],
            showSizeChanger: true,
            total: currentLength
          }}
          onChange={onChange}
          scroll={{y: 420, x: 2000}}
          columns={mergedColumns}
          dataSource={dataSource}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          rowClassName="editable-row"
          loading={loading}
        ></Table>
      </div>
      <StyledGridList>
        <div className="btn-add">
          <img
            className="btn-download"
            src={btnDownload}
            alt="btnDownload"
            onClick={() => {
              handleExport(excelData, 'PARÁMETROS DE REPOSICIÓN');
            }}
          />
        </div>
      </StyledGridList>
    </Form>
  );
}

export default TableReplacement;
