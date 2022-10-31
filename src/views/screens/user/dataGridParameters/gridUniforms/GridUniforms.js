import React from 'react';
import useViews from 'views';

function GridParameters() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableParameter} = useTables();
  return (
    <>
      {' '}
      <div className="container-table pt-2">
        <TableParameter />
      </div>
    </>
  );
}

export default GridParameters;
