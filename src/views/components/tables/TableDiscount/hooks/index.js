import {useEffect, useState} from 'react';
import moment from 'moment';
import {useUtils} from 'hooks';

export const useCustomDiscount = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {getColumnSearchProps, getOrders} = useUtils();

  const [dataSource, setDataSource] = useState([]);

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
      dataIndex: ['producto', 'talla'],
      with: 50,
      ...getColumnSearchProps('talla '),
      sorter: (a, b) => a.producto?.talla.localeCompare(b.producto?.talla),
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
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      }
    },
    {
      title: 'Cuotas',
      dataIndex: 'cuotas',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas.length - b.cuotas.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Valor',
      dataIndex: ['producto', 'price'],
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.producto?.cuotas - b.producto.cuotas,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'N° Orden de Consumo',
      dataIndex: 'cuotas',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas.length - b.cuotas.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'última modificación',
      dataIndex: 'status',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas.length - b.cuotas.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado',
      dataIndex: 'status',
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
