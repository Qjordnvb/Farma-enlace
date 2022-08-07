import {useState} from 'react';
import {useUtils} from 'hooks';

export const useCustomDelivery = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      n: 1,
      motivo: 'Personal Nuevo',
      description: 'ZP PRV KIT ECO HOMBRE T-M-38',
      prendas: '',
      reposicion: '0 Días',
      calculo: 'Désde fecha de ingreso',
      cobro: 'NO',
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
      dataIndex: 'motivo',
      ...getColumnSearchProps('motivo'),
      sorter: (a, b) => a.motivo.length - b.motivo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'description',
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
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
      dataIndex: 'reposicion',
      ...getColumnSearchProps('reposicion'),
      sorter: (a, b) => a.reposicion.length - b.reposicion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculo',
      ...getColumnSearchProps('calculo'),
      sorter: (a, b) => a.calculo.length - b.calculo.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '7',
      title: 'Cobro',
      dataIndex: 'cobro',
      ...getColumnSearchProps('cobro'),
      sorter: (a, b) => a.cobro.length - b.cobro.length,
      sortDirections: ['descend', 'ascend']
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
