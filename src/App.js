import {BrowserRouter, Routes, Route} from 'react-router-dom';
//routes
import {LOGIN, PRIVATE, DATA} from 'config/paths';
import AuthContextProvider from 'contexts/authContext';
import PrivateRoute from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';
//views
import useViews from 'views';

function App() {
  const {useScreens} = useViews();
  const {LoginPage, HomePrivate, DataGrid} = useScreens();

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PRIVATE} element={<PrivateRoute />}>
            <Route index element={<HomePrivate />} />
            <Route path={DATA} element={<DataGrid />} />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path={LOGIN} element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
