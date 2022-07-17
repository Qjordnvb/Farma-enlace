import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space, Table} from 'antd';

import Highlighter from 'react-highlight-words';
import './style.css';

const data = [
  {
    key: '1',
    codigo: '0000115105',
    marca: 'Economica',
    description: 'ZP PRV KIT HOMBRE T-M-38',
    genero: 'Hombre',
    talla: 'XL',
    region: 'Sierra',
    ppt: '$1,000',
    estado: 'Activo'
  },
  {
    key: '2',
    codigo: '0000115105',
    marca: 'Economica',
    description: 'ZP PRV KIT HOMBRE T-M-38',
    genero: 'Hombre',
    talla: 'XL',
    region: 'Sierra',
    ppt: '$1,000',
    estado: 'Activo'
  },
  {
    key: '3',
    codigo: '0000115105',
    marca: 'Economica',
    description: 'ZP PRV KIT HOMBRE T-M-38',
    genero: 'Hombre',
    talla: 'XL',
    region: 'Sierra',
    ppt: '$1,000',
    estado: 'Activo'
  }
];

const TableOrders = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div
        style={{
          padding: 8
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
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
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
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
            Filter
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

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      width: '15%',
      ...getColumnSearchProps('codigo')
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
      width: '15%',
      ...getColumnSearchProps('marca')
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      key: 'genero',
      width: '10%',
      ...getColumnSearchProps('genero')
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      key: 'talla',
      width: '5%',
      ...getColumnSearchProps('talla')
    },
    {
      title: 'Región',
      dataIndex: 'region',
      key: 'region',
      width: '10%',
      ...getColumnSearchProps('region'),
      sorter: (a, b) => a.region.length - b.region.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'PPT Maestro',
      dataIndex: 'ppt',
      key: 'ppt',
      width: '15%',
      ...getColumnSearchProps('ppt')
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      width: '10%',
      ...getColumnSearchProps('estado'),
      sorter: (a, b) => a.estado.length - b.estado.length,
      sortDirections: ['descend', 'ascend']
    }
  ];
  return (
    <Table
      pagination={{
        pageSize: 6
      }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default TableOrders;
