import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import AppRoot from './layout/appRoot/AppRoot';

import Dashboard from './components/dashboard,/Dashboard';
import ImportExcel from './components/importExcel/ImportExcel';
import Login from './components/login/Login';

import RootFaq from './pages/FAQ/RootFaq'
import Index from './pages/FAQ/Index';
import Welcome from './pages/FAQ/Welcome';
import Soport from './pages/FAQ/Soport'
import RootTutorial from './pages/FAQ/Tutorial/RootTutorial';

import Page404 from './pages/404/Page404';

import './App.css';
import IndexT from './pages/FAQ/Tutorial/IndexT';
import Introduccion from './pages/FAQ/Tutorial/1ro/Introduccion';

const queryClient = new QueryClient();

const checkToken = () => {
  const user = localStorage.getItem('initialToken');
  return !!user;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {checkToken() ? (
          <Routes>
            <Route path="pcc/" element={<AppRoot />}>
              <Route index element={<Dashboard />} />
              <Route path="importar-datos" element={<ImportExcel />} />
            </Route>
            <Route path='/pcc/soporte' element={<RootFaq />}>
              <Route index element={<Index />}></Route>
              <Route path='bienvenida' element={<Welcome />}></Route>
              <Route path='uso-general' element={<RootTutorial />}>
                <Route index element={<IndexT />}></Route>
                <Route path='introduccion' element={<Introduccion />}></Route>
                <Route path='primeros-pasos' element={<Introduccion />}></Route>
              </Route>
              <Route path='atencion-cliente' element={<Soport />}></Route>
            </Route>
            <Route path="pcc/ingreso" element={<Navigate to="/pcc/dashboard" />}/>
            <Route path="pcc/not-found" element={<Page404 />} />
            <Route path="pcc/*" element={<Navigate to="/pcc/not-found" replace={false} />}/>
          </Routes>
        ) : (
          <Routes>
            <Route path="pcc/ingreso" element={<Login />} />
            <Route path="pcc/*" element={<Navigate to="/pcc/ingreso" replace={true} />}/>
          </Routes>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;
