import {useEffect, useState} from 'react';
import {message} from 'antd';
import {useUtils} from '../../../../../../hooks';

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
        .catch(() => {
          message.error('Error cargando datos');
        });
    }
  }, [selectedKeys]);

  let customColor = {};
  if (selectedKeys.length === 1) {
    customColor = {
      color: ({descripcion}) => {
        if (descripcion === 'min') {
          return 'red';
        } else if (descripcion === 'max') {
          return 'green';
        }
      }
    };
  }

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
        unit: 'day',
        minUnit: 'day',
        stepSize: 1,
        round: false
      }
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000
      }
    },
    colorField: 'descripcion',
    ...customColor
  };

  return {stock: selectedKeys.length ? stock : stockData, config, selectedKeys, setSelectedKeys};
};
