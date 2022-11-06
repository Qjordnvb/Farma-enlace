import {useEffect, useState} from 'react';
import moment from 'moment';
import {useUtils} from 'hooks';

export const useCustomDiscount = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getColumnSearchProps, getOrders} = useUtils();

  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [status, setStatus] = useState('');

  const getOrdersTable = (dateRange, status) => {
    setLoading(true);
    getOrders({dateRange, discount: 'descuento', status})
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
    getOrdersTable(dateRange, status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, status]);

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
      sortDirections: ['descend', 'ascend'],
      align: 'center'
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
      },
      align: 'center'
    },
    {
      title: 'Cargo',
      dataIndex: 'CARGO',
      ...getColumnSearchProps('CARGO'),
      sorter: (a, b) => a.CARGO?.localeCompare(b.CARGO),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'NOMBRE_CENTRO_COSTOS',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS?.localeCompare(b.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Código oficina ',
      dataIndex: 'CODIGO_OFICINA',
      ...getColumnSearchProps('Código oficina '),
      sorter: (a, b) => +a.CODIGO_OFICINA - +b.CODIGO_OFICINA,
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: ['employee', 'NOMBRE_OFICINA'],
      ...getColumnSearchProps('NOMBRE_OFICINA'),
      sorter: (a, b) => a.NOMBRE_OFICINA?.localeCompare(b.NOMBRE_OFICINA),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Talla',
      dataIndex: ['correctSize', 'talla'],
      with: 50,
      ...getColumnSearchProps('talla '),
      sorter: (a, b) => {
        return a.correctSize?.talla?.localeCompare(b?.correctSize?.talla);
      },
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Kits',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('Kits '),
      sorter: (a, b) => a.descripcion?.localeCompare(b.descripcion),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Fecha',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('Fecha'),
      sorter: (a, b) => a.requestDate.length - b.requestDate.length,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      },
      align: 'center'
    },
    {
      title: 'Cuotas',
      dataIndex: 'dues',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.dues - b.dues,
      sortDirections: ['descend', 'ascend'],
      width: '5%',
      align: 'center'
    },
    {
      title: 'Valor',
      dataIndex: 'price',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas - b.cuotas,
      sortDirections: ['descend', 'ascend'],
      width: '5%',
      align: 'center'
    },
    {
      title: 'N° Orden de Consumo',
      dataIndex: 'consumptionOrderNumber',
      ...getColumnSearchProps('numero orden de consumo'),
      sorter: (a, b) => a.consumptionOrderNumber?.localeCompare(b.consumptionOrderNumber),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'última modificación',
      dataIndex: 'ultimaActualizacion',
      ...getColumnSearchProps('ultima actualizacion'),
      sorter: (a, b) => a.ultimaActualizacion?.localeCompare(b.ultimaActualizacion),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_ ? _ : 'jjarrin'}</div>;
      },
      align: 'center'
    },
    {
      title: 'Estado',
      dataIndex: 'discountRequested',
      ...getColumnSearchProps('estado'),
      sorter: (a, b) => a.requestStatus?.localeCompare(b.requestStatus),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    }
  ];

  const onDatePickerChange = (dates) => {
    if (dates) {
      setDateRange({
        from: dates[0],
        to: dates[1]
      });
    } else {
      setDateRange({});
    }
  };
  const onStatusChange = (value) => {
    if (value) {
      setStatus(value);
    } else {
      setStatus('');
    }
  };

  return {
    columns,
    rowSelection,
    dataSource,
    setDataSource,
    loading,
    onDatePickerChange,
    dateRange,
    status,
    onStatusChange,
    getOrdersTable
  };
};
