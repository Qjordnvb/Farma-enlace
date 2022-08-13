import React from 'react';
import {Table, Modal, Input, Form} from 'antd';
import './style.css';
import {CSVLink} from 'react-csv';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import btnDownload from '../../../../../assets/img/btn-download.png';
import {useCustomReplacement} from './hooks';

function TableReplacement() {
  const {
    dataSource,
    setEditingFile,
    isEditing,
    editingFile,
    columns,
    resetEditing,
    onEditReplacement
  } = useCustomReplacement();

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
    <>
      {' '}
      <div>
        <Table
          pagination={{
            pageSize: 5
          }}
          columns={columns}
          dataSource={dataSource}
        ></Table>
        {isEditing && (
          <>
            <Modal
              title="Editar"
              visible={isEditing}
              okText="Guardar"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                onEditReplacement().then(() => {
                  resetEditing();
                });
              }}
            >
              <Form>
                <Form.Item className="item-form" label="Porcentajes">
                  <Input
                    className="input-add"
                    value={editingFile?.porcentaje}
                    onChange={(e) => {
                      const controlledValue = Math.max(0, Math.min(100, Number(e.target.value)));
                      setEditingFile({
                        ...editingFile,
                        porcentaje: controlledValue
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item className="item-form" label="Reposición">
                  <Input
                    className="input-add"
                    value={editingFile?.replacement}
                    onChange={(e) => {
                      setEditingFile({...editingFile, replacement: e.target.value});
                    }}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </>
        )}
      </div>
      <StyledGridList>
        <div className="btn-add">
          <CSVLink filename={'TableContent.csv'} data={dataSource} className="btn-download">
            <img className="btn-download" src={btnDownload} alt="btnDownload" />
          </CSVLink>
        </div>
      </StyledGridList>
    </>
  );
}

export default TableReplacement;
