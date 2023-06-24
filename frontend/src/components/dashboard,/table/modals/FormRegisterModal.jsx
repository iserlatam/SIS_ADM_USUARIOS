import React, { useEffect, useState } from 'react';

import moment from 'moment';

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';

import * as toasts from './toasts/confirmToasts';

import { useForm } from 'react-hook-form';

import { useMutation } from 'react-query';

import { RxUpdate } from 'react-icons/rx';
import { HiPlus } from 'react-icons/hi';
import {
  MdAddCircle,
  MdArrowForward,
  MdClose,
  MdRefresh,
  MdEditSquare,
} from 'react-icons/md';

//example of creating a mui dialog modal for creating new rows
export const FormRegisterModal = ({
  open,
  onClose,
  isEditing,
  countryData,
  reqFn,
  refreshData,
  row,
}) => {
  const { register, reset, errors, handleSubmit, setValue, getValues } =
    useForm();
  const [id, setId] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    if (row) {
      const formattedDate = moment(row.fecha_creacion).format('YYYY-MM-DD');
      setValue('nombre_completo', row.nombre_completo);
      setValue('tipo_doc', row.tipo_doc);
      setValue('documento', row.documento);
      setValue('fecha_creacion', formattedDate, { shouldValidate: true });
      setValue('departamento', row.departamento);
      setValue('ciudad', row.ciudad);
      setValue('empresa', row.empresa);
      setValue('curso', row.curso);
      setValue('codigo_certificado', row.codigo_certificado);
      setId(row.id);
    }
  }, [row, setValue, setId]);

  const { mutate } = useMutation(reqFn, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    mutate({ id, data });
    // LOADER PENDIENTE
    refreshData();
    refreshData();
    if (isEditing) {
      toasts.successResToast('actualizado');
    } else {
      toasts.successResToast('creado');
    }
    onClose();
  };

  const openModal = () => {
    setConfirmModal(true);
  };

  const handleCancelAction = () => {
    if (!isEditing) {
      setValue('nombre_completo', '');
      setValue('tipo_doc', 'Seleccione tipo de documento');
      setValue('documento', '');
      setValue('fecha_creacion', '');
      setValue('departamento', 'Seleccione departamento');
      setValue('ciudad', '');
      setValue('empresa', '');
      setValue('curso', '');
      setValue('codigo_certificado', '');
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={open} className="relative" fullWidth={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {confirmModal && !isEditing && (
            <div className="fixed bg-opacity-50 bg-gray-700 inset-0 w-screen h-screen flex items-center justify-center">
              <div className="relative border w-[500px] shadow-lg rounded-md flex flex-col items-center justify-center bg-white">
                <div className="container flex justify-between border-b-2 w-full py-6 px-4 items-center">
                  <div className="flex gap-3 items-center">
                    <div className="rounded-full bg-green-200 p-2">
                      <MdAddCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-700 text-left">
                        Crear nuevo registro
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

                <div className="container border-b-2 w-full py-4 px-4">
                  <p className="text-base block mb-2">
                    ¿Está seguro que desea generar un nuevo <b>registro</b>?
                    Recuerde verificar la información antes de crearlo.
                  </p>
                  <p>
                    De todos modos, podrá{' '}
                    <b className="text-orange-400">editarlo</b> luego si es
                    necesario
                  </p>
                </div>

                <div className="container w-full py-4 px-4 flex flex-row justify-end gap-2">
                  <Button onClick={() => setConfirmModal(false)}>
                    regresar
                  </Button>
                  <Button
                    type="submit"
                    className="flex items-center gap-1"
                    color="success"
                    variant="contained"
                  >
                    añadir <HiPlus size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
          {confirmModal && isEditing && (
            <div className="fixed bg-opacity-50 bg-gray-700 inset-0 w-screen h-screen flex items-center justify-center">
              <div className="relative border w-[500px] shadow-lg rounded-md flex flex-col items-center justify-center bg-white">
                <div className="container flex justify-between border-b-2 w-full py-6 px-4 items-center">
                  <div className="flex gap-3 items-center">
                    <div className="rounded-full bg-yellow-200 p-2">
                      <MdEditSquare size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-700 text-left">
                        Actualizar registro No. {id}
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
                    ¿Está seguro que desea actualizar el{' '}
                    <b>registro No. {id}</b>? Recuerde tener en cuenta los
                    siguientes puntos:
                  </p>
                  <ul className="ms-5 list-disc">
                    <li>
                      Verifica que el campo <b>fecha</b> no esté vacío.
                      Generalmente no ocurre, pero es mejor revisar todo
                      correctamente
                    </li>
                    <li>
                      <span>
                        Si actualizó el{' '}
                        <span className="font-bold">registro</span> y no se
                        muestra en la tabla el cambio, recargue la tabla desde
                        el botón{' '}
                        <span className="flex items-center gap-1">
                          <b className="text-orange-400">'recargar datos'</b>{' '}
                          <MdRefresh size={16} />
                        </span>
                      </span>
                    </li>
                  </ul>
                  <p>
                    Recuerde que la actualización del registro es{' '}
                    <b className="text-green-700">segura</b> y puede revertir
                    los cambios cuando sea necesario
                  </p>
                </div>

                <div className="container w-full py-4 px-4 flex flex-row justify-end gap-2">
                  <Button onClick={() => setConfirmModal(false)}>
                    regresar
                  </Button>
                  <Button
                    type="submit"
                    className="flex items-center gap-1"
                    color="warning"
                    variant="contained"
                  >
                    {isEditing ? (
                      <span className="flex gap-1 items-center">
                        Actualizar <RxUpdate size={16} />
                      </span>
                    ) : (
                      <span className="flex gap-1 items-center">
                        añadir <HiPlus size={16} />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
          {isEditing ? (
            <DialogTitle textAlign="center">
              Editar registro No. {id}
            </DialogTitle>
          ) : (
            <DialogTitle textAlign="center">Crear registro</DialogTitle>
          )}
          <DialogContent>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {/* FORMULARIO */}

              <input
                {...register('nombre_completo', {
                  required: true,
                })}
                type="text"
                className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                placeholder="Nombre completo"
              />

              <div className="container flex gap-3 justify-between w-full h-1/2">
                <select
                  {...register('tipo_doc', {
                    required: true,
                  })}
                  name="tipo_doc"
                  className="w-full rounded px-3 bg-white text-gray-400 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                >
                  <option selected>Seleccione tipo de documento</option>
                  <option value="cc">CC</option>
                  <option value="pa">PA</option>
                  <option value="ce">CE</option>
                  <option value="pe">PE</option>
                  <option value="pp">PP</option>
                  <option value="rc">RC</option>
                  <option value="ti">TI</option>
                </select>
                <input
                  {...register('documento')}
                  type="text"
                  className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                  placeholder="No. Documento"
                />
              </div>

              <div className="container flex flex-col gap-1 justify-between w-full h-1/2">
                <label htmlFor="fecha_creacion" className="text-gray-500">
                  Fecha de expedición del certificado
                </label>
                <input
                  {...register('fecha_creacion', {
                    required: true,
                  })}
                  type="date"
                  defaultValue={getValues('fecha_creacion')}
                  id="fecha_creacion"
                  className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                />
              </div>

              <div className="container flex gap-3 justify-between w-full h-1/2">
                <select
                  {...register('departamento', {
                    required: true,
                  })}
                  className="w-full rounded px-3 bg-white text-gray-400 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                >
                  <option>Seleccione departamento</option>
                  {countryData.map((country) => (
                    <option value={country.departamento}>
                      {country.departamento}
                    </option>
                  ))}
                </select>
                <input
                  {...register('ciudad', {
                    required: true,
                  })}
                  type="text"
                  className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                  placeholder="Ciudad"
                />
              </div>
              <input
                {...register('empresa', {
                  required: true,
                })}
                type="text"
                className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                placeholder="Empresa"
              />

              <div className="container flex gap-3 justify-between w-full h-1/2">
                <input
                  {...register('curso', {
                    required: true,
                  })}
                  type="text"
                  className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                  placeholder="Curso"
                />
                <input
                  {...register('codigo_certificado', {
                    required: true,
                  })}
                  type="text"
                  className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                  placeholder="Código de certificado"
                />
              </div>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: '1.25rem' }}>
            {confirmModal ? (
              <>
                <Button disabled onClick={handleCancelAction}>
                  Cancelar
                </Button>
                <Button
                  disabled
                  color="success"
                  variant="contained"
                  onClick={openModal}
                >
                  <div className="flex gap-2 justify-center items-center">
                    <span className="font-bold">Continuar</span>{' '}
                    <MdArrowForward size={16} />
                  </div>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleCancelAction}>Cancelar</Button>
                <Button color="success" variant="contained" onClick={openModal}>
                  {isEditing ? (
                    <div className="flex gap-2 justify-center items-center">
                      <span className="font-bold">Continuar</span>{' '}
                      <MdArrowForward size={16} />
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-center items-center">
                      <span className="font-bold">Continuar</span>{' '}
                      <MdArrowForward size={16} />
                    </div>
                  )}
                </Button>
              </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
