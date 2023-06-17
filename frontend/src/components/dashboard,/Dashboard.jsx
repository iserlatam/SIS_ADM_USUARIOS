import React, { useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import jwtDecode from 'jwt-decode';
import { useQuery, useMutation } from 'react-query';
import * as DashboardDs from '../../services/dashboardDS';
import Table from './table/Table';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [tableData, setTableData] = useState([]);

  const getUserInfo = () => {
    const userToken = localStorage.getItem('initialToken');
    const userInfo = jwtDecode(userToken);
    setUser(userInfo);
  };

  const getTableData = async () => {
    const { data: response } = await DashboardDs.getAllCertificados();
    return response;
  };

  const getAllRegistersMutate = useMutation(getTableData, {
    onSuccess: (data) => {
      JSON.stringify(data, null, 2);
      setTableData(data.data);
      console.log(tableData);
      // setTableData()
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    getUserInfo();
    getAllRegistersMutate.mutate();
  }, []);

  return (
    <div className='flex flex-col'>
      <div className="p-8 container flex justify-between">
        <div
          className="container font-medium"
          style={{ fontFamily: 'Lato', fontSize: '36px' }}
        >
          <h2>Bienvenido/a</h2>
        </div>
        <div
          className="container flex gap-4 justify-between items-center"
          style={{ flexBasis: '261px' }}
        >
          <div className="container" style={{ width: 'auto' }}>
            <Avatar
              size={60}
              name="Mahalia Jackson"
              variant="beam"
              colors={['#0E6DDF', '#D23535', '#EDEDED', '#C271B4', '#C20D90']}
            />
          </div>
          <div className="container">
            <h4
              className="font-medium"
              style={{
                fontFamily: 'Lato',
                fontSize: '28px',
                lineHeight: '35px',
              }}
            >
              {user.alias}
            </h4>
            <span
              className="font-medium opacity-50"
              style={{ fontFamily: 'Lato', fontSize: '14px' }}
            >
              {user.correo}
            </span>
          </div>
        </div>
      </div>
      {getAllRegistersMutate.isLoading ? (
        <p>cargando...</p>
      ) : ( 
        <section className="p-8 container">
          <div className="overflow-x-auto w-full">
            <Table data={tableData}></Table>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
