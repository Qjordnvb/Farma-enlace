import React from 'react';
import PropTypes from 'prop-types';
import SidebarMenu from 'views/components/sidebar';

import HeaderLayout from '../headerLayout';

function SidebarLayout({children}) {
  return (
    <>
      <HeaderLayout>
        <div>
          <SidebarMenu isActive />
        </div>
        {children}
      </HeaderLayout>
    </>
  );
}

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SidebarLayout;
