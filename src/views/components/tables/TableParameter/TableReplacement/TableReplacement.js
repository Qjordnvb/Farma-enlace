import React, {useEffect, useState} from 'react';
import {Table, Form /*Modal, Input, Form*/} from 'antd';

import './style.css';

import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import btnDownload from '../../../../../assets/img/btn-download.png';
import {useUtils} from '../../../../../hooks';
import {useCustomReplacement} from './hooks';

function TableReplacement() {
  const {dataSource, form, mergedColumns, EditableCell} = useCustomReplacement();
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
    <Form form={form} component={false}>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 20,
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
        ></Table>
      </div>
      <StyledGridList>
        <div className="btn-add">
          <img
            className="btn-download"
            src={btnDownload}
            alt="btnDownload"
            onClick={() => {
              handleExport(dataSource, 'PARÁMETROS DE REPOSICIÓN');
            }}
          />
        </div>
      </StyledGridList>
    </Form>
  );
}

export default TableReplacement;
