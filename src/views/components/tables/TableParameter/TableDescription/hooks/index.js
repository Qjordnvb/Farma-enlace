import {useState} from 'react';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomDescription = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const {getColumnSearchProps} = useUtils();
  const [dataSource, setDataSource] = useState([
    {
      n: 1,
      code: '0000115105',
      description: 'ZP PRV KIT ECO HOMBRE T-M-38',
      garments: 'New York No. 1 Lake Park',
      brand: 'Costosa',
      region: 'Sierra',
      garment1: '3',
      garment2: '0',
      garment3: '1',
      garment4: '0',
      garment5: '2',
      garment6: '0'
    },
    {
      n: 2,
      code: '0000115105',
      description: 'ZP PRV KIT ECO HOMBRE T-M-38',
      garments: 'New York No. 1 Lake Park',
      brand: 'Económica',
      region: 'Sierra',
      garment1: '3',
      garment2: '0',
      garment3: '1',
      garment4: '0',
      garment5: '2',
      garment6: '0'
    }
  ]);

  const onEditFile = (record) => {
    setIsEditing(true);
    setEditingFile({...record});
  };

  const columns = [
    {
      key: '1',
      title: 'N°',
      dataIndex: 'n'
    },
    {
      key: '2',
      title: 'Código Producto',
      dataIndex: 'code',
      ...getColumnSearchProps('code'),
      sorter: (a, b) => a.code.length - b.code.length,
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
      dataIndex: 'garments'
    },
    {
      key: '5',
      title: 'Marca',
      dataIndex: 'brand',
      ...getColumnSearchProps('brand'),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '6',
      title: 'Región',
      dataIndex: 'region',
      ...getColumnSearchProps('region'),
      sorter: (a, b) => a.region.length - b.region.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '7',
      title: 'Acción',
      render: (record) => {
        return (
          <div
            onClick={() => {
              onEditFile(record);
            }}
            className="btn-edit"
          >
            <img src={BtnEdit} alt="btn-edit" />
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
