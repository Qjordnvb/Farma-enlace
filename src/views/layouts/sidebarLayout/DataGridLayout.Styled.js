import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainerDataGrid = styled.div.attrs({
  className: 'StyledContainerDataGrid'
})`
  ${tw`flex flex-col items-center justify-center`}
`;

export const StyledOptionData = styled.div.attrs({
  className: 'StyledOptionData'
})`
  ${tw``}
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 1200px;
  width: 100%;
  height: 60px;
  margin: 70px auto auto;
  /* Tono 1 */

  background: #ffffff;
  border-radius: 20px 20px 0px 0px;

  a {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    /* or 125% */

    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;

    color: #000000;

    &.active {
      background: linear-gradient(190.08deg, #2bc155 9.78%, #26d0ce 111.09%);
      height: 6px;
      margin-top: 25px;
      transition: all 0.4s ease-in-out;

      span {
        background: linear-gradient(190.08deg, #2bc155 9.78%, #26d0ce 111.09%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        margin-bottom: 25px;
      }
    }
  }

  @media only screen and (max-width: 1366px) {
    max-width: 1000px;
  }
`;
