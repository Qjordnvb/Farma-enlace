import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainerDataGrid = styled.div.attrs({
  className: 'StyledContainerDataGrid'
})`
  ${tw``}
`;

export const StyledSidebarLayout = styled.div.attrs({
  className: 'StyledSidebarLayout'
})`
  ${tw``}

  .container-table {
  }
`;

export const StyledOptionData = styled.div.attrs({
  className: 'StyledOptionData'
})`
  ${tw``}
  display: flex;
  align-items: center;
  justify-content: space-around;

  position: absolute;
  width: 78%;

  height: 60px;
  left: 182px;
  top: 230px;

  /* Tono 1 */

  background: #ffffff;
  border-radius: 20px 20px 0px 0px;

  a {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    /* or 125% */

    text-transform: uppercase;
  }
`;

export const StyledDataTable = styled.div.attrs({
  className: 'StyledDataTable'
})`
  ${tw``}
`;
