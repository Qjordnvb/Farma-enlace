import {useState} from 'react';
import {useUtils} from 'hooks';

export const useCustomDiscount = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {getColumnSearchProps} = useUtils();

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      n: `1`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      cuotas: `4`
    },
    {
      key: '2',
      n: `2`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      cuotas: `4`
    },
    {
      key: '3',
      n: `3`,
      colaborador: `ABAD GAONA LADY ABIGAIL 1`,
      cargo: `ASISTENTE SENIOR 1`,
      distribution: 'Distribución Administrativa',
      idOfi: `2321`,
      nameOfi: `Farmados 1`,
      talla: `M`,
      kits: `asfaweadw`,
      fecha: `2/03/2022`,
      cuotas: `4`
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
      title: 'Cuotas',
      dataIndex: 'cuotas',
      ...getColumnSearchProps('Cuotas'),
      sorter: (a, b) => a.cuotas.length - b.cuotas.length,
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
