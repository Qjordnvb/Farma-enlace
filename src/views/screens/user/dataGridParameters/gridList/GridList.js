import React from 'react';

import {NavLink, Route, Routes} from 'react-router-dom';
import useViews from 'views';

import './style.css';
import {StyledOptionDataList} from './GridList.Styled';
import useCalcSize from '../../../../../hooks/useCalcSize';

export default function GridList() {
  const {useComponents} = useViews();

  const {useTables} = useComponents();
  const {TableGarments, TableReasons} = useTables();
  const {width: tableWidth, height: tableHeight} = useCalcSize();
  return (
    <>
      <StyledOptionDataList>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="garments">
          <span>prenda parametrizadas</span>
          <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to="reasons">
          <span>motivos parametrizados</span>
          <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
        </NavLink>
      </StyledOptionDataList>

      <>
        <div
          className="container-table pt-2"
          style={{maxWidth: tableWidth + 'px', minHeight: tableHeight + 'px'}}
        >
          <Routes>
            <Route path="garments" element={<TableGarments />} />
            <Route path="reasons" element={<TableReasons />} />
          </Routes>
        </div>
      </>
    </>
  );
}
