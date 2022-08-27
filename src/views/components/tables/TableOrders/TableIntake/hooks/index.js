import {useState, useEffect} from 'react';
import {useUtils} from 'hooks';

export const useCustomIntake = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const {getColumnSearchProps, createOrder, getOrders, getEmployees, getTableParameters} =
    useUtils();
  const [options, setOptions] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      n: `1`,
      id: `1121313114`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      description: `asfaweadw`,
      fechaSolicitud: `2/03/2022`,
      motivo: `asfaweadw`,
      ultimaReposicion: `2/03/2022`,
      estadoSolicitud: `Pendiente 1`,
      fechaOC: `2/03/2022`,
      numeroOC: `1231`
    },
    {
      key: '2',
      n: `2`,
      id: `1121313115`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      description: `asfaweadw`,
      fechaSolicitud: `2/03/2022`,
      motivo: `asfaweadw`,
      ultimaReposicion: `2/03/2022`,
      estadoSolicitud: `Pendiente 1`,
      fechaOC: `2/03/2022`,
      numeroOC: `1231`
    },
    {
      key: '3',
      n: `3`,
      id: `1121313116`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      description: `asfaweadw`,
      fechaSolicitud: `2/03/2022`,
      motivo: `asfaweadw`,
      ultimaReposicion: `2/03/2022`,
      estadoSolicitud: `Pendiente 1`,
      fechaOC: `2/03/2022`,
      numeroOC: `1231`
    }
  ]);

  const [employeesList, setEmployeesList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const getOrdersTable = () => {
    getOrders().then((res) => {
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
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cédula',
      dataIndex: ['employee', 'CEDULA'],
      ...getColumnSearchProps('Cédula'),
      sorter: (a, b) => +a.employee.CEDULA - +b.employee.CEDULA,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: ['employee', 'COLABORADOR'],
      ...getColumnSearchProps('collaborator'),
      sorter: (a, b) => a.employee.COLABORADOR.localeCompare(b.employee),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: ['employee', 'CARGO'],
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a.employee.CARGO.localeCompare(b.employee.CARGO),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: ['employee', 'NOMBRE_CENTRO_COSTOS'],
      ...getColumnSearchProps('administrativeDistribution'),
      sorter: (a, b) =>
        a.employee.NOMBRE_CENTRO_COSTOS.localeCompare(b.employee.NOMBRE_CENTRO_COSTOS),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Código oficina ',
      dataIndex: ['employee', 'CODIGO_OFICINA'],
      ...getColumnSearchProps('officePosition'),
      sorter: (a, b) => a.employee.CODIGO_OFICINA.localeCompare(b.employee.CODIGO_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: ['employee', 'NOMBRE_OFICINA'],
      ...getColumnSearchProps('officeName'),
      sorter: (a, b) => a.employee.NOMBRE_OFICINA.localeCompare(b.employee.NOMBRE_OFICINA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: ['employee', 'TALLA'],
      with: 50,
      ...getColumnSearchProps('size'),
      sorter: (a, b) => a.employee.TALLA.localeCompare(b.employee.TALLA),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripcion',
      dataIndex: ['producto', 'descripcion'],
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.employee.descripcion.localeCompare(b.employee.descripcion),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('requestDate'),
      sorter: (a, b) => a.requestDate - b.requestDate,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tiempo desde la última reposición',
      dataIndex: 'timeSinceLastReplacement',
      ...getColumnSearchProps('timeSinceLastReplacement'),
      sorter: (a, b) => a.timeSinceLastReplacement.localeCompare(b.timeSinceLastReplacement),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado de la solicitud',
      dataIndex: 'requestStatus',
      ...getColumnSearchProps('requestStatus'),
      sorter: (a, b) => a.requestStatus.localeCompare(b.requestStatus),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha orden de consumo.',
      dataIndex: 'dateConsumptionOrder',
      ...getColumnSearchProps('dateConsumptionOrder'),
      sorter: (a, b) => a.dateConsumptionOrder - b.dateConsumptionOrder,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'N° Orden de consumo',
      dataIndex: 'consumptionOrderNumber',
      ...getColumnSearchProps('consumptionOrderNumber'),
      sorter: (a, b) => a.consumptionOrderNumber - b.consumptionOrderNumber,
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
    productsList
  };
};
