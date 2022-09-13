import React from 'react';
import {Table, Form /*Modal, Input, Form*/} from 'antd';
import './style.css';
import {CSVLink} from 'react-csv';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import btnDownload from '../../../../../assets/img/btn-download.png';
import {useCustomReplacement} from './hooks';

function TableReplacement() {
  const {dataSource, form, mergedColumns, EditableCell} = useCustomReplacement();

  {
    /* //   id: 1,
  //   n: '1',
  //   codigo: '115105',
  //   descripcion: 'ZP PRV KIT ECO HOMBRE T-M-38',
  //   talla: 'M',
  //   genero: 'HOMBRE',
  //   porcentaje: '30%',
  //   replacement: '15 días',
  //   sugeridoMinimo: '10',
  //   sugeridoMaximo: '20',
  //   ultimaM: '10',
  //   fechaM: '10/10/2020'
  //  */
  }

  return (
    <Form form={form} component={false}>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 20
          }}
          scroll={{y: 420, x: 2000}}
          columns={mergedColumns}
          dataSource={dataSource}
          components={{
            body: {
              cell: EditableCell
            }
          }}
          rowClassName="editable-row"
        ></Table>
      </div>
      <StyledGridList>
        <div className="btn-add">
          <CSVLink filename={'TableContent.xlsx'} data={dataSource} className="btn-download">
            <img className="btn-download" src={btnDownload} alt="btnDownload" />
          </CSVLink>
        </div>
      </StyledGridList>
    </Form>
  );
}

export default TableReplacement;
