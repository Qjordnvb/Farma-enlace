import {useEffect, useState} from 'react';

import {useUtils} from '../../../../../../hooks';
import {message} from 'antd';
export const useCustomGraphic = () => {
  const {getStock} = useUtils();
  const [stock, setStock] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [stockData, setStockData] = useState([]);
  useEffect(() => {
    if (selectedKeys.length) {
      getStock(selectedKeys)
        .then((res) => {
          setStock(res.stock);
        })
        .catch(() => {
          message.error('Error cargando datos');
        });
    } else {
      getStock([])
        .then((res) => {
          setStockData(res.stock);
        })
        .catch(() => {});
    }
  }, [selectedKeys]);

  const config = {
    data: selectedKeys.length ? stock : stockData,
    xField: 'date',
    yField: 'stock',
    legend: {
      layout: 'vertical',
      position: 'right',
      pageNavigator: 'PageNavigatorMarkerStyle'
    },
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

  return {stock: selectedKeys.length ? stock : stockData, config, selectedKeys, setSelectedKeys};
};
