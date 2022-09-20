import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space} from 'antd';
import Highlighter from 'react-highlight-words';
import './styles.css';
import * as XLSX from 'xlsx';
import {Api, Apilocal} from 'services/Api';

export const useUtils = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  async function LoginRequest(usuario, password) {
    try {
      const request = await Api.post('/usuarios/login', {usuario, password});
      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  }

  async function getTableParameters() {
    try {
      const request = await Apilocal.get('/products/findAll');
      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  }

  async function getAllRepositionParameters() {
    try {
      const request = await Apilocal.get('/products/findWithReplacement');
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDescriptions', e);
    }
  }

  async function editRepositionParameter(data) {
    try {
      const request = await Apilocal.post('/products/editReplacement', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDescriptions', e);
    }
  }

  async function editPrice(data) {
    try {
      const request = await Apilocal.post('/products/editPrice', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDescriptions', e);
    }
  }

  async function getReasonsTableParameters(active) {
    try {
      let url = '/parameterizedReasons/findAll';
      if (active) {
        url += '?active=true';
      }
      const request = await Apilocal.get(url);
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getGarmentsTableParameters', e);
    }
  }

  async function addReason(data) {
    try {
      const request = await Apilocal.post('/parameterizedReasons/create', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - addReason', e);
    }
  }

  async function switchActiveReason(id, active) {
    try {
      const request = await Apilocal.post('/parameterizedReasons/active', {id, active});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - addReason', e);
    }
  }

  async function addGarment(data) {
    try {
      const request = await Apilocal.post('/prenda/create', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - addGarment', e);
    }
  }

  async function editGarmentDescription(data) {
    try {
      const request = await Apilocal.post('/prenda/edit', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - editGarmentDescription', e);
    }
  }

  async function getGarmentsTableParameters(active) {
    try {
      let url = '/prenda/findAll';
      if (active) {
        url += '?active=true';
      }
      const request = await Apilocal.get(url);
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - garments', e);
    }
  }

  async function deleteGarment(id) {
    try {
      const request = await Apilocal.post('/prenda/delete', {id});

      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  }

  async function getAllDescriptions() {
    try {
      const request = await Apilocal.get('/uniformDescription/findAll');
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDescriptions', e);
    }
  }

  async function getAllDeliveries() {
    try {
      const request = await Apilocal.get('/uniformDelivery/findAll');
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDeliveries', e);
    }
  }

  async function deleteUniformDelivery(id) {
    try {
      const request = await Apilocal.post('/uniformDelivery/delete', {id});

      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  }

  async function getOrders(dateRange) {
    try {
      let url = '/orders/findAll';
      if (dateRange) {
        url += `?from=${dateRange.from}&to=${dateRange.to}`;
      }
      const request = await Apilocal.get(url);
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDeliveries', e);
    }
  }

  async function createOrder(data) {
    try {
      const request = await Apilocal.post('/orders/create', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDeliveries', e);
    }
  }

  async function bulkSizeUpdate(formData) {
    try {
      const request = await Apilocal.post('/employees/bulkUpdate', formData);
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDeliveries', e);
    }
  }

  async function getEmployees() {
    try {
      const request = await Apilocal.get('/employees/findAll');
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDeliveries', e);
    }
  }

  async function updateEmployeeSize(data) {
    try {
      const request = await Apilocal.post('/employees/updateSize', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - getAllDeliveries', e);
    }
  }

  async function createDelivery(data) {
    try {
      const request = await Apilocal.post('/uniformDelivery/create', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - createDelivery', e);
    }
  }

  async function updateGarmentQuantity(data) {
    try {
      const request = await Apilocal.post('/uniformDescription/updateQuantity', {...data});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - updateGarmentQuantity', e);
    }
  }

  async function switchActiveGarment(id, active) {
    try {
      const request = await Apilocal.post('/prenda/active', {id, active});
      return request.data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('ERROR - switchActiveGarment', e);
    }
  }

  async function UserLogin(usuario, password, app, token) {
    try {
      const request = await Api.post(
        'ServiceDesk/loginUsuarios',
        {usuario, password, app},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
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
    handleExport
  };
};
