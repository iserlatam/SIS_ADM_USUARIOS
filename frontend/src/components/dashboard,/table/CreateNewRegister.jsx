import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import { useState } from 'react';

import { useMutation } from 'react-query';
import axios from 'axios';
import * as dashboardDs from '../../../services/dashboardDS';

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, onClose, countryData }) => {
  const { register, errors, handleSubmit } = useForm();

  const postData = async (data) => {
    const response = await dashboardDs.postNewCertificado(data);
    return response;
  };

  const formMutate = useMutation(postData, {
    onSuccess: (data) => {
      // para mas tarde
      console.log('Registrado guardado con exito');
    },
    onError: (error) => {
        console.log(error);
    }
  });

  const onSubmit = (data) => {
    //put your validation logic here
    formMutate.mutate(data)
    onClose()
    // onClose();
  };

  return (
    <Dialog open={open} fullWidth={true}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle textAlign="center">Nuevo Registro</DialogTitle>
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
              {...register('nombre_completo')}
              type="text"
              className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
              placeholder="Nombre completo"
            />

            <div className="container flex gap-3 justify-between w-full h-1/2">
              <select
                {...register('tipo_doc')}
                name="tipo_doc"
                className="w-full rounded px-3 bg-white text-gray-400 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
              >
                <option selected>Seleccione tipo de documento</option>
                <option value="cc">C.C</option>
                <option value="te">T.E</option>
              </select>
              <input
                {...register('documento')}
                type="text"
                className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                placeholder="No. Documento"
              />
            </div>

            <div className="container flex gap-3 justify-between w-full h-1/2">
              <select
                {...register('departamento')}
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
                {...register('ciudad')}
                type="text"
                className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                placeholder="Ciudad"
              />
            </div>
            <input
              {...register('empresa')}
              type="text"
              className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
              placeholder="Empresa"
            />

            <div className="container flex gap-3 justify-between w-full h-1/2">
              <input
                {...register('curso')}
                type="text"
                className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                placeholder="Curso"
              />
              <input
                {...register('codigo_certificado')}
                type="text"
                className="w-full rounded px-3 text-neutral-700 focus:border-blue-400 focus:border-2 focus:bg-slate-50 transition-colors ease-linear border-neutral-300 border h-14"
                placeholder="Código de certificado"
              />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            onClick={handleSubmit}
          >
            añadir +
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
