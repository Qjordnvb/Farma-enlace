import {useState} from 'react';
import {useUtils} from 'hooks';
export const useCustomUniforms = () => {
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      codigo: '0000115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '2',
      codigo: '0000115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '3',
      codigo: '0000115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '4',
      codigo: '0000115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '5',
      codigo: '001200115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '6',
      codigo: '001200115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$100',
      estado: 'Activo'
    },
    {
      key: '7',
      codigo: '000120115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$500',
      estado: 'Activo'
    },
    {
      key: '8',
      codigo: '021000115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '9',
      codigo: '01213115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Sierra',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '10',
      codigo: '001200115105',
      marca: 'Economica',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Bogota',
      ppt: '$500',
      estado: 'Activo'
    },
    {
      key: '11',
      codigo: '043000115105',
      marca: 'Costosa',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Bogota',
      ppt: '$1,000',
      estado: 'Activo'
    },
    {
      key: '12',
      codigo: '0000115105',
      marca: 'Costosa',
      description: 'ZP PRV KIT HOMBRE T-M-38',
      genero: 'Hombre',
      talla: 'XL',
      region: 'Bogota',
      ppt: '$100',
      estado: 'Activo'
    }
  ]);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      width: '15%',
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      width: '15%',
      ...getColumnSearchProps('marca'),
      sorter: (c, d) => c.marca.length - d.marca.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      width: '20%',
      ...getColumnSearchProps('description'),
      sorter: (e, f) => e.description.length - f.description.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      width: '10%',
      ...getColumnSearchProps('genero'),
      sorter: (g, h) => g.genero.length - h.genero.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      width: '5%',
      ...getColumnSearchProps('talla'),
      sorter: (i, j) => i.talla.length - j.talla.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'region',
      width: '10%',
      ...getColumnSearchProps('region'),
      sorter: (k, l) => k.region.length - l.region.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'PPT Maestro',
      dataIndex: 'ppt',
      width: '15%',
      ...getColumnSearchProps('ppt'),
      sorter: (m, n) => m.ppt.length - n.ppt.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      width: '10%',
      ...getColumnSearchProps('estado'),
      sorter: (o, p) => o.estado.length - p.estado.length,
      sortDirections: ['descend', 'ascend']
    }
  ];

  return {
    columns,
    dataSource,
    setDataSource
  };
};
