import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainerInicio = styled.div.attrs({
  className: 'StyledContainerInicio'
})`
  ${tw``}

  &.StyledContainerInicio {
    .btn-inicio {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 20px;
    }

    .img-logo {
      width: 168px;
      height: 70px;
      margin-top: 10px;
    }
  }
`;

export const StyledSelectOption = styled.div.attrs({
  className: 'StyledSelectOption'
})`
  ${tw``}
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background: #ffffff;
  padding: 30px 10px 30px 10px;
  width: 60%;
  height: auto;

  h3 {
    background: linear-gradient(190.08deg, #2bc155 9.78%, #26d0ce 111.09%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 20px;
  }

  .img-options {
    height: 400px;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    width: 120px;
    text-align: center;
    color: #000000;
    img {
      transition: all 0.9s;
      width: 100px;
      height: 100px;
      margin-bottom: 10px;

      background: linear-gradient(190.08deg, #2bc155 9.78%, #26d0ce 111.09%);
      border-radius: 30px;
      &:hover {
        transform: translateY(-25px);
        animation: 0.5s ease-in-out;
        box-shadow: 0px 6.91477px 6.91477px #10ff53;
        border-radius: 35px;
      }
    }
  }
  @media screen and (max-width: 1366px) {
    padding: 20px 10px 20px 10px;
    margin-top: 10px;
    .img-options {
      height: 300px;
    }
    a {
      width: 80px;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
  @media screen and (max-height: 768px) {
    padding: 10px 5px 10px 5px;
    margin-top: 10px;
    .img-options {
      height: 225px;
    }
    a {
      width: 60px;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
`;
