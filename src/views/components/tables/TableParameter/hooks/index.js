import {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/edit-icon.svg';

export const useCustomUniforms = () => {
  const {getColumnSearchProps, getTableParameters, editPrice} = useUtils();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editingKey, setEditingKey] = useState(null);
  const isEditing = (record) => record?.id === editingKey;
  const [form] = Form.useForm();

  const dataTable = function () {
    setLoading(true);
    getTableParameters()
      .then((response) => {
        setDataSource(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dataTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edit = (record) => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      const {price} = row;
      editPrice({price, id: key}).then(() => {
        dataTable();
        isEditing(null);
        setEditingKey(null);
        message.success('Operación realizada con éxito');
      });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      message.error('Ha ocurrido un error intentalo de nuevo mas tarde');
    }
  };

  const EditableCell = ({editing, dataIndex, title, children, ...restProps}) => {
    const inputNode =
      title === 'Precio Uniforme' ? (
        <InputNumber
          defaultValue={0}
          min={0}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0
            }}
            rules={[
              {
                required: true,
                message: `Por favor inserte un precio`
              }
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      width: 8,
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => +a.codigo - +b.codigo,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'ascend',
      align: 'center'
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      width: 8,
      ...getColumnSearchProps('marca'),
      sorter: (c, d) => c.marca?.localeCompare(d.marca),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      width: 20,
      ...getColumnSearchProps('descripcion'),
      sorter: (e, f) => e.descripcion?.localeCompare(f.descripcion),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      width: 8,
      ...getColumnSearchProps('genero'),
      sorter: (g, h) => g.genero?.localeCompare(h.genero),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      width: 8,
      ...getColumnSearchProps('talla'),
      sorter: (i, j) => i.talla?.localeCompare(j.talla),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Región',
      dataIndex: 'region',
      width: 8,
      ...getColumnSearchProps('region'),
      sorter: (k, l) => k.region?.localeCompare(l.region),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Precio Uniforme',
      dataIndex: 'price',
      dataType: 'number',
      width: 8,
      ...getColumnSearchProps('precio'),
      sorter: (m, n) => {
        return m.price - n.price;
      },
      sortDirections: ['descend', 'ascend'],
      editable: true,
      render: (_) => {
        return <div>${_}</div>;
      },
      align: 'center',
      onFilter: (value, record) => record.price?.toString()?.toLowerCase().includes(value)
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      width: 8,
      ...getColumnSearchProps('status'),
      sorter: (o, p) => o.status?.localeCompare(p.status),
      sortDirections: ['descend', 'ascend'],
      align: 'center'
    },
    {
      title: 'Acción',
      fixed: 'right',
      dataIndex: 'accion',
      width: 8,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className={'flex flex-col align-center justify-center text-center'}>
            <Typography.Link onClick={() => save(record.id)}>Guardar</Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a style={{color: 'inherit'}}>Cancelar</a>
            </Popconfirm>
          </div>
        ) : (
          <div onClick={() => edit(record)} className="btn-edit">
            <img src={BtnEdit} alt="btn-edit" />
          </div>
        );
      },
      align: 'center'
    }
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'reposicion' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return {
    columns,
    mergedColumns,
    dataSource,
    dataTable,
    setDataSource,
    loading,
    form,
    EditableCell
  };
};
