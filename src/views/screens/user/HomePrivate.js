import {DATA} from 'config/paths';
import useViews from 'views';

import Logo from '../../../assets/img/logo.png';
import Options1 from '../../../assets/img/option-1.png';
import Options2 from '../../../assets/img/option-2.png';
import Options3 from '../../../assets/img/option-3.png';
import Options4 from '../../../assets/img/option-4.png';
import Options5 from '../../../assets/img/option-5.png';

import {StyledContainerInicio, StyledSelectOption} from './HomePrivate.Styled';

function HomePrivate() {
  const {useLayouts} = useViews();
  const {HeaderLayout} = useLayouts();

  return (
    <HeaderLayout home>
      <StyledContainerInicio className="flex flex-col items-center justify-center">
        {/*<Button
          className="btn-inicio my-12"
          variant="primary"
          label="Bienvenido"
          roundedVariant="full"
          width="433px"
          height="60px"
        />*/}

        <StyledSelectOption className="select-option">
          <h3 className="text-primary-500">Bienvenido</h3>
          <img
            className="img-options mt-6"
            src={'http://159.223.195.98:3002/static/home.jpg'}
            alt="options"
          />
          <div className="flex justify-evenly w-10/12 mt-9 flex-wrap">
            <a href={`${DATA}parameters/uniforms`}>
              <img src={Options1} alt="option-1" />
              Parametrización
            </a>

            <a href={`${DATA}orders/actualization`}>
              <img src={Options2} alt="option-2" />
              Orden de consumo
            </a>
            <a href={`${DATA}inventory/buy`}>
              <img src={Options3} alt="option-3" />
              Reposición de inventario
            </a>
            <a href={`${DATA}discount`}>
              <img src={Options4} alt="option-4" />
              Descuento uniforme
            </a>
            <a href={`${DATA}report`}>
              <img src={Options5} alt="option-5" />
              Reporteria
            </a>
          </div>
        </StyledSelectOption>
        <img className="img-logo" src={Logo} alt="logo" />
      </StyledContainerInicio>
    </HeaderLayout>
  );
}

export default HomePrivate;
