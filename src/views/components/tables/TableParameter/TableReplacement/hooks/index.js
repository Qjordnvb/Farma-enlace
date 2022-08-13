import {useEffect, useState} from 'react';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomReplacement = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [editId, setEditId] = useState();
  const {getColumnSearchProps, getAllRepositionParameters, editRepositionParameter} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      n: '1',
      codigo: '115105',
      descripcion: 'ZP PRV KIT ECO HOMBRE T-M-38',
      talla: 'M',
      genero: 'HOMBRE',
      porcentaje: '30%',
      replacement: '10 días',
      sugeridoMinimo: '10',
      sugeridoMaximo: '20',
      ultimaM: 'jjarrin',
      fechaM: '10/10/2020'
    },
    {
      id: 2,
      n: '2',
      codigo: '115105',
      descripcion: 'ZP PRV KIT ECO HOMBRE T-M-38',
      talla: 'M',
      genero: 'HOMBRE',
      porcentaje: '30%',
      replacement: '15 días',
      sugeridoMinimo: '10',
      sugeridoMaximo: '20',
      ultimaM: 'jjalvarez',
      fechaM: '10/10/2020'
    }
  ]);

  useEffect(() => {
    getAllRepositionParameters().then((res) => {
      setDataSource(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditId(record.id);
  };

  const columns = [
    {
      key: '0',
      title: 'N°',
      dataIndex: 'id'
    },
    {
      key: '1',
      title: 'Código bodega',
      dataIndex: 'codigo',
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '2',
      title: 'Descripción',
      dataIndex: 'descripcion',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion.length - b.descripcion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Talla',
      dataIndex: 'talla',
      ...getColumnSearchProps('talla'),
      sorter: (a, b) => a.talla.length - b.talla.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '4',
      title: 'Genero',
      dataIndex: 'genero',
      ...getColumnSearchProps('genero'),
      sorter: (a, b) => a.genero.length - b.genero.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '5',
      title: 'Porcentajes',
      dataIndex: 'porcentaje',
      ...getColumnSearchProps('porcentaje'),
      sorter: (a, b) => a.porcentaje.length - b.porcentaje.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '6',
      title: 'Reposición',
      dataIndex: 'reposicion',
      ...getColumnSearchProps('reposicion'),
      sorter: (a, b) => a.reposicion.length - b.reposicion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '7',
      title: 'Sugerido mínimo',
      dataIndex: 'sugeridoMinimo',
      ...getColumnSearchProps('sugeridoMinimo'),
      sorter: (a, b) => a.sugeridoMinimo.length - b.sugeridoMinimo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '8',
      title: 'Sugerido máximo',
      dataIndex: 'sugeridoMaximo',
      ...getColumnSearchProps('sugeridoMaximo'),
      sorter: (a, b) => a.sugeridoMaximo.length - b.sugeridoMaximo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '9',
      title: 'Última modificación',
      dataIndex: 'ultimaActualizacion',
      ...getColumnSearchProps('ultimaActualizacion'),
      sorter: (a, b) => a.ultimaActualizacion.length - b.ultimaActualizacion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '10',
      title: 'Fecha de modificación',
      dataIndex: 'updatedAt',
      ...getColumnSearchProps('fechaM'),
      sorter: (a, b) => a.updatedAt.length - b.updatedAt.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '11',
      title: 'Acción',
      width: '15%',
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

  const resetEditing = () => {
    setIsEditing(false);
    setEditingFile(null);
    setEditId(null);
  };

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

  const onEditReplacement = async () => {
    editRepositionParameter({...editingFile, id: editId}).then(() => {
      getAllRepositionParameters().then((res) => {
        setDataSource(res);
      });
    });
  };

  return {
    dataSource,
    setDataSource,
    isEditing,
    setIsEditing,
    editingFile,
    setEditingFile,
    columns,
    isAdd,
    setIsAdd,
    addingFile,
    setAddingFile,
    resetEditing,
    resetAdd,
    onAddFile,
    onEditReplacement
  };
};
