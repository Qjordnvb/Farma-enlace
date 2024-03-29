import {useEffect, useRef, useState} from 'react';
import {message} from 'antd';
import moment from 'moment';
import {useUtils} from 'hooks';
import 'moment/locale/es';

export const useCustomIntake = () => {
  moment.locale('es');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState({});
  // eslint-disable-next-line no-unused-vars
  const {
    getColumnSearchProps,
    createOrder,
    getOrders,
    getEmployees,
    getTableParameters,
    generateOrder,
    excelToJson,
    bulkUploadConsumptionOrders
  } = useUtils();
  const [options, setOptions] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState({});
  const [employeesList, setEmployeesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [selectedColaborador, setSelectedColaborador] = useState({});
  const [status, setStatus] = useState('No generado');
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (addingFile?.colaborador) {
      let findColaborador = employeesList.filter(
        (value) => value.CEDULA === addingFile.colaborador
      );
      if (findColaborador[0]) {
        setSelectedColaborador({...findColaborador[0]});
        let getSizes = productsList.filter((product) => {
          let splitProduct = product.descripcion.split(' ');
          let kitType = splitProduct[2];

          if (kitType === 'MANDIL') {
            return product.talla === findColaborador[0].TALLA_MANDIL;
          } else if (kitType === 'KIT') {
            return product.talla === findColaborador[0].TALLA;
          }
        });
        setFilteredSizes(getSizes);
      }
    }
  }, [addingFile, employeesList, productsList]);

  const getOrdersTable = (dateRange, status) => {
    getOrders({dateRange, status})
      .then((res) => {
        setDataSource(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log('ERROR - getOrdersTable', e);
        setLoading(false);
        message.error('Error cargando datos');
      });
  };

  const getEmployeesList = () => {
    getEmployees()
      .then((res) => {
        setEmployeesList(res);
      })
      .catch(() => {
        message.error('Error cargando datos');
      });
  };

  const getProductsList = () => {
    getTableParameters()
      .then((res) => {
        setProductsList(res);
      })
      .catch(() => {
        message.error('Error cargando datos');
      });
  };

  useEffect(() => {
    setLoading(true);
    getEmployeesList();
    getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    getOrdersTable(dateRange, status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, status]);

  /*const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };*/

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    }
  };

  const createConsumptionOrders = () => {
    setLoading(true);
    generateOrder(selectedRowKeys)
      .then((res) => {
        if (res) {
          message.success('Ordenes creadas correctamente');
          getOrdersTable(dateRange);
          setLoading(false);
        }
      })
      .catch(() => {
        message.error('Error creando ordenes');
        setLoading(false);
      });
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
      title: 'Cédula',
      dataIndex: ['employee', 'CEDULA'],
      ...getColumnSearchProps('Cédula'),
      sorter: (a, b) => +a?.employee?.CEDULA - +b?.employee?.CEDULA,
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.employee?.CEDULA?.toString().toLowerCase().includes(value.toLowerCase());
      },
      defaultSortOrder: 'ascend',
      align: 'center'
    },
    {
      title: 'Colaborador',
      dataIndex: ['employee', 'COLABORADOR'],
      ...getColumnSearchProps('Colaborador'),
      sorter: (a, b) => a.employee?.COLABORADOR?.localeCompare(b.employee?.COLABORADOR),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.employee?.COLABORADOR?.toString().toLowerCase().includes(value.toLowerCase());
      },
      align: 'center'
    },
    {
      title: 'Cargo',
      dataIndex: ['employee', 'CARGO'],
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a?.employee?.CARGO?.localeCompare(b?.employee?.CARGO),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.employee?.CARGO?.toString().toLowerCase().includes(value.toLowerCase());
      },
      align: 'center'
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: ['employee', 'NOMBRE_CENTRO_COSTOS'],
      ...getColumnSearchProps('Distribucion Administrativa'),
      sorter: (a, b) =>
        a?.employee?.NOMBRE_CENTRO_COSTOS?.localeCompare(b?.employee?.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.employee?.NOMBRE_CENTRO_COSTOS?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: 'center'
    },
    {
      title: 'Código oficina ',
      dataIndex: ['employee', 'CODIGO_OFICINA'],
      ...getColumnSearchProps('Codigo oficina'),
      sorter: (a, b) => a?.employee?.CODIGO_OFICINA?.localeCompare(b?.employee?.CODIGO_OFICINA),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.employee?.CODIGO_OFICINA?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: 'center'
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: ['employee', 'NOMBRE_OFICINA'],
      ...getColumnSearchProps('Nombre de la oficina'),
      sorter: (a, b) => a?.employee?.NOMBRE_OFICINA?.localeCompare(b?.employee?.NOMBRE_OFICINA),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.employee?.CODIGO_OFICINA?.toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      },
      align: 'center'
    },
    {
      title: 'Talla',
      dataIndex: ['correctSize', 'talla'],
      with: 50,
      ...getColumnSearchProps('Talla'),
      sorter: (a, b) => a?.correctSize?.talla?.localeCompare(b?.correctSize?.talla),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.correctSize?.talla?.toString().toLowerCase().includes(value.toLowerCase());
      },
      width: '4%',
      align: 'center'
    },
    {
      title: 'Descripcion',
      dataIndex: ['producto', 'descripcion'],
      ...getColumnSearchProps('Descripcion'),
      sorter: (a, b) => a?.producto?.descripcion?.localeCompare(b?.producto?.descripcion),
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return record.producto?.descripcion?.toString().toLowerCase().includes(value.toLowerCase());
      },
      align: 'center'
    },
    {
      title: 'Uniforme a enviar',
      dataIndex: ['correctSize', 'descripcion'],
      ...getColumnSearchProps('Uniforme a enviar'),
      sorter: (a, b) => a?.correctSize?.descripcion?.localeCompare(b?.correctSize?.descripcion),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      onFilter: (value, record) =>
        record.correctSize?.descripcion?.toLowerCase().includes(value.toLowerCase())
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('requestDate'),
      sorter: (a, b) => a.requestDate - b.requestDate,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      },
      align: 'center'
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
      dataIndex: 'dateConsumptionOrder',
      ...getColumnSearchProps('tiempo desde la última reposición'),
      sorter: (a, b) => a.dateConsumptionOrder?.localeCompare(b.dateConsumptionOrder),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        let duration = moment.duration(moment(new Date()).diff(_));
        let days = duration.asDays();
        return <div>{days.toFixed()} dias</div>;
      },
      align: 'center',
      onFilter: (value, record) => {
        let duration = moment.duration(moment(new Date()).diff(record.dateConsumptionOrder));
        let days = duration.asDays();
        return days.toString().includes(value);
      }
    },
    {
      title: 'Estado de la solicitud',
      dataIndex: 'requestStatus',
      ...getColumnSearchProps('estado de la solicitud'),
      sorter: (a, b) => a.requestStatus?.localeCompare(b.requestStatus),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_ ? _ : 'No generado'}</div>;
      },
      align: 'center',
      onFilter: (value, record) => {
        return record.requestStatus?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      title: 'Fecha orden de consumo.',
      dataIndex: 'dateConsumptionOrder',
      ...getColumnSearchProps('dateConsumptionOrder'),
      sorter: (a, b) => a.dateConsumptionOrder?.localeCompare(b?.dateConsumptionOrder),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      },
      align: 'center',
      onFilter: (value, record) => {
        let format = moment(record.dateConsumptionOrder).format('YYYY-MM-DD');
        return format.toString().includes(value);
      }
    },
    {
      title: 'N° Orden de consumo',
      dataIndex: 'consumptionOrderNumber',
      ...getColumnSearchProps('orden de consumo'),
      sorter: (a, b) => +a.consumptionOrderNumber - +b.consumptionOrderNumber,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      onFilter: (value, record) => {
        return record.consumptionOrderNumber
          ?.toString()
          .toLowerCase()
          .includes(value?.toLowerCase());
      }
    }
  ];

  const resetAdd = () => {
    setIsAdd(false);
    setAddingFile(null);
  };

  const onAddFile = () => {
    setIsAdd(true);
    setDataSource(() => {
      return [...dataSource];
    });
  };

  const onAddOrder = () => {
    setLoading(true);
    createOrder(addingFile)
      .then(() => {
        setLoading(false);
        getOrdersTable();
        message.success('Orden de consumo creada correctamente');
        resetAdd();
      })
      .catch(() => {
        setLoading(false);
        message.error('Error al crear la orden de consumo');
        resetAdd();
      });
  };

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

  const handleInputFile = async () => {
    setLoading(true);
    let file = inputFileRef.current.files[0];
    if (file) {
      let jsonData = await excelToJson(file);
      await bulkUploadConsumptionOrders(jsonData);
    }
  };

  const onStatusChange = (value) => {
    if (value) {
      setStatus(value);
    } else {
      setStatus(null);
    }
  };

  return {
    columns,
    rowSelection,
    dataSource,
    onAddFile,
    resetAdd,
    isAdd,
    addingFile,
    setAddingFile,
    setDataSource,
    options,
    setOptions,
    onAddOrder,
    employeesList,
    productsList,
    selectedRowKeys,
    createConsumptionOrders,
    onDatePickerChange,
    dateRange,
    selectedColaborador,
    filteredSizes,
    loading,
    inputFileRef,
    handleInputFile,
    onStatusChange,
    status
  };
};
