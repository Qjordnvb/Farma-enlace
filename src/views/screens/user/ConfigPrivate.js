import React, {useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';
import axios from 'axios';
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
      if (
        !file.type.toLowerCase().includes('png') &&
        !file.type.toLowerCase().includes('jpg') &&
        !file.type.toLowerCase().includes('jpeg')
      ) {
        message.error('Solo se permiten archivos JPG y PNG');
        return false;
      } else {
        setFileList([file]);
      }
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
      if (
        !file.type.toLowerCase().includes('png') &&
        !file.type.toLowerCase().includes('jpg') &&
        !file.type.toLowerCase().includes('jpeg')
      ) {
        message.error('Solo se permiten archivos JPG y PNG');
        return false;
      } else {
        setLoginList([file]);
      }

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
    axios
      .post(
        `${
          process.env.REACT_APP_NODE_ENV === 'production'
            ? process.env.REACT_APP_PROD_URL
            : process.env.REACT_APP_DEV_URL
        }load/images`,
        formData
      )
      .then(() => {
        if (type === 'home') {
          setFileList([]);
          setHomeKey(Date.now());
        } else if (type === 'login') {
          setLoginList([]);
          setLoginKey(Date.now());
        }

        message.success('Imagen cargada con éxito.');
      })
      .catch((err) => {
        if (type === 'home') {
          setFileList([]);
          setHomeKey(Date.now());
        } else if (type === 'login') {
          setLoginList([]);
          setLoginKey(Date.now());
        }
        if (err?.response?.data?.error === 'Invalid image size') {
          message.error('Tamaño de la imagen no permitido');
        } else {
          message.error('La carga falló, por favor inténtelo nuevamente.');
        }
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
                  src={`${
                    process.env.REACT_APP_NODE_ENV === 'production'
                      ? process.env.REACT_APP_PROD_URL
                      : process.env.REACT_APP_DEV_URL
                  }static/home.jpg`}
                  alt=""
                />
              )}
            </div>
            <p>Image jpg/png de 400px ancho x 360px alto</p>
            <Upload listType="picture" accept={'image/jpg, image/png'} {...homeProps}>
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
                  src={`${
                    process.env.REACT_APP_NODE_ENV === 'production'
                      ? process.env.REACT_APP_PROD_URL
                      : process.env.REACT_APP_DEV_URL
                  }static/login.jpg`}
                  alt=""
                />
              )}
            </div>
            <p>Image jpg/png de 1366px ancho x 768px alto</p>
            <Upload listType="picture" accept={'.jpg, .png'} {...loginProps}>
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
