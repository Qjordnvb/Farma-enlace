import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space} from 'antd';
import Highlighter from 'react-highlight-words';
import './styles.css';
import * as XLSX from 'xlsx';
import {Api, Apilocal} from 'services/Api';
import axios from 'axios';

export const useUtils = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  async function LoginRequest(usuario, password) {
    const request = await Api.post('/usuarios/login', {usuario, password});
    return request.data;
  }

  async function getTableParameters() {
    const request = await Apilocal.get('/products/findAll');
    return request.data;
  }

  async function getAllRepositionParameters() {
    const request = await Apilocal.get('/products/findWithReplacement');
    return request.data;
  }

  async function editRepositionParameter(data) {
    const request = await Apilocal.post('/products/editReplacement', {...data});
    return request.data;
  }

  async function editPrice(data) {
    const request = await Apilocal.post('/products/editPrice', {...data});
    return request.data;
  }

  async function getReasonsTableParameters(active) {
    let url = '/parameterizedReasons/findAll';
    if (active) {
      url += '?active=true';
    }
    const request = await Apilocal.get(url);
    return request.data;
  }

  async function deleteReason(id) {
    let url = '/parameterizedReasons/delete';

    const request = await Apilocal.post(url, {id});
    return request.data;
  }

  async function addReason(data) {
    const request = await Apilocal.post('/parameterizedReasons/create', {...data});
    return request.data;
  }

  async function switchActiveReason(id, active) {
    const request = await Apilocal.post('/parameterizedReasons/active', {id, active});
    return request.data;
  }

  async function editReason(data) {
    const request = await Apilocal.post('/parameterizedReasons/edit', {...data});
    return request.data;
  }

  async function addGarment(data) {
    const request = await Apilocal.post('/prenda/create', {...data});
    return request.data;
  }

  async function editGarmentDescription(data) {
    const request = await Apilocal.post('/prenda/edit', {...data});
    return request.data;
  }

  async function getGarmentsTableParameters(active) {
    let url = '/prenda/findAll';
    if (active) {
      url += '?active=true';
    }
    const request = await Apilocal.get(url);
    return request.data;
  }

  async function deleteGarment(id) {
    const request = await Apilocal.post('/prenda/delete', {id});
    return request.data;
  }

  async function getAllDescriptions() {
    const request = await Apilocal.get('/uniformDescription/findAll');
    return request.data;
  }

  async function editAmountToBuy(id, amountToBuy) {
    const request = await Apilocal.post('/uniformDescription/editAmount', {id, amountToBuy});
    return request.data;
  }

  async function getStock(selectedKeys) {
    const request = await Apilocal.post('/uniformDescription/stock', {selectedKeys});
    return request.data;
  }

  async function getAllDeliveries() {
    const request = await Apilocal.get('/uniformDelivery/findAll');
    return request.data;
  }

  async function deleteUniformDelivery(id) {
    const request = await Apilocal.post('/uniformDelivery/delete', {id});

    return request.data;
  }

  async function getOrders({dateRange, discount, status, discountStatus}) {
    let url = new URL(
      `${
        process.env.REACT_APP_NODE_ENV === 'production'
          ? process.env.REACT_APP_PROD_URL
          : process.env.REACT_APP_DEV_URL
      }orders/findAll`
    );
    if (dateRange?.from && dateRange?.to) {
      url.searchParams.append('from', dateRange.from);
      url.searchParams.append('to', dateRange.to);
    }

    if (status) {
      url.searchParams.append('status', status);
    }
    if (discount) {
      url.searchParams.append('discount', discount);
    }

    if (discountStatus) {
      url.searchParams.append('discountStatus', discountStatus);
    }
    const request = await axios.get(url.href);
    return request.data;
  }

  async function createOrder(data) {
    const request = await Apilocal.post('/orders/create', {...data});
    return request.data;
  }

  async function generateOrder(data) {
    const request = await Apilocal.post('/orders/generate', {ids: data});
    return request.data;
  }

  async function updateDiscountStatus(data) {
    const request = await Apilocal.post('/orders/updateDiscountStatus', {ids: data});
    return request.data;
  }

  async function bulkSizeUpdate(data) {
    let getUser = window.localStorage.getItem('MY_AUTH_APP');
    let user = {};
    if (getUser !== 'undefined') {
      user = JSON.parse(getUser);
    }
    const request = await Apilocal.post('/employees/bulkUpdate', {
      employees: data,
      ultimaActualizacion: user?.user?.nombrecorto ? user?.user?.nombrecorto : 'jjarrin'
    });
    return request.data;
  }

  async function getEmployees() {
    const request = await Apilocal.get('/employees/findAll');
    return request.data;
  }

  async function updateEmployeeSize(data) {
    let getUser = window.localStorage.getItem('MY_AUTH_APP');
    let user = {};
    if (getUser !== 'undefined') {
      user = JSON.parse(getUser);
    }
    const request = await Apilocal.post('/employees/updateSize', {
      ...data,
      ultimaActualizacion: user?.user?.nombrecorto ? user.user?.nombrecorto : 'jjarrin'
    });
    return request.data;
  }

  async function createDelivery(data) {
    const request = await Apilocal.post('/uniformDelivery/create', {...data});
    return request.data;
  }

  async function updateGarmentQuantity(data) {
    const request = await Apilocal.post('/uniformDescription/updateQuantity', {...data});
    return request.data;
  }

  async function switchActiveGarment(id, active) {
    const request = await Apilocal.post('/prenda/active', {id, active});
    return request.data;
  }

  async function bulkUploadConsumptionOrders(data) {
    const request = await Apilocal.post('/orders/bulkUpload', {orders: data});
    return request.data;
  }

  async function UserLogin(usuario, password, app, token) {
    const request = await Api.post(
      'ServiceDesk/loginUsuarios',
      {usuario, password, app},
      {headers: {Authorization: `Bearer ${token}`}}
    );

    return request.data;
  }

  // function sorter and search tables

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    window.location.reload();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Resetear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? 'transparent' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  });

  const handleExport = (dataSource, title) => {
    let workbook = XLSX.utils.book_new();
    let jsonToSheet = XLSX.utils.json_to_sheet(dataSource);
    XLSX.utils.book_append_sheet(workbook, jsonToSheet, title);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const excelToJson = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary'
        });
        const sheetName = workbook.SheetNames[0];
        const rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        resolve(rowObject);
      };
      reader.onerror = () => {
        reject([]);
      };
      reader.readAsBinaryString(file);
    });
  };

  return {
    LoginRequest,
    UserLogin,
    getTableParameters,
    getColumnSearchProps,
    getReasonsTableParameters,
    getGarmentsTableParameters,
    addReason,
    switchActiveReason,
    switchActiveGarment,
    addGarment,
    editGarmentDescription,
    getAllDescriptions,
    updateGarmentQuantity,
    getAllRepositionParameters,
    editRepositionParameter,
    createDelivery,
    getAllDeliveries,
    getOrders,
    createOrder,
    bulkSizeUpdate,
    getEmployees,
    updateEmployeeSize,
    deleteUniformDelivery,
    editPrice,
    deleteGarment,
    handleExport,
    deleteReason,
    editAmountToBuy,
    getStock,
    editReason,
    generateOrder,
    excelToJson,
    bulkUploadConsumptionOrders,
    updateDiscountStatus
  };
};
