// Packages
import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledButtonLabel = styled.span.attrs({
  className: 'StyledButtonLabel'
})``;

export const StyledButton = styled.button.attrs((props) => ({
  className: `StyledButton StyledButton${props.variant}`
}))`
  ${tw`text-center text-white cursor-pointer focus:outline-none text-lg`}
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  box-shadow: 0px 6.91477px 6.91477px rgba(0, 0, 0, 0.25);
  // Size
  ${(props) => {
    switch (props.size) {
      case 'sm':
        return tw`text-base font-normal`;
      case 'lg':
        return tw`text-lg`;
      default:
        return tw`text-lg`;
    }
  }}
  // Variant
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return tw`bg-primary-500 text-white`;
      case 'secondary':
        return tw`bg-primary-500 text-white`;
    }
  }}

  // Full width
  ${(props) => props.fullWidth && tw`w-full`}

// width
    ${(props) => props.width && `width: ${props.width};`}

  // height
   ${(props) => props.height && `height: ${props.height};`}




  // rounded
  ${(props) => {
    switch (props.roundedVariant) {
      case 'sm':
        return tw`rounded-sm`;
      case 'md':
        return tw`rounded-md`;
      case 'lg':
        return tw`rounded-lg`;
      case 'full':
        return tw`rounded-full`;
      default:
        break;
    }
  }}
`;
