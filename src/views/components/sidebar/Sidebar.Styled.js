import styled from 'styled-components';

import tw from 'twin.macro';

// Assets

export const StyledContainerSidebar = styled.div.attrs({
  className: 'StyledContainerSidebar'
})`
  ${tw``}

  ul {
        z-index: 9999;
    li {

      a {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
           height: 101px;
        &.active {
          background: linear-gradient(190.08deg, #2bc155 9.78%, #26d0ce 111.09%);
}
    }
  }

  position: absolute;
  width: 120px;
  height: 605.87px;
  left: 33px;
  top: 150px;

  /* Glass */

  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.6) 16.15%,
    rgba(255, 255, 255, 0.264535) 81.75%,
    rgba(255, 255, 255, 0) 100%
  );
  /* Glass */

  box-shadow: inset 0px 0px 22.473px rgba(255, 255, 255, 0.6);
  filter: drop-shadow(0px 6.91477px 6.91477px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 30px;
`;
