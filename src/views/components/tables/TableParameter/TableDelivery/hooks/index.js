import {useState, useEffect} from 'react';
import {useUtils} from 'hooks';

export const useCustomDelivery = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [addingFile, setAddingFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const {
    getColumnSearchProps,
    getAllDeliveries,
    getGarmentsTableParameters,
    getTableParameters,
    getReasonsTableParameters,
    createDelivery
  } = useUtils();
  const [garments, setGarments] = useState([]);
  const [garmentsColumns, setGarmentsColumns] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [reasonsList, setReasonsList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [formatDataSource, setFormatDataSource] = useState([]);

  const formatAllDeliveries = (data) => {
    let newData = data.map((delivery) => {
      let newParamGarments = delivery.producto.garmentTypes.reduce(function (res, garmentType) {
        res[`garment${garmentType.garmentId}`] = garmentType.quantity;
        return res;
      }, {});

      let newDelivery = {
        ...delivery,
        ...delivery.producto,
        ...delivery.parameterizedReason,
        ...newParamGarments
      };
      delete newDelivery.parameterizedReason;
      delete newDelivery.producto;
      delete newDelivery.garmentTypes;
      return newDelivery;
    });

    newData = newData.map((delivery) => {
      let newDelivery = delivery;

      garments.map((garment) => {
        let index = `garment${garment.id}`;
        if (!newDelivery[index]) {
          newDelivery[index] = 0;
        }
      });
      return newDelivery;
    });

    setFormatDataSource(newData);
  };

  useEffect(() => {
    formatAllDeliveries(dataSource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, garments]);

  useEffect(() => {
    getGarmentsTableParameters().then((res) => {
      setGarments(res);
    });
    getAllDeliveries().then((response) => {
      setDataSource(response);
    });

    getTableParameters().then((res) => {
      setProductsList(res);
    });
    getReasonsTableParameters().then((res) => {
      setReasonsList(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let getColumns = garments.map((garment) => {
      return {
        title: garment.description,
        dataIndex: `garment${garment.id}`,
        editable: true
      };
    });
    setGarmentsColumns(getColumns);
  }, [garments]);

  const onCreateDelivery = () => {
    createDelivery({...addingFile}).then(() => {
      getAllDeliveries().then((res) => {
        formatAllDeliveries(res);
      });
    });
  };

  const columns = [
    {
      key: '1',
      title: 'N°',
      dataIndex: 'id'
    },
    {
      key: '2',
      title: 'Motivo',
      dataIndex: 'reason',
      ...getColumnSearchProps('reason'),
      sorter: (a, b) => a.reason.length - b.reason.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'descripcion',
      width: '10%',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion.length - b.descripcion.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '4',
      title: 'Prendas',
      children: [...garmentsColumns],
      dataIndex: 'prendas'
    },
    {
      key: '5',
      title: 'Reposición',
      dataIndex: 'replacement',
      width: '9.5%',
      ...getColumnSearchProps('replacement'),
      sorter: (a, b) => a.replacement.length - b.replacement.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculation',
      ...getColumnSearchProps('calculation'),
      sorter: (a, b) => a.calculation.length - b.calculation.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      key: '7',
      title: 'Cobro',
      dataIndex: 'payment',
      ...getColumnSearchProps('payment'),
      sorter: (a, b) => a.payment.length - b.payment.length,
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

  const onAddFile = () => {
    setIsAdd(true);
    setDataSource(() => {
      return [...dataSource];
    });
  };

  return {
    dataSource,
    formatDataSource,
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
    productsList,
    reasonsList,
    onCreateDelivery
  };
};
