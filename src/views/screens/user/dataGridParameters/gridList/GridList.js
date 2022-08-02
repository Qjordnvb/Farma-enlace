import React from 'react';

import {NavLink, Routes, Route} from 'react-router-dom';
import useViews from 'views';

import './style.css';
import {StyledOptionDataList} from './GridList.Styled';

export default function GridList() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableGarments, TableReasons} = useTables();

  return (
    <>
      <StyledOptionDataList>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="garments" key={'9'}>
          <span>prenda parametrizadas</span>
          <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="reasons" key={'10'}>
          <span>motivos parametrizados</span>
          <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
        </NavLink>
      </StyledOptionDataList>
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
