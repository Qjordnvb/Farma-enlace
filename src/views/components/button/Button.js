import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton} from './Button.Styled';

function Button(props) {
  const {
    type,
    variant,
    size,
    disabled,
    onClick,
    className,
    fullWidth,
    children,
    roundedVariant,
    width,
    height,
    label
  } = props;

  return (
    <StyledButton
      type={type}
      variant={variant}
      disabled={disabled}
      size={size}
      onClick={onClick}
      className={className}
      fullWidth={fullWidth}
      roundedVariant={roundedVariant}
      width={width}
      height={height}
    >
      {label}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['', 'sm', 'lg']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  roundedVariant: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
  label: PropTypes.string
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: '',
  onClick: () => {},
  disabled: false,
  className: '',
  fullWidth: false,
  roundedVariant: '',
  width: '',
  height: '',
  label: ''
};

export default Button;
