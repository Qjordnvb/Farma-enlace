import React, {useEffect} from 'react';

import {Line} from '@ant-design/plots';
import {useCustomGraphic} from './hooks';

const TableGraphic = ({selectedProducts}) => {
  const {config, setSelectedKeys} = useCustomGraphic();
  useEffect(() => {
    if (selectedProducts.length) {
      setSelectedKeys(selectedProducts);
    }
  }, [selectedProducts]);

  return (
    <div className="container-table pt-16">
      <Line {...config} />
    </div>
  );
};

export default TableGraphic;
