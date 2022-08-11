import {useState} from 'react';

import {Form, Input, InputNumber, Popconfirm, Typography} from 'antd';
import {useUtils} from 'hooks';
import BtnEdit from '../../../../../../assets/img/btn-edit.png';

export const useCustomDescription = () => {
  const originData = [];
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const {getColumnSearchProps} = useUtils();

  for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      n: 1,
      code: `0000115105 ${i}`,
      description: `ZP PRV KIT ECO HOMBRE T-M-38 ${i}`,
      garments: `New York No. 1 Lake Park ${i}`,
      brand: `Costosa ${i}`,
      region: `Sierra ${i}`,
      garment1: `3 `,
      garment2: `0 `,
      garment3: `1 `,
      garment4: `0 `,
      garment5: `2 `,
      garment6: `0 `
    });
  }

  const EditableCell = ({editing, dataIndex, title, inputType, children, ...restProps}) => {
    const inputNode = inputType === 'garments' ? <InputNumber /> : <Input />;
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
                message: `Please Input ${title}!`
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

  const edit = (record) => {
    form.setFieldsValue({
      garment1: '',
      garment2: '',
      garment3: '',
      garment4: '',
      garment5: '',
      garment6: '',
      ...record
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'N°',
      dataIndex: 'n'
    },
    {
      title: 'Código Producto',
      dataIndex: 'code',
      ...getColumnSearchProps('code'),
      sorter: (a, b) => a.code.length - b.code.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ['descend', 'ascend']
    },

    {
      title: 'Mandil blanco',
      dataIndex: 'garment1',
      editable: true
    },
    {
      title: 'Mandil azul',
      dataIndex: 'garment2',
      editable: true
    },
    {
      title: 'Camiseta',
      dataIndex: 'garment3',
      editable: true
    },
    {
      title: 'Buso',
      dataIndex: 'garment4',
      editable: true
    },
    {
      title: 'Chompa',
      dataIndex: 'garment5',
      editable: true
    },
    {
      title: 'Escarapela',
      dataIndex: 'garment6',
      editable: true
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      ...getColumnSearchProps('brand'),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Región',
      dataIndex: 'region',
      ...getColumnSearchProps('region'),
      sorter: (a, b) => a.region.length - b.region.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div disabled={editingKey !== ''} onClick={() => edit(record)} className="btn-edit">
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
        inputType: col.dataIndex === 'garments' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return {
    form,
    EditableCell,
    data,
    mergedColumns,
    cancel
  };
};
