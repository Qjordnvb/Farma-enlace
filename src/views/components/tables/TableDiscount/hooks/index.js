import {useEffect, useState} from 'react';
import {useUtils} from 'hooks';

export const useCustomDiscount = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {getColumnSearchProps, getOrders} = useUtils();

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      n: `1`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      cuotas: `4`
    },
    {
      key: '2',
      n: `2`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      cuotas: `4`
    },
    {
      key: '3',
      n: `3`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      cuotas: `4`
    }
  ]);

  const getOrdersTable = () => {
    getOrders().then((res) => {
      setDataSource(res);
    });
  };

  useEffect(() => {
    getOrdersTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns = [
    {
      title: 'N°',
      width: 70,
      dataIndex: 'id',
      sorter: (a, b) => a.n.length - b.n.length,
      sortDirections: ['descend', 'ascend']
    },

    {
      title: 'Colaborador',
      dataIndex: ['employee', 'COLABORADOR'],
      ...getColumnSearchProps('COLABORADOR'),
      sorter: (a, b) => a.COLABORADOR.length - b.COLABORADOR.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: ['employee', 'CARGO'],
      ...getColumnSearchProps('CARGO'),
      sorter: (a, b) => a.employee.CARGO.length - b.employee.CARGO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: ['employee', 'NOMBRE_CENTRO_COSTOS'],
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS.length - b.NOMBRE_CENTRO_COSTOS.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Código oficina ',
      dataIndex: ['employee', 'CODIGO_OFICINA'],
      ...getColumnSearchProps('Código oficina '),
      sorter: (a, b) => a.CODIGO_OFICINA.length - b.CODIGO_OFICINA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: ['employee', 'NOMBRE_OFICINA'],
      ...getColumnSearchProps('NOMBRE_OFICINA'),
      sorter: (a, b) => a.NOMBRE_OFICINA.length - b.NOMBRE_OFICINA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: ['employee', 'TALLA'],
      with: 50,
      ...getColumnSearchProps('TALLA'),
      sorter: (a, b) => a.TALLA.length - b.TALLA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Kits',
      dataIndex: 'kits',
      ...getColumnSearchProps('Kits '),
      sorter: (a, b) => a.kits.length - b.kits.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('Fecha'),
      sorter: (a, b) => a.requestDate.length - b.requestDate.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cuotas',
      dataIndex: 'cuotas',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas.length - b.cuotas.length,
      sortDirections: ['descend', 'ascend']
    }
  ];

  return {
    columns,
    rowSelection,
    dataSource,
    setDataSource
  };
};
