import React from 'react';

import {Line} from '@ant-design/plots';
import {useCustomGraphic} from './hooks';

const TableGraphic = () => {
  const {config} = useCustomGraphic();
  return (
    <div className="container-table pt-16">
      <Line {...config} />
    </div>
  );
};

export default TableGraphic;
