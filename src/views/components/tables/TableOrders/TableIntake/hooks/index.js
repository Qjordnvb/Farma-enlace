import {useState} from 'react';
import {useUtils} from 'hooks';

export const useCustomIntake = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const {getColumnSearchProps} = useUtils();
  const [options, setOptions] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      n: `1`,
      id: `112131311`,
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
      n: `2`,
      id: `112131311`,
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
      n: `3`,
      id: `112131311`,
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
  const sucursales = ['1', '2', '3', '4', '5'];
  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const distribuciones = [
    'Distribución Administrativa 1',
    'Distribución Administrativa 2',
    'Distribución Administrativa 3'
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  // a.- Cédula
  // b.- Colaborador
  // c.- Cargo
  // d.- Distribución Administrativa
  // e.- Código Centro de Gestión
  // f.- Centro de Gestión
  // g.- Nombre Oficina
  // h.- Talla
  // h.- Descripción
  // i.- Fecha de solicitud
  // j.- Motivo
  // k.- Tiempo desde la última reposición
  // l.- Estado de la solicitud.
  // m.- Fecha de OC (Orden de consumo).
  // n.- N° de Orde de consumo

  const columns = [
    {
      title: 'N°',
      width: 70,
      dataIndex: 'n',
      sorter: (a, b) => a.n.length - b.n.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cédula',
      dataIndex: 'id',
      ...getColumnSearchProps('Cédula'),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'colaborador',
      ...getColumnSearchProps('Colaborador'),
      sorter: (a, b) => a.colaborador.length - b.colaborador.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'cargo',
      ...getColumnSearchProps('Cargo'),
      sorter: (a, b) => a.cargo.length - b.cargo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'distribution',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.distribution.length - b.distribution.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Código oficina ',
      dataIndex: 'idOfi',
      ...getColumnSearchProps('Código oficina '),
      sorter: (a, b) => a.idOfi.length - b.idOfi.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: 'nameOfi',
      ...getColumnSearchProps('nameOfi'),
      sorter: (a, b) => a.nameOfi.length - b.nameOfi.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      with: 50,
      ...getColumnSearchProps('Talla'),
      sorter: (a, b) => a.talla.length - b.talla.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      ...getColumnSearchProps('Descripcion'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de solicitud',
      dataIndex: 'fechaSolicitud',
      ...getColumnSearchProps('Fecha de solicitud'),
      sorter: (a, b) => a.fechaSolicitud.length - b.fechaSolicitud.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Motivo',
      dataIndex: 'motivo',
      ...getColumnSearchProps('Motivo'),
      sorter: (a, b) => a.motivo.length - b.motivo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Tiempo desde la última reposición',
      dataIndex: 'ultimaReposicion',
      ...getColumnSearchProps('Tiempo desde la última reposición'),
      sorter: (a, b) => a.ultimaReposicion.length - b.ultimaReposicion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado de la solicitud',
      dataIndex: 'estadoSolicitud',
      ...getColumnSearchProps('Estado de la solicitud'),
      sorter: (a, b) => a.estadoSolicitud.length - b.estadoSolicitud.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha orden de consumo.',
      dataIndex: 'fechaOC',
      ...getColumnSearchProps('Motivo'),
      sorter: (a, b) => a.fechaOC.length - b.fechaOC.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'N° Orden de consumo',
      dataIndex: 'numeroOC',
      ...getColumnSearchProps('N° Orden de consumo'),
      sorter: (a, b) => a.numeroOC.length - b.numeroOC.length,
      sortDirections: ['descend', 'ascend']
    }
  ];

  const resetAdd = () => {
    setIsAdd(false);
    setAddingFile(null);
  };

  const onAddFile = (record) => {
    setIsAdd(true);
    setAddingFile({...record});
    setDataSource(() => {
      return [...dataSource];
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
    sucursales,
    tallas,
    distribuciones
  };
};
