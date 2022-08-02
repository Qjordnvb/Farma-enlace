import React from 'react';
import {Table, Modal, Input, Form} from 'antd';
import './style.css';
import {CSVLink} from 'react-csv';
import {StyledGridList} from 'views/screens/user/dataGridParameters/gridList/GridList.Styled';
import btnDownload from '../../../../../assets/img/btn-download.png';
import {useCustomReplacement} from './hooks';

function TableReplacement() {
  const {dataSource, setDataSource, setEditingFile, isEditing, editingFile, columns, resetEditing} =
    useCustomReplacement();

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
        <>
          <Modal
            title="Editar"
            visible={isEditing}
            okText="Guardar"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              setDataSource((pre) => {
                return pre.map((file) => {
                  if (file.id === editingFile.id) {
                    return editingFile;
                  } else {
                    return file;
                  }
                });
              });
              resetEditing();
            }}
          >
            <Form>
              <Form.Item className="item-form" label="Motivo">
                <Input
                  className="input-add"
                  value={editingFile?.reason}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, reason: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Reposición automática">
                <Input
                  className="input-add"
                  value={editingFile?.replacement}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, replacement: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Reposición">
                <Input
                  className="input-add"
                  value={editingFile?.replacementManual}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, replacementManual: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cobro">
                <Input
                  className="input-add"
                  value={editingFile?.payment}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, payment: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cuotas">
                <Input
                  className="input-add"
                  value={editingFile?.dues}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, dues: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Cálculo">
                <Input
                  className="input-add"
                  value={editingFile?.calculation}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, calculation: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Descuento Personal">
                <Input
                  className="input-add"
                  value={editingFile?.discountPersonal}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, discountPersonal: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Descuento Farmaenlace">
                <Input
                  className="input-add"
                  value={editingFile?.discountCompany}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, discountCompany: e.target.value};
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
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
