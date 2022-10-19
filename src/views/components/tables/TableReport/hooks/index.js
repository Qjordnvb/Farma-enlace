import {useState, useEffect} from 'react';
import {useUtils} from 'hooks';
import moment from 'moment';

export const useCustomReport = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getColumnSearchProps, getOrders} = useUtils();
  const [dateRange, setDateRange] = useState({});

  const [dataSource, setDataSource] = useState([]);

  const getOrdersData = (dateRange) => {
    setLoading(true);
    getOrders(dateRange)
      .then((res) => {
        let formatOrders = res.map((order) => {
          return {...order, ...order.producto, ...order.employee, ...order.parameterizedReason};
        });
        setLoading(false);
        setDataSource(formatOrders);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getOrdersData(dateRange);
  }, [dateRange]);

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
      defaultSortOrder: 'descend'
    },

    {
      title: 'Colaborador',
      dataIndex: 'COLABORADOR',
      ...getColumnSearchProps('Colaborador'),
      sorter: (a, b) => a.COLABORADOR.localeCompare(b.COLABORADOR),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'CARGO',
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a.CARGO.localeCompare(b.CARGO),
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
      title: 'Código Centro de Gestión',
      dataIndex: 'CODIGO_CENTRO_COSTOS',
      ...getColumnSearchProps('codigo centro de gestion'),
      sorter: (a, b) => a.CODIGO_CENTRO_COSTOS?.localeCompare(b.CODIGO_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Centro de Gestión',
      dataIndex: 'NOMBRE_CENTRO_COSTOS',
      ...getColumnSearchProps('nombre centro de costos'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS?.localeCompare(b.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      with: 40,
      ...getColumnSearchProps('Talla'),
      sorter: (a, b) => a.talla - b.talla,
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
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('Motivo'),
      sorter: (a, b) => a.reason.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tiempo desde la última reposición',
      dataIndex: 'timeSinceLastReplacement',
      ...getColumnSearchProps('Tiempo desde la última reposición'),
      sorter: (a, b) => a.timeSinceLastReplacement - b.timeSinceLastReplacement,
      sortDirections: ['descend', 'ascend']
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

  return {
    columns,
    rowSelection,
    dataSource,
    setDataSource,
    loading,
    onDatePickerChange,
    dateRange
  };
};
