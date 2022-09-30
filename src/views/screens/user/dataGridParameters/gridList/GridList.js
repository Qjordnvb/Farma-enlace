import React from 'react';

import {NavLink, Routes, Route} from 'react-router-dom';
import useViews from 'views';

import './style.css';

export default function GridList() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableGarments, TableReasons} = useTables();

  return (
    <>
      <div className={'container-table-header'}>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="garments">
          <span>prenda parametrizadas</span>
          <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="reasons">
          <span>motivos parametrizados</span>
          <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
        </NavLink>
      </div>

      <>
        <div className="container-table">
          <Routes>
            <Route path="garments" element={<TableGarments />} />
            <Route path="reasons" element={<TableReasons />} />
          </Routes>
        </div>
      </>
    </>
  );
}
