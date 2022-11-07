import styled from 'styled-components';

import tw from 'twin.macro';

// Assets

export const StyledContainerSidebar = styled.div.attrs({
  className: 'StyledContainerSidebar'
})`
  ${tw``}
  display: flex;
  justify-content: center;

  ul {
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
        img {
          width: 100px;
          height: auto;
        }
      }
    }
    width: 120px;

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
  }
  @media (max-height: 768px) {
    ul {
      li {
        a {
          height: 80px;
        }
      }
    }
  }
`;
