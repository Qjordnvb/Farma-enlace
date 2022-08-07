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
      <Table columns={columns} dataSource={dataSource} />
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
              <Form.Item className="item-form" label="Mandil blanco">
                <Input
                  className="input-add"
                  value={editingFile?.garment1}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, garment1: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Mandil azul">
                <Input
                  className="input-add"
                  value={editingFile?.garment2}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, garment2: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Camiseta">
                <Input
                  className="input-add"
                  value={editingFile?.garment3}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, garment3: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Buso">
                <Input
                  className="input-add"
                  value={editingFile?.garment4}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, garment4: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Chompa">
                <Input
                  className="input-add"
                  value={editingFile?.garment5}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, garment5: e.target.value};
                    });
                  }}
                />
              </Form.Item>
              <Form.Item className="item-form" label="Escarapela">
                <Input
                  className="input-add"
                  value={editingFile?.garment6}
                  onChange={(e) => {
                    setEditingFile((pre) => {
                      return {...pre, garment6: e.target.value};
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}

      <div className="flex justify-end">
        <img src={btnSave} className="btn-save" alt="btnDownload" />
        <CSVLink filename={'TableContent.csv'} data={dataSource} className="btn-download">
          <img className="btn-download" src={btnDownload} alt="btnDownload" />
        </CSVLink>
      </div>
    </div>
  );
}
