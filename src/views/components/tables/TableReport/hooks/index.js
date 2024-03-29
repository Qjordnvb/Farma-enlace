import {useEffect, useState} from 'react';
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
    getOrders({dateRange, report:true})
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
      defaultSortOrder: 'descend',
      align: 'center'
    },

    {
      title: 'Colaborador',
      dataIndex: 'COLABORADOR',
      ...getColumnSearchProps('COLABORADOR'),
      sorter: (a, b) => a.COLABORADOR?.localeCompare(b.COLABORADOR),
      sortDirections: ['descend', 'ascend'],
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
      ...getColumnSearchProps('NOMBRE_CENTRO_COSTOS'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS?.localeCompare(b.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Código Centro de Gestión',
      dataIndex: 'CODIGO_CENTRO_COSTOS',
      ...getColumnSearchProps('CODIGO_CENTRO_COSTOS'),
      sorter: (a, b) => a.CODIGO_CENTRO_COSTOS?.localeCompare(b.CODIGO_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Centro de Gestión',
      dataIndex: 'NOMBRE_CENTRO_COSTOS',
      ...getColumnSearchProps('NOMBRE_CENTRO_COSTOS'),
      sorter: (a, b) => a.NOMBRE_CENTRO_COSTOS?.localeCompare(b.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      width: '6%',
      ...getColumnSearchProps('talla'),
      sorter: (a, b) => a.talla - b.talla,
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Kits',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion?.localeCompare(b.descripcion),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Fecha',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('requestDate'),
      sorter: (a, b) => a.requestDate?.localeCompare(b.requestDate),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      },
      align: 'center',
      onFilter: (value, record) => {
        let format = moment(record.requestDate).format('YYYY-MM-DD');
        return format?.toString().includes(value);
      }
    },
    {
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason?.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Tiempo desde la última reposición',
      dataIndex: 'timeSinceLastReplacement',
      ...getColumnSearchProps('timeSinceLastReplacement'),
      sorter: (a, b) => a.timeSinceLastReplacement - b.timeSinceLastReplacement,
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
