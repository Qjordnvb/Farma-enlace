import React from 'react';
import {Oval} from 'react-loader-spinner';
import {StyledLoadingContainer} from './Loading.Styled';

export default function LoadingComponent() {
  return (
    <StyledLoadingContainer>
      <h3>Cargando</h3>
      <Oval color="#00BFFF" height={80} width={80} />
    </StyledLoadingContainer>
  );
}
