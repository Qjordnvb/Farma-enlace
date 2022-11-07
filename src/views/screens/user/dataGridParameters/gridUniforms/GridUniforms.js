import React from 'react';
import useViews from 'views';
import useCalcSize from '../../../../../hooks/useCalcSize';

function GridParameters() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableParameter} = useTables();
  const {width: tableWidth, height: tableHeight} = useCalcSize();
  return (
    <>
      {' '}
      <div
        className="container-table pt-2"
        style={{maxWidth: tableWidth + 'px', minHeight: tableHeight + 'px'}}
      >
        <TableParameter />
      </div>
    </>
  );
}

export default GridParameters;
