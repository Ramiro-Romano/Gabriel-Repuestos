import React from 'react';
import Inferior from '../Components/Inferior/Inferior';
import GrillaYBuscador from './GrillaYBuscador';
import { DatosProvider } from '../context/DatosContext'; // Importa el proveedor del contexto

const Home = () => {
  return (
    <DatosProvider> {/* Envuelve tus componentes con el proveedor del contexto */}
      <div>
        <GrillaYBuscador />
        <Inferior />
      </div>
    </DatosProvider>
  );
};

export default Home;
