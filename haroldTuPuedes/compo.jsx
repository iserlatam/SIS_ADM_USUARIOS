import React from 'react';

const Compo = () => {
    return (
        <div>
            <div className="container px-10">
            <h3 className='block mb-4 text-2xl'>Cosas para hacer mañana: </h3>
            <ul className="list-disc">
              <li>
                <span className='text-lg tracking-wide font-bold text-blue-700'>Modales</span>
                <ol className="list-decimal ms-5">
                  <li>Evitar consultas 'infinitas' ✅</li>
                  <li>Maquetado correcto ✅</li>
                  <li>Transicciones suaves ❌</li>
                  <li><b>Exportar csv</b> modal de confirmacion con loader ✅</li>
                  <li><b>Crear registro</b> modal de confirmacion con loader ✅</li>
                  <li><b>Actualizar registro</b> modal de confirmacion con loader ✅</li>
                  <li><b>Eliminar registro</b> modal de confirmacion con loader ✅</li>
                </ol>
              </li>
              <li>
                <span className='text-lg tracking-wide font-bold text-red-700'>Fallos a corregir</span>
                <ol className="list-decimal ms-5">
                  <li>Actualización no automática al actualizar ✅</li>
                  <li>Revisar los filtros uno por uno ✅</li>
                </ol>
              </li>
              <li>
                <span className='text-lg tracking-wide font-bold text-orange-700'>Cambios finales</span>
                <ol className="list-decimal ms-5">
                  <li><b>Alineación correcta</b> según el dato de la celda</li>
                  <li><b>Resizing</b> de las celdas ❌</li>
                  <li><b>Implementación de tipos de documentos</b> suministrados por el cliente ✅</li>
                </ol>
              </li>
              <li>
                <span className='text-lg tracking-wide font-bold text-green-700'>Despliegue</span>
                <ol className="list-decimal ms-5">
                  <li><b>Ordenamiento del código</b> y archivos</li>
                  <li><b>Revisión minusiosa</b> de sintaxis de código</li>
                  <li><b>Build</b> de la aplicación una vez revisada y documentada</li>
                  <li><b>Testing</b> de la API</li>
                  <li><b>Creación credenciales</b> desde la API</li>
                  <li><b>Subida de frontend</b> al hosting</li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
    );
}

export default Compo;
