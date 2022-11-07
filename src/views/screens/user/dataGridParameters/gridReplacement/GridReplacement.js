import React from 'react';
import useViews from 'views';
import useCalcSize from '../../../../../hooks/useCalcSize';

// import PropTypes from 'prop-types';

function GridReplacement() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableReplacement} = useTables();
  const {width: tableWidth, height: tableHeight} = useCalcSize();
  return (
    <>
      {' '}
      <div
        className="container-table pt-2"
        style={{maxWidth: tableWidth + 'px', minHeight: tableHeight + 'px'}}
      >
        <TableReplacement />
      </div>
    </>
  );
}

// GridReplacement.propTypes = {};

export default GridReplacement;
