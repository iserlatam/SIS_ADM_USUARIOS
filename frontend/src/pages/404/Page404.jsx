const Page404 = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="container flex gap-1 flex-col items-center justify-center">
        <span className="block font-bold text-neutral-800 text-[42px]">
          ¿Buscas algo, <span className="text-yellow-400">ami</span>
          <span className="text-blue-500">gui</span>
          <span className="text-red-500">to</span>?
        </span>
        <span className="block text-[24px] mb-3 text-slate-500">
          <b>404</b> Página no encontrada
        </span>
        <img
          src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif"
          width="400"
        />
        <a href="/" className='w-full text-center'>
          <button className="mt-3 py-3 w-1/6 text-white font-bold rounded-md shadow-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 ease-out">
            Volver al inicio
          </button>
        </a>
        <a href="/pcc/soporte" className='w-full text-center mt-2 underline text-gray-600'>
          Ir a la guía
        </a>
      </div>
    </div>
  );
};

export default Page404;
