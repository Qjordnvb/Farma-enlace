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
  let test = [
    {
      id: 1,
      date: '2022-09-22T02:01:54.921Z',
      codigo: '0000115106',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-S-36',
      productId: 1,
      stock: 220,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 2,
      date: '2022-09-22T02:01:54.921Z',
      codigo: '0000115108',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-L-40',
      productId: 2,
      stock: 231,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 3,
      date: '2022-09-22T02:01:54.921Z',
      codigo: '0000115114',
      descripcion: 'ZP PRV MANDIL ECO COSTA T-XS-34',
      productId: 3,
      stock: 137,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 1,
      date: '2022-09-23T02:01:54.921Z',
      codigo: '0000115106',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-S-36',
      productId: 1,
      stock: 250,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 2,
      date: '2022-09-23T02:01:54.921Z',
      codigo: '0000115108',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-L-40',
      productId: 2,
      stock: 211,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 3,
      date: '2022-09-23T02:01:54.921Z',
      codigo: '0000115114',
      descripcion: 'ZP PRV MANDIL ECO COSTA T-XS-34',
      productId: 3,
      stock: 100,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 1,
      date: '2022-09-24T02:01:54.921Z',
      codigo: '0000115106',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-S-36',
      productId: 1,
      stock: 360,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 2,
      date: '2022-09-24T02:01:54.921Z',
      codigo: '0000115108',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-L-40',
      productId: 2,
      stock: 158,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 3,
      date: '2022-09-24T02:01:54.921Z',
      codigo: '0000115114',
      descripcion: 'ZP PRV MANDIL ECO COSTA T-XS-34',
      productId: 3,
      stock: 97,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 1,
      date: '2022-09-25T02:01:54.921Z',
      codigo: '0000115106',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-S-36',
      productId: 1,
      stock: 45,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 2,
      date: '2022-09-25T02:01:54.921Z',
      codigo: '0000115108',
      descripcion: 'ZP PRV MANDIL ECO SIERRA T-L-40',
      productId: 2,
      stock: 600,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    },
    {
      id: 3,
      date: '2022-09-25T02:01:54.921Z',
      codigo: '0000115114',
      descripcion: 'ZP PRV MANDIL ECO COSTA T-XS-34',
      productId: 3,
      stock: 300,
      createdAt: '2022-09-22T02:01:54.925Z',
      updatedAt: '2022-09-22T02:01:54.925Z'
    }
  ];
  const config = {
    data: test,
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
