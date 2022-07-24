import React from 'react';
import {Table, Modal, Input, Form} from 'antd';
import './style.css';

import {CSVLink} from 'react-csv';

import btnDownload from '../../../../../assets/img/btn-download.png';
import btnSave from '../../../../../assets/img/btn-save.png';
import {useCustomDescription} from './hooks';

export default function TableDescription() {
  const {dataSource, setDataSource, setEditingFile, isEditing, editingFile, columns, resetEditing} =
    useCustomDescription();
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} style={{marginTop: 10}} />
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
                if (file.n === editingFile.n) {
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
            <Form.Item className="item-form" label="Código Producto">
              <Input
                value={editingFile?.code}
                onChange={(e) => {
                  setEditingFile((pre) => {
                    return {...pre, code: e.target.value};
                  });
                }}
              />
            </Form.Item>
            <Form.Item className="item-form" label="Descripción">
              <Input
                value={editingFile?.description}
                onChange={(e) => {
                  setEditingFile((pre) => {
                    return {...pre, description: e.target.value};
                  });
                }}
              />
            </Form.Item>
            <Form.Item className="item-form" label="Prendas">
              <Input
                value={editingFile?.garments}
                onChange={(e) => {
                  setEditingFile((pre) => {
                    return {...pre, garments: e.target.value};
                  });
                }}
              />
            </Form.Item>
            <Form.Item className="item-form" label="Marca">
              <Input
                value={editingFile?.brand}
                onChange={(e) => {
                  setEditingFile((pre) => {
                    return {...pre, brand: e.target.value};
                  });
                }}
              />
            </Form.Item>
            <Form.Item className="item-form" label="Región">
              <Input
                value={editingFile?.region}
                onChange={(e) => {
                  setEditingFile((pre) => {
                    return {...pre, region: e.target.value};
                  });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
      <div className="flex justify-end">
        <img src={btnSave} className="btn-save" alt="btnDownload" />
        <CSVLink filename={'TableContent.csv'} data={dataSource} className="btn-download">
          <img className="btn-download" src={btnDownload} alt="btnDownload" />
        </CSVLink>
      </div>
    </div>
  );
}
