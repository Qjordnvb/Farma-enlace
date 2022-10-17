import {useEffect, useState} from 'react';

import {useUtils} from '../../../../../../hooks';
import {message} from 'antd';
export const useCustomGraphic = () => {
  const {getStock} = useUtils();
  const [stock, setStock] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    getStock(selectedKeys)
      .then((res) => {
        setStock(res.stock);
      })
      .catch(() => {
        message.error('Error cargando datos');
      });
  }, [selectedKeys]);

  const config = {
    data: stock,
    xField: 'date',
    yField: 'stock',

    seriesField: 'descripcion',
    xAxis: {
      type: 'time',
      time: {
        unit: 'month',
        minUnit: 'day',
        stepSize: 1,
        round: true
      }
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000
      }
    }
  };

  return {stock, config, selectedKeys, setSelectedKeys};
};
