import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Modal, Select, Table} from 'antd';
import moment from 'moment';
import Button from 'views/components/button/Button';
//import btnNew from '../../../../../assets/img/btn-new.svg';
import {useCustomIntake} from './hooks';
import './style.css';
import '../../TableParameter/TableReasons/style-reasons.css';
//import btnCarga from '../../../../../assets/img/btn-carga.svg';
import {useUtils} from '../../../../../hooks';
import useCalcSize from '../../../../../hooks/useCalcSize';
import {ReactComponent as SpreadsheetIcon} from '../../../../../assets/spreadsheet.svg';
const {RangePicker} = DatePicker;
const TableIntake = () => {
  const {
    dataSource,
    columns,
    rowSelection,
    isAdd,
    onAddFile,
    onAddOrder,
    resetAdd,
    addingFile,
    setAddingFile,
    employeesList,
    filteredSizes,
    createConsumptionOrders,
    onDatePickerChange,
    dateRange,
    selectedColaborador,
    loading,
    inputFileRef,
    handleInputFile,
    onStatusChange
  } = useCustomIntake();

  const {handleExport} = useUtils();

  const [currentLength, setCurrentLength] = useState(0);

  const exampleSheet = [
    {
      CEDULA: '',
      CODIGO: ''
    }
  ];

  useEffect(() => {
    setCurrentLength(dataSource.length);
  }, [dataSource]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      setCurrentLength(extra.currentDataSource.length);
    }
  };

  const {height: tableHeight} = useCalcSize();

  // eslint-disable-next-line no-console
  return (
    <div className="container-table pt-2">
      <div className="flex justify-end items-end">
        <div className={'mr-4'}>
          <Select
            onChange={onStatusChange}
            className={'w-48 mr-4'}
            placeholder={'Estado de orden'}
            showSearch={true}
            options={[
              {label: 'Todos', value: 'Todos'},
              {label: 'No generado', value: 'No generado', default: true},
              {label: 'Pendiente', value: 'Pendiente'},
              {label: 'Generado', value: 'Generado'}
            ]}
          ></Select>
        </div>

        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')]
          }}
          showTime
          format="YYYY/MM/DD"
          onChange={onDatePickerChange}
          value={[dateRange.from, dateRange.to]}
        />
      </div>
      <Table
        scroll={{x: 2500, y: tableHeight - 250}}
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
        rowClassName={(record) => {
          return record.status !== 'No generado' && 'disabled-row';
        }}
      />
      {isAdd && (
        <>
          <Modal
            id="modal-add-orders-intake"
            className="modal-add-intake"
            title="Nueva orden de consumo"
            visible={isAdd}
            okText="AÑADIR"
            onCancel={() => {
              resetAdd();
            }}
            onOk={() => {
              onAddOrder();
            }}
          >
            <Form id="modalAdd" className="w-full">
              <div className="flex flex-col justify-around">
                <Form.Item className=" item-form " label="Colaboradores">
                  <Select
                    placeholder={'Colaboradores'}
                    value={addingFile?.colaborador}
                    onChange={(e) => {
                      setAddingFile({
                        ...addingFile,
                        colaborador: e
                      });
                    }}
                    className="input-add"
                    showSearch
                    filterOption={(input, option) => {
                      return option.children.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {employeesList.map((employee) => {
                      return (
                        <Select.Option key={employee.id} value={employee.CEDULA}>
                          {employee.COLABORADOR}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                {Object.keys(selectedColaborador).length > 0 && (
                  <div className={'flex text-neutral-500'}>
                    <p>
                      Talla uniforme:{' '}
                      {selectedColaborador.TALLA ? selectedColaborador.TALLA : 'No disponible'}
                    </p>
                    <p className={'mx-2'}>-</p>
                    <p>
                      Talla mandil:{' '}
                      {selectedColaborador.TALLA_MANDIL
                        ? selectedColaborador.TALLA_MANDIL
                        : 'No disponible'}
                    </p>
                  </div>
                )}

                <Form.Item className="item-form" label="Descripcion">
                  <Select
                    placeholder={'Descripcion'}
                    value={addingFile?.descripcion}
                    onChange={(e) => {
                      setAddingFile({
                        ...addingFile,
                        descripcion: e
                      });
                    }}
                    className="input-add"
                    showSearch
                    filterOption={(input, option) => {
                      return option.children.toLowerCase().includes(input.toLowerCase());
                    }}
                  >
                    {filteredSizes.map((product) => {
                      return (
                        <Select.Option key={product.id} value={product.id}>
                          {product.descripcion}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </>
      )}
      <div className="flex justify-between">
        <div className={'container-buttons'}>
          <label htmlFor="file" className={'rounded-lg'}>
            <div  className={'button-generate'}>
              <div>
                <SpreadsheetIcon />
              </div>
              <h3 className={'text-neutral-50 font-bold mb-0'}>Carga masiva</h3>
            </div>
            <input
              style={{visibility: 'hidden'}}
              id="file"
              type="file"
              accept=".xlsx, .xls"
              ref={inputFileRef}
              onChange={handleInputFile}
            />
          </label>
          <div
            className="button-generate"
            onClick={() => {
              handleExport(exampleSheet, 'PLANTILLA - CARGA DE ORDENES');
            }}
          >
            <h3 className={'text-neutral-50 font-bold mb-0'}>DESCARGAR PLANTILLA</h3>
          </div>
        </div>

        <div className={'container-btns flex'}>
          <Button onClick={onAddFile} className="rounded-lg button-generate mr-2" style={{fontSize:"16px"}}>
            Añadir
          </Button>

          <Button onClick={createConsumptionOrders} className="rounded-lg  button-generate" width={'300px'}>
            Generar orden de consumo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableIntake;
