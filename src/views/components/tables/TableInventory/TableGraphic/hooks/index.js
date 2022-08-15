export const useCustomGraphic = () => {
  const data = [
    {
      month: 'Jan',
      type: 'Camiseta',
      value: 125
    },
    {
      month: 'Jan',
      type: 'Mandil',
      value: 51
    },
    {
      month: 'Feb',
      type: 'Chaqueta',
      value: 132
    },
    {
      month: 'Feb',
      type: 'Escarpela',
      value: 91
    },
    {
      month: 'Mar',
      type: 'Camiseta',
      value: 141
    },
    {
      month: 'Mar',
      type: 'Mandil',
      value: 34
    },
    {
      month: 'Apr',
      type: 'Chaqueta',
      value: 158
    },
    {
      month: 'Apr',
      type: 'Escarpela',
      value: 47
    },
    {
      month: 'May',
      type: 'Camiseta',
      value: 133
    },
    {
      month: 'May',
      type: 'Mandil',
      value: 63
    },
    {
      month: 'June',
      type: 'Chaqueta',
      value: 143
    },
    {
      month: 'June',
      type: 'Escarpela',
      value: 58
    },
    {
      month: 'July',
      type: 'Camiseta',
      value: 176
    },
    {
      month: 'July',
      type: 'Mandil',
      value: 56
    },
    {
      month: 'Aug',
      type: 'Chaqueta',
      value: 194
    },
    {
      month: 'Aug',
      type: 'Escarpela',
      value: 77
    },
    {
      month: 'Sep',
      type: 'Camiseta',
      value: 115
    },
    {
      month: 'Sep',
      type: 'Mandil',
      value: 99
    },
    {
      month: 'Oct',
      type: 'Chaqueta',
      value: 134
    },
    {
      month: 'Oct',
      type: 'Escarpela',
      value: 106
    },
    {
      month: 'Nov',
      type: 'Camiseta',
      value: 110
    },
    {
      month: 'Nov',
      type: 'Mandil',
      value: 88
    },
    {
      month: 'Dec',
      type: 'Chaqueta',
      value: 91
    },
    {
      month: 'Dec',
      type: 'Escarpela',
      value: 56
    }
  ];
  const config = {
    data,
    xField: 'month',
    yField: 'value',

    seriesField: 'type',
    color: ({type}) => {
      return type === 'Camiseta'
        ? '#F4664A'
        : type === 'Mandil'
        ? '#81BB00'
        : type === 'Chaqueta'
        ? '#30BF78'
        : '#2F54EB';
    },
    lineStyle: ({type}) => {
      if (type === 'Escarpela') {
        return {
          lineDash: [4, 4],
          opacity: 1
        };
      }
      return {
        opacity: 0.5
      };
    }
  };
  return {data, config};
};
