import {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import {useUtils} from 'hooks';
import 'moment/locale/es';

export const useCustomIntake = () => {
  moment.locale('es');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const {getColumnSearchProps, createOrder, getOrders, getEmployees, getTableParameters} =
    useUtils();
  const [options, setOptions] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: moment().startOf('month'),
    to: moment().endOf('month')
  });
  const [employeesList, setEmployeesList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const getOrdersTable = (dateRange) => {
    getOrders(dateRange).then((res) => {
      setDataSource(res);
    });
  };

  const getEmployeesList = () => {
    getEmployees().then((res) => {
      setEmployeesList(res);
    });
  };

  const getProductsList = () => {
    getTableParameters().then((res) => {
      setProductsList(res);
    });
  };

  useEffect(() => {
    getOrdersTable();
    getEmployeesList();
    getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrdersTable(dateRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

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
    selectedRowKeys.map(() => {
      let data =
        '<tem:CARGARXML>\n    <tem:cabecera>\n        <wfc:bodega_origen>\n        001\n        </wfc:bodega_origen>\n        <wfc:cedulaEmpleado>\n        1003195995\n        </wfc:cedulaEmpleado>\n        <wfc:centro_destino>\n        1201201200\n        </wfc:centro_destino>\n        <wfc:listaDetalle>\n            <wfc:NodoDetalle>\n                <wfc:cantidad>\n                3\n                </wfc:cantidad>\n                <wfc:codigoProd>\n                04203\n                </wfc:codigoProd>\n                <wfc:secuencia>\n                1\n                </wfc:secuencia>\n            </wfc:NodoDetalle>\n        </wfc:listaDetalle>\n    </tem:cabecera>\n</tem:CARGARXML>';

      let config = {
        method: 'post',
        url: 'http://192.168.251.178/ws_uniformesOC/Service1.svc?wsdl',
        headers: {
          'Content-Type': 'application/xml'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.log('error xml request', error);
        });
    });
  };

  const columns = [
    {
      title: 'N°',
      width: 70,
      dataIndex: 'id',
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cédula',
      dataIndex: ['employee', 'CEDULA'],
      ...getColumnSearchProps('Cédula'),
      sorter: (a, b) => +a?.employee?.CEDULA - +b?.employee?.CEDULA,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: ['employee', 'COLABORADOR'],
      ...getColumnSearchProps('collaborator'),
      sorter: (a, b) => a.employee?.COLABORADOR?.localeCompare(b.employee?.COLABORADOR),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: ['employee', 'CARGO'],
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a?.employee?.CARGO?.localeCompare(b?.employee?.CARGO),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: ['employee', 'NOMBRE_CENTRO_COSTOS'],
      ...getColumnSearchProps('administrativeDistribution'),
      sorter: (a, b) =>
        a?.employee?.NOMBRE_CENTRO_COSTOS?.localeCompare(b?.employee?.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Código oficina ',
      dataIndex: ['employee', 'CODIGO_OFICINA'],
      ...getColumnSearchProps('officePosition'),
      sorter: (a, b) => a?.employee?.CODIGO_OFICINA?.localeCompare(b?.employee?.CODIGO_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: ['employee', 'NOMBRE_OFICINA'],
      ...getColumnSearchProps('officeName'),
      sorter: (a, b) => a?.employee?.NOMBRE_OFICINA?.localeCompare(b?.employee?.NOMBRE_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: ['employee', 'TALLA'],
      with: 50,
      ...getColumnSearchProps('size'),
      sorter: (a, b) => a?.employee?.TALLA?.localeCompare(b?.employee?.TALLA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripcion',
      dataIndex: ['producto', 'descripcion'],
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a?.producto?.descripcion?.localeCompare(b?.producto?.descripcion),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Uniforme a enviar',
      dataIndex: ['correctSize', 'descripcion'],
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a?.correctSize?.descripcion?.localeCompare(b?.correctSize?.descripcion),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('requestDate'),
      sorter: (a, b) => a.requestDate - b.requestDate,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      }
    },
    {
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason?.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tiempo desde la última reposición',
      dataIndex: 'dateConsumptionOrder',
      ...getColumnSearchProps('tiempo desde la última reposición'),
      sorter: (a, b) => a.dateConsumptionOrder?.localeCompare(b.dateConsumptionOrder),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).from(new Date())}</div>;
      }
    },
    {
      title: 'Estado de la solicitud',
      dataIndex: 'requestStatus',
      ...getColumnSearchProps('requestStatus'),
      sorter: (a, b) => a.requestStatus?.localeCompare(b.requestStatus),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha orden de consumo.',
      dataIndex: 'dateConsumptionOrder',
      ...getColumnSearchProps('dateConsumptionOrder'),
      sorter: (a, b) => a.dateConsumptionOrder?.localeCompare(b?.dateConsumptionOrder),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      }
    },
    {
      title: 'Proxima reposicion',
      dataIndex: 'nextReplacement',
      ...getColumnSearchProps('proxima reposicion'),
      sorter: (a, b) =>
        new Date(a.nextReplacement).valueOf() - new Date(b.nextReplacement).valueOf(),
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{moment(_).format('YYYY-MM-DD')}</div>;
      },
      defaultSortOrder: 'ascend'
    },

    {
      title: 'N° Orden de consumo',
      dataIndex: 'consumptionOrderNumber',
      ...getColumnSearchProps('consumptionOrderNumber'),
      sorter: (a, b) => a?.consumptionOrderNumber?.localeCompare(b?.consumptionOrderNumber),
      sortDirections: ['descend', 'ascend']
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
    createOrder(addingFile).then(() => {
      getOrdersTable();
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
    dateRange
  };
};
