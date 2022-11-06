import React from 'react';
import useViews from 'views';
import useCalcSize from '../../../../../hooks/useCalcSize';

// import PropTypes from 'prop-types';

function GridDescription() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableDescription} = useTables();
  const {width: tableWidth, height: tableHeight} = useCalcSize();
  return (
    <>
      {' '}
      <div
        className="container-table pt-2"
        style={{maxWidth: tableWidth + 'px', minHeight: tableHeight - 200 + 'px'}}
      >
        <TableDescription />
      </div>
    </>
  );
}

// GridDescription.propTypes = {};

export default GridDescription;
