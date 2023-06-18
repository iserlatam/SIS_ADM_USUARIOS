import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { HiPencil, HiOutlineTrash, HiDownload, HiPlus } from 'react-icons/hi';
import moment from 'moment';
import { ListItemIcon, MenuItem } from '@mui/material';
import { ExportToCsv } from 'export-to-csv';

import { useMutation } from 'react-query';

import langConfig from './langConfig';
import { CreateNewAccountModal } from './CreateNewRegister';

const Table = ({ data }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [countryData, setCountryData] = useState([]);

  const getCountryInfo = async () => {
    const response = await fetch('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json')
    return response.json()
  }

  const countryMutation = useMutation(getCountryInfo, {
    onSuccess: (data) => {
      setCountryData(data)
    },
    onError: (error) => {
      console.log(error);
    }
  })

  useEffect(
    () => {
      countryMutation.mutate()
      console.log(countryData);
    },
    []
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //simple recommended way to define a column
        header: 'ID', //optional custom props
        enableSorting: false,
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
        header: 'Tipo Doc',
        size: 25,
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
        header: 'Fecha de Creación',
        size: 25,
        enableEditing: false,
        Cell: ({ cell }) => <span>{moment(cell.getValue()).format('L')}</span>,
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
        header: 'Código Certificado',
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
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  return (
    <>
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
        initialState={{ showColumnFilters: false }}
        renderTopToolbarCustomActions={() => (
          <div className="flex gap-1">
            <button
              title="exportar registros"
              className="hover:bg-gray-100 active:bg-gray-300 transition ease-out duration-300 p-2 rounded-full"
              onClick={handleExportData}
            >
              <HiDownload size={23} className="text-neutral-500"></HiDownload>
            </button>
            <button
              title="Agregar registro nuevo"
              className="hover:bg-gray-100 active:bg-gray-300 transition ease-out duration-300 p-2 rounded-full"
              onClick={() => setCreateModalOpen(true)}
            >
              <HiPlus size={23} className="text-neutral-500"></HiPlus>
            </button>
          </div>
        )}
        renderRowActionMenuItems={({ closeMenu, row }) => [
          <MenuItem
            key={0}
            onClick={() => {
              console.log(row.original.id);
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <HiPencil />
            </ListItemIcon>
            Actualizar registro
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => {
              closeMenu();
            }}
            sx={{ m: 0 }}
          >
            <ListItemIcon>
              <HiOutlineTrash />
            </ListItemIcon>
            Eliminar registro
          </MenuItem>,
        ]}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        countryData={countryData}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
};

export default Table;
