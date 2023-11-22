import React, { useState } from 'react';
import Grilla from '../Components/Grilla/Grilla';
import Buscador from '../Components/Buscador/Buscador';

const Home = () => {
  const [productos, setProductos] = useState([]);

  const handleSearch = (result) => {
    setProductos(result);
  };

  return (
    <div>
      <h1>Bienvenido a Gabriel Repuestos</h1>
      <Buscador onSearch={handleSearch} />
      <Grilla productos={productos} />
    </div>
  );
};

export default Home;
