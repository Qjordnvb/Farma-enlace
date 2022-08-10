import {useState, useEffect} from 'react';
import {useUtils} from 'hooks';
export const useCustomUniforms = () => {
  const {getColumnSearchProps, getTableParameters} = useUtils();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const dataTable = async function () {
    setLoading(true);
    const response = await getTableParameters();
    console.log('dataa table', response);
    setDataSource(response);
    setLoading(false);
  };

  useEffect(() => {
    dataTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      dataIndex: 'descripcion',
      width: '20%',
      ...getColumnSearchProps('descripcion'),
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
      dataIndex: 'pvp',
      width: '15%',
      ...getColumnSearchProps('pvp'),
      sorter: (m, n) => m.ppt.length - n.ppt.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      width: '10%',
      ...getColumnSearchProps('status'),
      sorter: (o, p) => o.estado.length - p.estado.length,
      sortDirections: ['descend', 'ascend']
    }
  ];

  return {
    columns,
    dataSource,
    dataTable,
    setDataSource,
    loading
  };
};
