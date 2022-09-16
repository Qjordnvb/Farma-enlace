import React from 'react';
import {Dropdown, Menu, Space} from 'antd';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import './style.css';
const handleLogout = () => {
  if (window.localStorage.getItem('MY_AUTH_APP')) {
    window.localStorage.removeItem('MY_AUTH_APP');
    window.location.replace('/');
  }
};
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
            href="https://www.antgroup.com"
          >
            Editar perfil
          </a>
        )
      },
      {
        key: '2',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
            href="https://www.aliyun.com"
          >
            Cambiar cuenta
          </a>
        )
      },
      {
        key: '3',
        label: (
          <Button
            variant="primary"
            className="bg-transparent rounded-lg px-3"
            onClick={handleLogout}
          >
            <span className="text-sm -mt-3">Cerrar sesion</span>
          </Button>
        )
      }
    ]}
  />
);

const AppMenu = ({children}) => (
  <Space direction="vertical">
    <Dropdown overlay={menu} placement="bottomRight">
      {children}
    </Dropdown>
  </Space>
);

Menu.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppMenu;
