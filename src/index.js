import React from 'react';
import {ConfigProvider} from 'antd';
import es_ES from 'antd/es/locale/es_ES';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'antd/dist/antd.min.css'; // or 'antd/dist/antd.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ConfigProvider locale={es_ES}>
      <App />
    </ConfigProvider>
  </>
);
