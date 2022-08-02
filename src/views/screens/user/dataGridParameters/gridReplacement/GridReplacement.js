import React from 'react';
import useViews from 'views';

// import PropTypes from 'prop-types';

function GridReplacement() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableReplacement} = useTables();
  return (
    <>
      {' '}
      <div className="container-table pt-16">
        <TableReplacement />
      </div>
    </>
  );
}

// GridReplacement.propTypes = {};

export default GridReplacement;
