import React from 'react';
import useViews from 'views';

// import PropTypes from 'prop-types';

function GridDescription() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableParameter} = useTables();
  return (
    <>
      {' '}
      <div className="container-table pl-48 pr-52 pt-16">
        <TableParameter />
      </div>
    </>
  );
}

// GridDescription.propTypes = {};

export default GridDescription;
