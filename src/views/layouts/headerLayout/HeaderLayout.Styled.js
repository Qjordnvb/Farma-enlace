import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainerLayout = styled.div.attrs({
  className: 'StyledContainerLayout'
})`
  ${tw``}
  .div-logo {
    position: absolute;
    left: 0;
    right: 0;
    top: auto;
    width: 100%;
    background: #efefef;
    z-index: -3;
  }

  .div-figures {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -2;
    margin-bottom: -50px;
  }

  backdrop-filter: blur(20px);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.6) 16.15%,
    rgba(255, 255, 255, 0.264535) 81.75%,
    rgba(255, 255, 255, 0) 100%
  );

  box-shadow: inset 0px 0px 22.473px rgba(255, 255, 255, 0.6);
  filter: drop-shadow(0px 6.91477px 6.91477px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(20px);
  max-height: 100%;
  height: 100%;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 90px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.6) 16.15%,
      rgba(255, 255, 255, 0.264535) 81.75%,
      rgba(255, 255, 255, 0) 100%
    );
    box-shadow: inset 0px 0px 22.473px rgba(255, 255, 255, 0.6);
    filter: drop-shadow(0px 6.91477px 6.91477px rgba(0, 0, 0, 0.25));
    backdrop-filter: blur(20px);
    img {
      width: 168px;
      height: 70px;
    }
    padding: 10px 50px;

    .home-profile {
      width: 38px;
      height: 38px;
      margin-right: 4%;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
      border-radius: 100px;

      fill: #2bc155;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 194px;
      height: 40px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      background: #2bc155;
      margin-right: 20px;
      /* sombra 1 */

      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
      border-radius: 100px;

      img {
        width: 20px;
        height: 20.52px;
        margin-right: 10px;
      }
    }
  }
`;
