import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query';

import AppRoot from './layout/appRoot/AppRoot';
import HelpRoot from './layout/helpRoot/HelpRoot';

import Dashboard from './components/dashboard,/Dashboard';
import ImportExcel from './components/importExcel/ImportExcel';
import Login from './components/login/Login';

import IndexPage from './pages/help/IndexPage';
import SoportePage from './pages/help/SoportePage';

import Page404 from './pages/404/Page404';

import './App.css';

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
            <Route path='pcc/soporte' element={<HelpRoot />}>
              <Route index element={<IndexPage />}></Route>
              <Route path='atencion-cliente'></Route>
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
