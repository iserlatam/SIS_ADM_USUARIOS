import './App.css';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from 'react-query'

import AppRoot from './layout/appRoot/AppRoot';
import HelpRoot from './layout/helpRoot/HelpRoot'

import Dashboard from './components/dashboard,/Dashboard';
import ImportExcel from './components/importExcel/ImportExcel';
import Login from './components/login/Login';

import IndexPage from './pages/help/IndexPage'
import Page404 from './pages/404/Page404'
import SoportePage from './pages/help/SoportePage';

const queryClient = new QueryClient()

const checkToken = () => {
  const user = localStorage.getItem('initialToken');
  return !!user // !!user -> devuelva true si existe y false si es null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      {checkToken() ? (
        <Routes>
          <Route path="/" element={<AppRoot />}>
            <Route index element={<Dashboard />} />
            <Route path="importar-datos" element={<ImportExcel />} />
          </Route>
          <Route path="/ayuda" element={<HelpRoot />} >
            <Route index element={<IndexPage />} />
            <Route path='soporte-tecnico' element={<SoportePage />} />
          </Route>
          <Route path="ingreso" element={<Navigate to="/" replace={true} />} />
          <Route path='not-found' element={<Page404 />} />
          <Route path='/*' element={<Navigate to="/not-found" replace={false}/>}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="ingreso" element={<Login />} />
          <Route
            path="/*"
            element={<Navigate to="/ingreso" replace={true} />}
          />
        </Routes>
      )}
    </Router>
    </QueryClientProvider>
    
  );
}

export default App;
