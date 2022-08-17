import {useState, useRef, useEffect} from 'react';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

export const useCustomOrders = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [options, setOptions] = useState([]);
  const inputFileRef = useRef(null);
  const sucursales = ['1', '2', '3', '4', '5'];
  const tallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const distribuciones = [
    'Distribución Administrativa 1',
    'Distribución Administrativa 2',
    'Distribución Administrativa 3'
  ];
  const {getColumnSearchProps, bulkSizeUpdate, getEmployees, updateEmployeeSize} = useUtils();
  const [dataSource, setDataSource] = useState([]);

  const getEmployeesTable = () => {
    getEmployees().then((res) => {
      setDataSource(res);
    });
  };

  useEffect(() => {
    getEmployeesTable();
  }, []);

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
      dataIndex: 'id',
      ...getColumnSearchProps('N°'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend'
    },
    {
      title: 'Cédula',
      dataIndex: 'CEDULA',
      ...getColumnSearchProps('CEDULA'),
      sorter: (a, b) => a.CEDULA.length - b.CEDULA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Colaborador',
      dataIndex: 'COLABORADOR',
      ...getColumnSearchProps('COLABORADOR'),
      sorter: (a, b) => a.COLABORADOR.length - b.COLABORADOR.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Cargo',
      dataIndex: 'CARGO',
      ...getColumnSearchProps('CARGO'),
      sorter: (a, b) => a.CARGO.length - b.CARGO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'GENERO',
      ...getColumnSearchProps('GENERO'),
      sorter: (a, b) => a.GENERO.length - b.GENERO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Sucursal',
      dataIndex: 'SUCURSAL',
      ...getColumnSearchProps('SUCURSAL'),
      sorter: (a, b) => a.SUCURSAL.length - b.SUCURSAL.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'REGION',
      ...getColumnSearchProps('REGION'),
      sorter: (a, b) => a.REGION.length - b.REGION.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Fecha de ingreso',
      dataIndex: 'FECHA_INGRESO',
      ...getColumnSearchProps('Fecha de ingreso'),
      sorter: (a, b) => a.FECHA_INGRESO.length - b.FECHA_INGRESO.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Distribución Administrativa',
      dataIndex: 'DISTRIBUCION',
      ...getColumnSearchProps('Distribución Administrativa'),
      sorter: (a, b) => a.DISTRIBUCION.length - b.DISTRIBUCION.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Número oficina',
      dataIndex: 'CODIGO_OFICINA',
      ...getColumnSearchProps('Número oficina'),
      sorter: (a, b) => a.CODIGO_OFICINA.length - b.CODIGO_OFICINA.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nombre de la oficina',
      dataIndex: 'NOMBRE_OFICINA',
      ...getColumnSearchProps('NOMBRE_OFICINA'),
      sorter: (a, b) => a.NOMBRE_OFICINA.length - b.NOMBRE_OFICINA.length,
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

  const handleInputFile = () => {
    let file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);
    bulkSizeUpdate(formData).then(() => {
      //TODO: Show success or error message, maybe add modal
    });
  };

  const onSizeUpdate = () => {
    updateEmployeeSize(editingFile).then(() => {
      getEmployeesTable();
      resetEditing();
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
    setEditingFile,
    handleInputFile,
    inputFileRef,
    onSizeUpdate
  };
};
