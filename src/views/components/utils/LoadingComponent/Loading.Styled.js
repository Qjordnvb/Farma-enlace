import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledLoadingContainer = styled.div.attrs({
  className: 'StyledLoadingContainer'
})`
  ${tw``}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h3 {
    color: #4d4e4e;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 20px;
    margin-bottom: 80px;
    margin-top: 60px;
  }

  height: 30%;
  width: 100%;
`;
