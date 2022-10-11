import {useEffect, useState} from 'react';

import {useUtils} from '../../../../../../hooks';
export const useCustomGraphic = () => {
  const {getStock} = useUtils();
  const [stock, setStock] = useState([]);

  useEffect(() => {
    getStock().then((res) => {
      setStock(res.stock);
    });
  }, []);

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

  return {stock, config};
};
