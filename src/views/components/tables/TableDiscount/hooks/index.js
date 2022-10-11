import {useEffect, useState} from 'react';
import moment from 'moment';
import {useUtils} from 'hooks';

export const useCustomDiscount = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getColumnSearchProps, getOrders} = useUtils();

  const [dataSource, setDataSource] = useState([]);

  const getOrdersTable = () => {
    setLoading(true);
    getOrders()
      .then((res) => {
        let formatOrders = res.map((order) => {
          return {...order, ...order.producto, ...order.employee, ...order.parameterizedReason};
        });
        setDataSource(formatOrders);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'COLABORADOR',
      ...getColumnSearchProps('COLABORADOR'),
      sorter: (a, b) => a.COLABORADOR?.localeCompare(b?.COLABORADOR),
      sortDirections: ['descend', 'ascend'],
      width: '10%',
      onFilter: (value, record) => {
        return record?.COLABORADOR?.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      title: 'Cargo',
      dataIndex: 'CARGO',
      ...getColumnSearchProps('CARGO'),
      sorter: (a, b) => a.CARGO?.localeCompare(b.CARGO),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'NOMBRE_CENTRO_COSTOS',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS?.localeCompare(b.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Código oficina ',
      dataIndex: 'CODIGO_OFICINA',
      ...getColumnSearchProps('Código oficina '),
      sorter: (a, b) => +a.CODIGO_OFICINA - +b.CODIGO_OFICINA,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: ['employee', 'NOMBRE_OFICINA'],
      ...getColumnSearchProps('NOMBRE_OFICINA'),
      sorter: (a, b) => a.NOMBRE_OFICINA.localeCompare(b.NOMBRE_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'TALLA',
      with: 50,
      ...getColumnSearchProps('talla '),
      sorter: (a, b) => {
        return a.TALLA?.localeCompare(b?.TALLA);
      },
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Kits',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('Kits '),
      sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
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
      dataIndex: 'dues',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.dues - b.dues,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Valor',
      dataIndex: 'price',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas - b.cuotas,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'N° Orden de Consumo',
      dataIndex: 'consumptionOrderNumber',
      ...getColumnSearchProps('numero orden de consumo'),
      sorter: (a, b) => a.consumptionOrderNumber?.localeCompare(b.consumptionOrderNumber),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'última modificación',
      dataIndex: 'ultimaActualizacion',
      ...getColumnSearchProps('ultima actualizacion'),
      sorter: (a, b) => a.ultimaActualizacion?.localeCompare(b.ultimaActualizacion),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado',
      dataIndex: 'requestStatus',
      ...getColumnSearchProps('estado'),
      sorter: (a, b) => a.requestStatus?.localeCompare(b.requestStatus),
      sortDirections: ['descend', 'ascend']
    }
  ];

  return {
    columns,
    rowSelection,
    dataSource,
    setDataSource,
    loading
  };
};
