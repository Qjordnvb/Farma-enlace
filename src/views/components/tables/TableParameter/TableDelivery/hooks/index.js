import {useEffect, useState} from 'react';
import {DeleteFilled} from '@ant-design/icons';
import {message, Typography} from 'antd';
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
    createDelivery,
    deleteUniformDelivery
  } = useUtils();
  const [garments, setGarments] = useState([]);
  const [garmentsColumns, setGarmentsColumns] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [reasonsList, setReasonsList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [formatDataSource, setFormatDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    getGarmentsTableParameters(true)
      .then((res) => {
        setLoading(false);
        setGarments(res);
      })
      .catch(() => {
        setLoading(false);
      });
    getAllDeliveries()
      .then((response) => {
        setDataSource(response);
      })
      .catch(() => {
        setLoading(false);
      });

    getTableParameters()
      .then((res) => {
        setProductsList(res);
      })
      .catch(() => {
        setLoading(false);
      });
    getReasonsTableParameters(true)
      .then((res) => {
        setReasonsList(res);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let getColumns = garments.map((garment) => {
      return {
        title: garment.description,
        dataIndex: `garment${garment.id}`,
        editable: true,
        width: '8%',
        align: 'center'
      };
    });
    setGarmentsColumns(getColumns);
  }, [garments]);

  const onCreateDelivery = () => {
    setLoading(true);
    createDelivery({...addingFile})
      .then(() => {
        getAllDeliveries()
          .then((res) => {
            formatAllDeliveries(res);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.failedIds) {
          const {failedIds, messageError} = e.response.data;
          failedIds.forEach(async (failed) => {
            let getUniform = productsList.find((uniform) => uniform.id === failed.uniform);
            let getReason = reasonsList.find((reason) => reason.id === failed.reason);
            await message.error(
              messageError
                ? `${messageError}: ${getUniform.descripcion} - ${getReason.reason} `
                : `No se pudo crear la entrega para el uniforme ${getUniform.descripcion} y el motivo ${getReason.reason}`,
              10
            );
          });
        }
        setLoading(false);
      });
  };

  const onDelete = (id) => {
    setLoading(true);
    deleteUniformDelivery(id).then(() => {
      getAllDeliveries().then((response) => {
        setDataSource(response);
        setLoading(false);
      });
    });
  };

  const columns = [
    {
      key: '1',
      title: 'N°',
      dataIndex: 'id',
      width: '5%',
      align: 'center'
    },
    {
      key: '2',
      title: 'Motivo',
      dataIndex: 'reason',
      width: '10%',
      ...getColumnSearchProps('motivo'),
      sorter: (a, b) => a.reason?.localeCompare(b.reason),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      onFilter: (value, record) =>
        record.reason.toString().toLowerCase().includes(value.toLowerCase())
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'descripcion',
      width: '15%',
      ...getColumnSearchProps('descripcion'),
      sorter: (a, b) => a.descripcion?.localeCompare(b.descripcion),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      onFilter: (value, record) => record.descripcion.toLowerCase().includes(value.toLowerCase())
    },
    {
      key: '4',
      title: 'Prendas',
      children: [...garmentsColumns],
      dataIndex: 'prendas',
      align: 'center'
    },
    {
      key: '5',
      title: 'Reposición',
      dataIndex: 'replacementAuto',
      width: '8%',
      ...getColumnSearchProps('reposición'),
      sorter: (a, b) => a.replacementAuto - b.replacementAuto,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_} días</div>;
      },
      align: 'center',
      onFilter: (value, record) => {
        return record.replacementAuto?.toString()?.toLowerCase().includes(value);
      }
    },
    {
      key: '6',
      title: 'Cálculo',
      dataIndex: 'calculation',
      width: '9%',
      ...getColumnSearchProps('cálculo'),
      sorter: (a, b) => a.calculation?.localeCompare(b.calculation),
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      onFilter: (value, record) => {
        return record.calculation?.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: '7',
      title: 'Cobro',
      dataIndex: 'payment',
      width: '7%',
      sorter: (a, b) => a.payment - b.payment,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>{_ ? 'SI' : 'NO'}</div>;
      },
      align: 'center'
    },
    {
      key: '8',
      title: 'Valor',
      width: '7%',
      dataIndex: 'price',
      ...getColumnSearchProps('valor'),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
      render: (_) => {
        return <div>${_}</div>;
      },
      align: 'center',
      onFilter: (value, record) => {
        return record.price?.toString()?.toLowerCase().includes(value);
      }
    },
    {
      key: '4',
      title: 'Porcentajes',
      children: [
        {
          title: 'Empleado',
          dataIndex: 'personalDiscount',
          width: '7%',
          render: (_) => {
            return <div>{_}%</div>;
          },
          align: 'center'
        },
        {
          title: 'Empresa',
          dataIndex: 'companyDiscount',
          width: '7%',
          render: (_) => {
            return <div>{_}%</div>;
          },
          align: 'center'
        }
      ],
      dataIndex: 'prendas',
      align: 'center'
    },
    {
      title: 'Ver',
      fixed: 'right',
      dataIndex: 'accion',
      width: '5%',
      render: (_, record) => {
        return (
          <span className="flex items-center justify-center	">
            <Typography.Link
              onClick={() => {
                onDelete(record.id);
              }}
              style={{
                marginRight: 8
              }}
            >
              <DeleteFilled />
            </Typography.Link>
          </span>
        );
      },
      align: 'center'
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
    onCreateDelivery,
    onDelete,
    loading,
    garmentsColumns
  };
};
