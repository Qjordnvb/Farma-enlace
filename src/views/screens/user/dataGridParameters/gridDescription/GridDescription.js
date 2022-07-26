import React from 'react';
import useViews from 'views';

// import PropTypes from 'prop-types';

function GridDescription() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableDescription} = useTables();
  return (
    <>
      {' '}
      <div className="container-table pl-48 pr-52 pt-16">
        <TableDescription />
      </div>
    </>
  );
}

// GridDescription.propTypes = {};

export default GridDescription;
