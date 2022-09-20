import {useState, useEffect} from 'react';
import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../assets/img/btn-edit.png';

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
      });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log('Validate Failed:', errInfo);
    }
  };

  const EditableCell = ({editing, dataIndex, title, children, ...restProps}) => {
    const inputNode =
      title === 'Precio Uniforme' ? (
        <InputNumber
          defaultValue={0}
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
      width: '15%',
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => +a.codigo - +b.codigo,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      width: '15%',
      ...getColumnSearchProps('marca'),
      sorter: (c, d) => c.marca.localeCompare(d.marca),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      width: '20%',
      ...getColumnSearchProps('descripcion'),
      sorter: (e, f) => e.descripcion.localeCompare(f.descripcion),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Género',
      dataIndex: 'genero',
      width: '10%',
      ...getColumnSearchProps('genero'),
      sorter: (g, h) => g.genero.localeCompare(h.genero),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      width: '5%',
      ...getColumnSearchProps('talla'),
      sorter: (i, j) => i.talla.localeCompare(j.talla),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'region',
      width: '10%',
      ...getColumnSearchProps('region'),
      sorter: (k, l) => k.region?.localeCompare(l.region),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Precio Uniforme',
      dataIndex: 'price',
      width: '10%',
      ...getColumnSearchProps('precio'),
      sorter: (m, n) => {
        return m.price - n.price;
      },
      sortDirections: ['descend', 'ascend'],
      editable: true,
      render: (_) => {
        return <div>${_}</div>;
      }
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      width: '10%',
      ...getColumnSearchProps('status'),
      sorter: (o, p) => o.status.localeCompare(p.status),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Acción',
      fixed: 'right',
      dataIndex: 'accion',
      width: '7.5%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8
              }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancelar</a>
            </Popconfirm>
          </span>
        ) : (
          <div onClick={() => edit(record)} className="btn-edit">
            <img src={BtnEdit} alt="btn-edit" />
          </div>
        );
      }
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
