import {lazy} from 'react';

const HeaderLayout = lazy(() => import('./headerLayout/HeaderLayout'));
const DataGridLayout = lazy(() => import('./sidebarLayout/DataGridLayout'));

const useLayouts = () => {
  return {
    HeaderLayout,
    DataGridLayout
  };
};

export default useLayouts;
