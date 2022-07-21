import React from 'react';
import useViews from 'views';

// import PropTypes from 'prop-types';

function GridUniforms() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableParameter} = useTables();
  return (
    <>
      {' '}
      <div className="container-table px-48 pt-16">
        <TableParameter />
      </div>
    </>
  );
}

// GridUniforms.propTypes = {};

export default GridUniforms;