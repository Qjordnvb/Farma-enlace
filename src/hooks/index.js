import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space} from 'antd';
import Highlighter from 'react-highlight-words';
import './styles.css';
import {Api,Apilocal} from 'services/Api';

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

  async function getReasonsTableParameters(){
    try{ 
      const request = await Apilocal.get('/parameterizedReasons/findAll');
      return request.data;
    }catch (e) {
      console.log("ERROR - getGarmentsTableParameters",e);
    }
  }

  async function addReason(data){
    try{
      const request = await Apilocal.post('/parameterizedReasons/create', {...data});
      return request.data;
    }catch (e) {
      console.log("ERROR - addReason",e);
    }
  }

  async function switchActiveReason(id,active){
    try{
      const request = await Apilocal.post('/parameterizedReasons/active', {id,active});
      return request.data;
    }catch (e) {
      console.log("ERROR - addReason",e);
    }
  }


  async function getGarmentsTableParameters(){
    try{ 
      const request = await Apilocal.get('/prenda/findAll');
      return request.data;
    }catch (e) {
      console.log("ERROR - garments",e);
    }
  }

  async function switchActiveGarment(id,active){
    try{
      const request = await Apilocal.post('/prenda/active', {id,active});
      return request.data;
    }catch (e) {
      console.log("ERROR - addReason",e);
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
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

  return {
    LoginRequest,
    UserLogin,
    getTableParameters,
    getColumnSearchProps,
    getReasonsTableParameters,
    getGarmentsTableParameters,
    addReason,
    switchActiveReason,
    switchActiveGarment
  };
};
