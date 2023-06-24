import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import langConfig from './langConfig';

import moment from 'moment';

import { useMutation } from 'react-query';
import * as dashboardDs from '../../../services/dashboardDS';

import { ExportToCsv } from 'export-to-csv';

import { Button, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { FormRegisterModal } from './modals/FormRegisterModal';
import { postFormData, updateData } from './modals/requestFns';
import { HiPencil, HiOutlineTrash, HiDownload, HiPlus } from 'react-icons/hi';
import { MdClose, MdDeleteForever, MdWarning } from 'react-icons/md';

import * as toasts from './modals/toasts/confirmToasts';

const Table = ({ data, mutate }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [rowInfo, setRowInfo] = useState(null);
  const [countryData, setCountryData] = useState([]);

  const [id, setId] = useState(0);

  const getCountryInfo = async () => {
    const response = await fetch(
      'https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json'
    );
    return response.json();
  };

  const countryMutation = useMutation(getCountryInfo, {
    onSuccess: (data) => {
      setCountryData(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    countryMutation.mutate();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //simple recommended way to define a column
        header: 'ID', //optional custom props
        enableEditing: false,
        size: 25,
        Header: <span>ID</span>,
      },
      {
        accessorKey: 'nombre_completo', //alternate way
        header: 'Nombre Completo',
        minSize: 180,
        maxSize: 250,
        size: 180,
        Header: () => <i>Nombre Completo</i>, //optional custom header render
      },
      {
        accessorKey: 'tipo_doc',
        header: 'tipo_doc',
        size: 25,
        Header: <span>Tipo Doc</span>,
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'documento',
        header: 'Documento',
        size: 25,
        enableClickToCopy: true,
      },
      {
        accessorKey: 'fecha_creacion',
        header: 'fecha_creacion',
        size: 25,
        Header: <span>Fecha de Certificado</span>,
        enableEditing: false,
        Cell: ({ cell }) => {
          const date = cell.getValue();
          const fixedDate = moment(date).format('DD MMM YYYY');
          return <span>{fixedDate}</span>;
        },
      },
      {
        accessorKey: 'departamento',
        header: 'Departamento',
        maxSize: 120,
      },
      {
        accessorKey: 'ciudad',
        header: 'Ciudad',
        size: 80,
      },
      {
        accessorKey: 'empresa',
        header: 'Empresa',
        size: 200,
      },
      {
        accessorKey: 'curso',
        header: 'Curso',
        size: 250,
      },
      {
        accessorKey: 'codigo_certificado',
        header: 'Codigo Certificado',
        size: 25,
      },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header.replace(/ /g, '_').toLowerCase()),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  const handleDeleteClick = async () => {
    await dashboardDs.deleteCertificado(id);
    toasts.deleteResToast();
    refreshData();
  };

  const openDeleteModal = (id) => {
    setId(id);
    setDeleteModalOpen(true);
  };

  function handleCreateClick() {
    setCreateModalOpen(true);
  }

  function handleEditClick(row) {
    setRowInfo(row);
    setUpdateModalOpen(true);
  }

  const refreshData = () => {
    mutate();
  };

  return (
    <>
      {deleteModalOpen && (
        <div className="z-20 fixed bg-opacity-50 bg-gray-700 inset-0 w-screen h-screen flex items-center justify-center">
          <div className="relative border w-[500px] shadow-lg rounded-md flex flex-col items-center justify-center bg-white">
            <div className="container flex justify-between border-b-2 w-full py-6 px-4 items-center">
              <div className="flex gap-3 items-center">
                <div className="rounded-full bg-red-200 p-2">
                  <MdWarning size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-700 text-left">
                    Eliminar registro No. {id}
                  </h3>
                </div>
              </div>
              <div>
                <MdClose
                  onClick={() => setDeleteModalOpen(false)}
                  size={25}
                  className="text-neutral-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="container flex flex-col gap-2 border-b-2 w-full py-4 px-4">
              <p className="text-base block">
                ¿Está seguro que desea eliminar el <b>registro No. {id}</b>?{' '}
                <span className="text-lg font-bold">
                  {' '}
                  Esta acción es irreversible
                </span>
              </p>
            </div>

            <div className="container w-full py-4 px-4 flex flex-row justify-end gap-2">
              <Button onClick={() => setDeleteModalOpen(false)}>
                regresar
              </Button>
              <Button
                className="flex items-center gap-1"
                color="error"
                variant="contained"
                onClick={handleDeleteClick}
              >
                <span>Confimar</span>
                <MdDeleteForever size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
      <MaterialReactTable
        columns={columns}
        data={data}
        layoutMode="semantic"
        localization={langConfig}
        enableColumnOrdering
        enableColumnFilters={true}
        enablePagination={true}
        enableColumnFilterModes
        enableRowActions
        enableEditing
        renderTopToolbarCustomActions={() => (
          <div className="flex gap-1">
            <Tooltip arrow title="Recargar datos">
              <IconButton onClick={refreshData}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Exportar registros">
              <button
                className="hover:bg-gray-100 active:bg-gray-300 transition ease-out duration-300 p-2 rounded-full"
                onClick={handleExportData}
              >
                <HiDownload size={23} className="text-neutral-500"></HiDownload>
              </button>
            </Tooltip>
            <Tooltip arrow title="Agregar registro">
              <button
                className="hover:bg-gray-100 active:bg-gray-300 transition ease-out duration-300 p-2 rounded-full"
                onClick={handleCreateClick}
              >
                <HiPlus size={23} className="text-neutral-500"></HiPlus>
              </button>
            </Tooltip>
          </div>
        )}
        renderRowActions={({ row }) => [
          <div className="container flex gap-4 justify-center">
            <button
              onClick={() => {
                openDeleteModal(row.original.id);
              }}
              className="w-18 h-18"
            >
              <HiOutlineTrash size={19} />
            </button>
            <button
              // onClick={() => table.setEditingRow(row)}
              onClick={() => {
                handleEditClick(row.original);
              }}
              className="w-18 h-18"
            >
              <HiPencil size={19} />
            </button>
          </div>,
        ]}
      />

      {rowInfo && (
        <FormRegisterModal
          columns={columns}
          isEditing={true}
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          countryData={countryData}
          row={rowInfo}
          refreshData={refreshData}
          reqFn={updateData}
        />
      )}

      <FormRegisterModal
        columns={columns}
        isEditing={false}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        countryData={countryData}
        reqFn={postFormData}
        refreshData={refreshData}
      />
    </>
  );
};

export default Table;
