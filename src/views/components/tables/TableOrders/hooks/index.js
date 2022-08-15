import {useState} from 'react';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomOrders = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [options, setOptions] = useState([]);

  const sucursales = ['1', '2', '3', '4', '5'];
  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const distribuciones = [
    'Distribución Administrativa 1',
    'Distribución Administrativa 2',
    'Distribución Administrativa 3'
  ];
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      n: '1',
      id: '1724567890',
      colaborador: 'ABAD GAONA LADY ABIGAIL',
      cargo: 'ASISTENTE SENIOR',
      genero: 'MUJER',
      sucursal: 'Sucursal',
      region: 'Bogotá',
      fechaIngreso: '2/03/2022',
      distribution: 'Distribución Administrativa',
      numberOfi: '123',
      nameOfi: 'Farmados'
    },
    {
      key: '2',
      n: '2',
      id: '1724567890',
      colaborador: 'ABAD GAONA LADY ABIGAIL',
      cargo: 'ASISTENTE SENIOR',
      genero: 'MUJER',
      sucursal: 'Sucursal',
      region: 'Bogotá',
      fechaIngreso: '2/03/2022',
      distribution: 'Distribución Administrativa',
      numberOfi: '123',
      nameOfi: 'Farmados'
    },
    {
      key: '3',
      n: '3',
      id: '1724567890',
      colaborador: 'ABAD GAONA LADY ABIGAIL',
      cargo: 'ASISTENTE SENIOR',
      genero: 'MUJER',
      sucursal: 'Sucursal',
      region: 'Bogotá',
      fechaIngreso: '2/03/2022',
      distribution: 'Distribución Administrativa',
      numberOfi: '123',
      nameOfi: 'Farmados'
    }
  ]);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingFile(null);
  };

  const columns = [
    {
      title: 'N°',
      dataIndex: 'n',
      ...getColumnSearchProps('N°'),
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
      title: 'Género',
      dataIndex: 'genero',
      ...getColumnSearchProps('Género'),
      sorter: (a, b) => a.genero.length - b.genero.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Sucursal',
      dataIndex: 'sucursal',
      ...getColumnSearchProps('Sucursal'),
      sorter: (a, b) => a.sucursal.length - b.sucursal.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'region',
      ...getColumnSearchProps('Región'),
      sorter: (a, b) => a.region.length - b.region.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de ingreso',
      dataIndex: 'fechaIngreso',
      ...getColumnSearchProps('Fecha de ingreso'),
      sorter: (a, b) => a.fechaIngreso.length - b.fechaIngreso.length,
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
      title: 'Número oficina',
      dataIndex: 'numberOfi',
      ...getColumnSearchProps('Número oficina'),
      sorter: (a, b) => a.numberOfi.length - b.numberOfi.length,
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
      title: 'Acción',
      render: (record) => {
        return (
          <div className="flex-action">
            <div
              onClick={() => {
                onEditFile(record);
              }}
              className="btn-edit"
            >
              <img src={BtnEdit} alt="btn-edit" />
            </div>
          </div>
        );
      }
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
    dataSource,
    setDataSource,
    isAdd,
    addingFile,
    resetAdd,
    onAddFile,
    setAddingFile,
    sucursales,
    tallas,
    distribuciones,
    options,
    setOptions,
    isEditing,
    editingFile,
    resetEditing,
    onEditFile,
    setEditingFile
  };
};
