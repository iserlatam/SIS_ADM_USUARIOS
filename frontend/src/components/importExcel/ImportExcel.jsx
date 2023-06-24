import { useState } from 'react';
import { postNewCertificado } from '../../services/dashboardDS';

import Papa from 'papaparse';
import moment from 'moment';

import { Dna } from 'react-loader-spinner';
import { MdClose, MdDone, MdUploadFile } from 'react-icons/md';

import './ImportExcel.css';

const ImportExcel = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const csvData = event.target.result;
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            const rows = results.data;

            rows.pop()

            rows.forEach(async (row) => {
              if (row.ID) {
                delete row.ID;
              } else {
                try {
                  setIsLoading(true);

                  const fixedDate = moment.utc(row.fecha_creacion).toISOString();
                  row.fecha_creacion = fixedDate;

                  await postNewCertificado(row);
                  console.log('Subido correctamente!');
                  window.location.href = '/pcc/';

                } catch (e) {
                  console.error(e);
                } finally {
                  setIsLoading(false);
                }
              }
            });

            console.log(rows);
          },
          error: (error) => {
            console.error('Error al parsear el archivo CSV:', error);
          },
        });
      };

      reader.readAsText(selectedFile);
    }
  };

  function returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          {confirmModal && (
            <div className="fixed bg-opacity-50 bg-gray-700 inset-0 w-screen h-screen flex items-center justify-center">
              <div className="relative border w-[500px] shadow-lg rounded-md flex flex-col items-center justify-center bg-white">
                <div className="container flex justify-between border-b-2 w-full py-6 px-4 items-center">
                  <div className="flex gap-3 items-center">
                    <div className="rounded-full bg-blue-200 p-2">
                      <MdUploadFile size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-700 text-left">
                        Subir archivo CSV
                      </h3>
                    </div>
                  </div>
                  <div>
                    <MdClose
                      onClick={() => setConfirmModal(false)}
                      size={25}
                      className="text-neutral-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="container flex flex-col gap-2 border-b-2 w-full py-4 px-4">
                  <p className="text-base block">
                    Antes de subir el archivo <b>{selectedFile.name}</b>,
                    recuerde tener en cuenta los siguientes puntos:
                  </p>
                  <ul className="ms-5 flex flex-col gap-1 list-disc">
                    <li>
                      La plataforma sólo acepta archivos con las siguientes
                      extensiones del grupo <b>hoja de cálculo:</b>
                      <ul className="ms-8 list-disc">
                        <li>
                          <b>.csv</b>
                        </li>
                        <li>
                          <b>.xlsc</b>
                        </li>
                        <li>
                          <b>.xls</b>
                        </li>
                        <li>
                          <b>.xlsb</b>
                        </li>
                      </ul>
                    </li>
                    <li>
                      En caso de subir un archivo con una extensión diferente,
                      el sistema colapsará y se tendrá que comunicar con el
                      soporte técnico para corregir el error. Ejemplos de
                      extensiones no validas: <b> .png, .jpg, .pdf</b>, entre
                      otras
                    </li>
                    <li>
                      En próximas actualizaciones del sistema, se harán las
                      validaciones y prevenciones necesarias para mejorar el
                      desempeño de la plataforma
                    </li>
                  </ul>
                </div>

                <div className="container w-full py-4 px-4 flex flex-row justify-end gap-2">
                  <button
                    className=" bg-gray-500 p-3 rounded hover:bg-gray-600 active:bg-gray-700 transition-colors duration-200 ease-out text-white"
                    onClick={() => setConfirmModal(false)}
                  >
                    Regresar
                  </button>
                  <button
                    className="flex items-center gap-1 bg-blue-600 p-3 rounded hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 ease-out text-white"
                    color="success"
                    variant="contained"
                    onClick={handleFileUpload}
                  >
                    <span className="flex gap-1 items-center">
                      Sí, estoy seguro <MdDone size={16} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="container w-full h-full flex items-center justify-center">
            <div className="container w-auto h-auto p-10 flex gap-8 items-center justify-center shadow-xl shadow-cake-blue-200">
              <div className="container flex flex-col items-start justify-center gap-4">
                <h1 className="font-bold uppercase text-2xl text-neutral-700">
                  Carga de archivo CSV
                </h1>
                <div className="flex flex-row">
                  <input
                    type="file"
                    accept=".csv,.xlsc,.xls,.xlsb"
                    multiple
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <span className="block w-1/3">
                      {returnFileSize(selectedFile.size)}
                    </span>
                  )}
                </div>
              </div>
              <div className="container">
                <button
                  className="block rounded bg-cake-blue-700 hover:bg-cake-blue-800 active:bg-cake-blue-900 transition-colors ease-in duration-300 text-white font-bold text-sm p-4 uppercase"
                  onClick={() => setConfirmModal(true)}
                >
                  Leer y subir archivo
                </button>
              </div>
            </div>
          </div>
        </>
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

export default ImportExcel;
