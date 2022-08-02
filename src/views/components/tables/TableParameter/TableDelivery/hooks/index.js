import {useState} from 'react';

export const useCustomDelivery = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      n: 1,
      motivo: 'Personal Nuevo',
      description: 'ZP PRV KIT ECO HOMBRE T-M-38',
      prendas: '',
      reposicion: '0 Días',
      calculo: 'Désde fecha de ingreso',
      cobro: 'SI',
      garment1: '3',
      garment2: '0',
      garment3: '1',
      garment4: '0',
      garment5: '2',
      garment6: '0'
    },
    {
      n: 2,
      motivo: 'Personal Nuevo',
      description: 'ZP PRV KIT ECO HOMBRE T-M-38',
      prendas: '',
      reposicion: '0 Días',
      calculo: 'Désde fecha de ingreso',
      cobro: 'SI',
      garment1: '3',
      garment2: '0',
      garment3: '1',
      garment4: '0',
      garment5: '2',
      garment6: '0'
    }
  ]);

  const columns = [
    {
      key: '1',
      title: 'N°',
      dataIndex: 'n'
    },
    {
      key: '2',
      title: 'Motivo',
      dataIndex: 'motivo'
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'description'
    },
    {
      key: '4',
      title: 'Prendas',
      children: [
        {
          title: 'Mandil blanco',
          dataIndex: 'garment1',
          key: 'garment1'
        },
        {
          title: 'Mandil azul',
          dataIndex: 'garment2',
          key: 'garment2'
        },
        {
          title: 'Camiseta',
          dataIndex: 'garment3',
          key: 'garment3'
        },
        {
          title: 'Buso',
          dataIndex: 'garment4',
          key: 'garment4'
        },
        {
          title: 'Chompa',
          dataIndex: 'garment5',
          key: 'garment5'
        },
        {
          title: 'Escarapela',
          dataIndex: 'garment6',
          key: 'garment6'
        }
      ],
      dataIndex: 'prendas'
    },
    {
      key: '5',
      title: 'Reposición',
      dataIndex: 'reposicion'
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculo'
    },
    {
      key: '7',
      title: 'Cobro',
      dataIndex: 'cobro'
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
