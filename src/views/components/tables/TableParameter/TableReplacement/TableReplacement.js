import React, {useEffect, useState} from 'react';
import {Form, Table} from 'antd';

import './style.css';
import moment from 'moment';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
//import btnDownload from '../../../../../assets/img/btn-download.png';
import {useUtils} from '../../../../../hooks';
import {useCustomReplacement} from './hooks';
import useCalcSize from '../../../../../hooks/useCalcSize';
import {ReactComponent as SpreadsheetIcon} from '../../../../../assets/spreadsheet.svg';
import {ReactComponent as ArrowDown} from '../../../../../assets/arrow-down.svg';
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

  const {height: tableHeight} = useCalcSize();

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
          scroll={{y: tableHeight - 230, x: 1500}}
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

          <div
            className="button-generate "

            onClick={() => {
              handleExport(excelData, 'PARÁMETROS DE REPOSICIÓN');
            }}
          >
            {/*<img src={btnSave} className="btn-save" alt="btnDownload" />*/}

            <div>
              <SpreadsheetIcon />
              <ArrowDown />
            </div>
            <h3 className={'text-neutral-50 font-bold mb-0'}>Descargar</h3>
          </div>
        </div>
      </StyledGridList>
    </Form>
  );
}

export default TableReplacement;
