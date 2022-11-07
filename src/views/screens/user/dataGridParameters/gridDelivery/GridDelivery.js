import React from 'react';
import useViews from 'views';
import useCalcSize from '../../../../../hooks/useCalcSize';

function GridDelivery() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableDelivery} = useTables();
  const {width: tableWidth, height: tableHeight} = useCalcSize();
  return (
    <>
      {' '}
      <div
        className="container-table pt-2"
        style={{maxWidth: tableWidth + 'px', minHeight: tableHeight + 'px'}}
      >
        <TableDelivery />
      </div>
    </>
  );
}

export default GridDelivery;
