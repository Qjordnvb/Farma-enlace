import {useState} from 'react';

import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomReplacement = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      n: '1',
      codigo: '115105',
      descripcion: 'ZP PRV KIT ECO HOMBRE T-M-38',
      talla: 'M',
      genero: 'HOMBRE',
      porcentaje: '30%',
      replacement: '15 días',
      sugeridoMinimo: '10',
      sugeridoMaximo: '20',
      ultimaM: '10',
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
      ultimaM: '10',
      fechaM: '10/10/2020'
    }
  ]);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const columns = [
    {
      key: '0',
      title: 'N°',
      dataIndex: 'n'
    },
    {
      key: '1',
      title: 'Código bodega',
      dataIndex: 'codigo'
    },
    {
      key: '2',
      title: 'Descripción',
      dataIndex: 'descripcion'
    },
    {
      key: '3',
      title: 'Talla',
      dataIndex: 'talla'
    },
    {
      key: '4',
      title: 'Genero',
      dataIndex: 'genero'
    },
    {
      key: '5',
      title: 'Porcentajes',
      dataIndex: 'porcentaje'
    },
    {
      key: '6',
      title: 'Reposición',
      dataIndex: 'replacement'
    },
    {
      key: '7',
      title: 'Sugerido mínimo',
      dataIndex: 'sugeridoMinimo'
    },
    {
      key: '8',
      title: 'Sugerido máximo',
      dataIndex: 'sugeridoMaximo'
    },
    {
      key: '9',
      title: 'Última modificación',
      dataIndex: 'ultimaM'
    },
    {
      key: '10',
      title: 'Fecha de modificación',
      dataIndex: 'fechaM'
    },
    {
      key: '11',
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

  const resetEditing = () => {
    setIsEditing(false);
    setEditingFile(null);
  };

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
    onAddFile
  };
};
