import { Bounce, Flip, Hinge, Roll, Slide } from 'react-awesome-reveal';

import Card from './Cards/Card';
import mainCards from './Cards/cardData';

const Index = () => {
  return (
    <div className="w-screen overflow-x-hidden px-20 py-10">
      <div className="w-full">
        <Slide cascade damping={0.5}>
          <h1 className="font-medium text-4xl block mb-3">Acceso rápido</h1>
          <p className="text-2xl text-gray-600 block">
            Aquí encontrará enlaces rápidos a links de interés
          </p>
        </Slide>
      </div>

      <div className="w-full h-fit py-10 grid grid-cols-1 md:grid-cols-3 gap-5 overflow-hidden">
        <Card data={mainCards} />
      </div>
    </div>
  );
};

export default Index;
