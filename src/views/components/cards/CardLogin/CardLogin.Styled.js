import styled from 'styled-components';
import tw from 'twin.macro';

// Assets
import BgFarma from '../../../../assets/img/bg-login.png';
import BgLoading from '../../../../assets/img/loading.png';

export const StyledContainerLogin = styled.div.attrs({
  className: 'StyledContainerLogin'
})`
  ${tw``}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url(${BgFarma});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;

  ${(props) => props.isLoading && `background-image: url(${BgLoading});  align-items: flex-end;`}
`;

export const StyledContainerFormLogin = styled.div.attrs({
  className: 'StyledContainerFormLogin'
})`
  ${tw``}
  ${(props) => props.isLoading && `margin-right: 9%;`}
  max-width: 561px;
  max-height: 731px;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  /* Glass */

  box-shadow: 0px 6.91477px 6.91477px rgba(0, 0, 0, 0.25),
    inset 0px 0px 22.473px rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 63px;

  .text-login {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 60px;
    line-height: 20px;
    color: #4d4e4e;
  }

  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 35px;
    line-height: 20px;
    color: #4d4e4e;
  }

  input {
    width: 454px;
    height: 60px;
    text-align: center;
    /* Glass */

    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6) 16.15%,
      rgba(255, 255, 255, 0.264535) 81.75%,
      rgba(255, 255, 255, 0) 100%
    );
    /* Tono 1 */

    border: 2px solid #ffffff;
    /* Glass */

    box-shadow: inset 0px 0px 22.473px rgba(255, 255, 255, 0.6);
    filter: drop-shadow(0px 6.91477px 6.91477px rgba(0, 0, 0, 0.25));
    backdrop-filter: blur(20px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 100px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;

    &:focus {
      outline: none;
    }

    transition: all 0.6s;

    &:hover {
      mix-blend-mode: hard-light;
      opacity: 0.8;
      box-shadow: inset 2px 0px 30px #00f845;
      border-radius: 100px;
      padding: 0px 20px;
    }
  }

  button {
    margin-top: -100px;
    margin-left: auto;
    margin-right: -12%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6) 16.15%,
      rgba(255, 255, 255, 0.264535) 81.75%,
      rgba(255, 255, 255, 0) 100%
    );
    padding: 15px;
    border-radius: 30px;

    &:hover {
      transition: all 0.6s;
      mix-blend-mode: hard-light;
      opacity: 0.8;
      box-shadow: inset 2px 0px 30px #00f845;

  }
`;
