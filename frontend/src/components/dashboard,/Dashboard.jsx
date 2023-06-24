import { useEffect, useState } from 'react';
import Avatar from 'boring-avatars';
import jwtDecode from 'jwt-decode';
import { useMutation } from 'react-query';
import * as DashboardDs from '../../services/dashboardDS';

import Table from './table/Table';

import { Dna } from 'react-loader-spinner';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [tableData, setTableData] = useState([]);

  const getUserInfo = () => {
    const userToken = localStorage.getItem('initialToken');
    const userInfo = jwtDecode(userToken);
    setUser(userInfo);
  };

  const getTableData = async () => {
    const response = await DashboardDs.getAllCertificados();
    return response;
  };

  const { mutate, isLoading } = useMutation(getTableData, {
    onSuccess: (data) => {
      const res = data.data;
      setTableData(res);
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    getUserInfo();
    mutate();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col">
          <div className="p-8 container flex justify-between">
            <div
              className="container font-medium"
              style={{ fontFamily: 'Lato', fontSize: '36px' }}
            >
              <h2>Bienvenido/a</h2>
            </div>
            <div className="flex w-full justify-end">
              <div className="flex gap-4 justify-center items-center">
                <div className="container w-auto">
                  <Avatar
                    size={60}
                    name="Mahalia Jackson"
                    variant="beam"
                    colors={[
                      '#0E6DDF',
                      '#D23535',
                      '#EDEDED',
                      '#C271B4',
                      '#C20D90',
                    ]}
                  />
                </div>
                <div>
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
          </div>
          <section className="p-8 container">
            <div className="overflow-x-auto w-full">
              <Table
                data={tableData}
                mutate={mutate}
                isLoading={isLoading}
              ></Table>
            </div>
          </section>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="container flex flex-col items-center justify-center">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <p className="font-bold tracking-wide text-gray-600">
              Cargando ...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
