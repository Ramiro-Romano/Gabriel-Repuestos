import React from 'react';
import Grilla from '../Components/Grilla/Grilla';
import Buscador from '../Components/Buscador/Buscador';

const Home = () => {
  const productos = [
    { codigo: '001', descripcion: 'Producto 1', precio: 10.99, stock: 5 },
    { codigo: '002', descripcion: 'Producto 2', precio: 19.99, stock: 0 },
  ];

  return (
    <div>
      <h1>Bienvenido a Gabriel Repuestos</h1>
      <Buscador/>
      <Grilla productos={productos} />
    </div>
  );
};

export default Home;
