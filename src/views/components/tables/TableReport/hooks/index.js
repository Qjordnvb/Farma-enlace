import {useState} from 'react';
import {useUtils} from 'hooks';

export const useCustomReport = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {getColumnSearchProps} = useUtils();

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      n: `1`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idCentroGestion: `2321`,
      centroG: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      motivo: `Personal nuevo`,
      ultimaReposicion: `15 dias`
    },
    {
      key: '2',
      n: `2`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idCentroGestion: `2321`,
      centroG: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      motivo: `Personal nuevo`,
      ultimaReposicion: `15 dias`
    },
    {
      key: '3',
      n: `3`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idCentroGestion: `2321`,
      centroG: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      motivo: `Personal nuevo`,
      ultimaReposicion: `15 dias`
    }
  ]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns = [
    //  idCentroGestion: `2321`,
    // centroG: `Farmados 1`,
    // talla: `M`,
    // kits: `asfaweadw`,
    // fecha: `2/03/2022`,
    // motivo: `Personal nuevo`,
    // ultimaReposicion: `15 dias`
    {
      title: 'N°',
      width: 70,
      dataIndex: 'n',
      sorter: (a, b) => a.n.length - b.n.length,
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
      title: 'Código Centro de Gestión',
      dataIndex: 'idCentroGestion',
      ...getColumnSearchProps('Código Centro de Gestión'),
      sorter: (a, b) => a.idCentroGestion.length - b.idCentroGestion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Centro de Gestión',
      dataIndex: 'centroG',
      ...getColumnSearchProps('Centro de Gestión'),
      sorter: (a, b) => a.centroG.length - b.centroG.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      with: 40,
      ...getColumnSearchProps('Talla'),
      sorter: (a, b) => a.talla.length - b.talla.length,
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
      dataIndex: 'fecha',
      ...getColumnSearchProps('Fecha'),
      sorter: (a, b) => a.fecha.length - b.fecha.length,
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
    }
  ];

  return {
    columns,
    rowSelection,
    dataSource,
    setDataSource
  };
};
