import {useState, useEffect} from 'react';
import {useUtils} from 'hooks';

export const useCustomIntake = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const {getColumnSearchProps, createOrder, getOrders, getEmployees} = useUtils();
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

  useEffect(() => {
    getOrdersTable();
    getEmployeesList();
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
      dataIndex: 'ci',
      ...getColumnSearchProps('ci'),
      sorter: (a, b) => a.ci.length - b.ci.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'collaborator',
      ...getColumnSearchProps('collaborator'),
      sorter: (a, b) => a.collaborator.length - b.collaborator.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a.position.length - b.position.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'administrativeDistribution',
      ...getColumnSearchProps('administrativeDistribution'),
      sorter: (a, b) => a.administrativeDistribution.length - b.administrativeDistribution.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Código oficina ',
      dataIndex: 'officePosition',
      ...getColumnSearchProps('officePosition'),
      sorter: (a, b) => a.idOfi.length - b.officePosition.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: 'officeName',
      ...getColumnSearchProps('officeName'),
      sorter: (a, b) => a.officeName.length - b.officeName.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'size',
      with: 50,
      ...getColumnSearchProps('size'),
      sorter: (a, b) => a.size.length - b.size.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'requestDate',
      ...getColumnSearchProps('requestDate'),
      sorter: (a, b) => a.requestDate.length - b.requestDate.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason.length - b.reason.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tiempo desde la última reposición',
      dataIndex: 'timeSinceLastReplacement',
      ...getColumnSearchProps('timeSinceLastReplacement'),
      sorter: (a, b) => a.timeSinceLastReplacement.length - b.timeSinceLastReplacement.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado de la solicitud',
      dataIndex: 'requestStatus',
      ...getColumnSearchProps('requestStatus'),
      sorter: (a, b) => a.requestStatus.length - b.requestStatus.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha orden de consumo.',
      dataIndex: 'dateConsumptionOrder',
      ...getColumnSearchProps('dateConsumptionOrder'),
      sorter: (a, b) => a.dateConsumptionOrder.length - b.dateConsumptionOrder.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'N° Orden de consumo',
      dataIndex: 'consumptionOrderNumber',
      ...getColumnSearchProps('consumptionOrderNumber'),
      sorter: (a, b) => a.consumptionOrderNumber.length - b.consumptionOrderNumber.length,
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
    employeesList
  };
};
