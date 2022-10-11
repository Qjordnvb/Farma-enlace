import React, {useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';

import useViews from 'views';
import {Oval} from 'react-loader-spinner';

// import PropTypes from 'prop-types';

function ConfigPrivate() {
  const {useLayouts} = useViews();
  const {DataGridLayout} = useLayouts();

  const [fileList, setFileList] = useState([]);
  const [loginList, setLoginList] = useState([]);
  const [uploading, setUploading] = useState({
    home: false,
    login: false
  });
  const [homeKey, setHomeKey] = useState(Date.now());
  const [loginKey, setLoginKey] = useState(Date.now);
  const homeProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList
  };

  const loginProps = {
    onRemove: (file) => {
      const index = loginList.indexOf(file);
      const newFileList = loginList.slice();
      newFileList.splice(index, 1);
      setLoginList(newFileList);
    },
    beforeUpload: (file) => {
      setLoginList([file]);
      return false;
    },
    fileList: loginList
  };

  const userMenu = [
    {
      name: 'Imagenes',
      path: ''
    }
  ];

  const handleUpload = (type) => {
    const formData = new FormData();
    formData.append('type', type);
    if (type === 'home') {
      fileList.forEach((file) => {
        formData.append('image', file);
      });
    } else if (type === 'login') {
      loginList.forEach((file) => {
        formData.append('image', file);
      });
    }

    setUploading({...uploading, [type]: true});

    fetch('http://localhost:3002/load/images', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then(() => {
        if (type === 'home') {
          setFileList([]);
          setHomeKey(Date.now());
        } else if (type === 'login') {
          console.log('login');
          setLoginList([]);
          setLoginKey(Date.now());
        }

        message.success('Imagen cargada con éxito.');
      })
      .catch(() => {
        if (type === 'home') {
          setFileList([]);
          setHomeKey(Date.now());
        } else if (type === 'login') {
          setLoginList([]);
          setLoginKey(Date.now());
        }
        message.error('La carga falló por favor inténtelo nuevamente.');
      })
      .finally(() => {
        setUploading({...uploading, [type]: false});
      });
  };

  return (
    <>
      <DataGridLayout titleGrid="Configuración" userMenuLinks={userMenu}>
        <div className={'container-table pt-16 flex justify-around pb-24'}>
          <div>
            <h3>Home</h3>
            <div
              className={
                'border border-emerald-500 w-52 h-52 mb-4 content-center flex items-center justify-center'
              }
            >
              {uploading.home ? (
                <Oval />
              ) : (
                <img
                  key={homeKey}
                  className={'w-48'}
                  src={`http://localhost:3002/static/home.jpg`}
                  alt=""
                />
              )}
            </div>

            <Upload listType="picture" accept={'.jpg'} {...homeProps}>
              <Button icon={<UploadOutlined />}>Seleccione una foto</Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => handleUpload('home')}
              disabled={fileList.length === 0}
              loading={uploading.home}
              style={{
                marginTop: 16
              }}
            >
              {uploading.home ? 'Cargando' : 'Subir'}
            </Button>
          </div>
          <div>
            <h3>Login</h3>
            <div
              className={
                'border border-emerald-500 w-52 h-52 mb-4 content-center flex items-center justify-center'
              }
            >
              {uploading.login ? (
                <Oval />
              ) : (
                <img
                  key={loginKey}
                  className={'w-48'}
                  src={`http://localhost:3002/static/login.jpg`}
                  alt=""
                />
              )}
            </div>

            <Upload listType="picture" accept={'.jpg'} {...loginProps}>
              <Button icon={<UploadOutlined />}>Seleccione una foto</Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => handleUpload('login')}
              disabled={loginList.length === 0}
              loading={uploading.login}
              style={{
                marginTop: 16
              }}
            >
              {uploading.login ? 'Cargando' : 'Subir'}
            </Button>
          </div>
        </div>
      </DataGridLayout>
    </>
  );
}

export default ConfigPrivate;
