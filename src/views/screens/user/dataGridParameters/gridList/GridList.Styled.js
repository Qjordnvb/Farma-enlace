import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledGridList = styled.div.attrs({
  className: 'StyledGridList'
})`
  ${tw``}

  .btn-add {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
  }
`;

export const StyledOptionDataList = styled.div.attrs({
  className: 'StyledOptionDataList'
})`
  ${tw``}

  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  margin-top: 2.7%;

  position: absolute;
  width: 79%;
  left: 190px;

  /* Tono 1 */

  background: #ffffff;
  border-radius: 0px;

  a {
    display: flex;
    align-items: center;
    flex-direction: column reverse;
    justify-content: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;

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
      max-width: 550px;
      width: 100%;
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
`;
