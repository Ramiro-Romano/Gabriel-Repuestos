import React from 'react';
import Grilla from '../Components/Grilla/Grilla';

const Home = () => {
  // Supongamos que tienes un array de productos
  const productos = [
    { codigo: '001', descripcion: 'Producto 1', precio: 10.99, stock: 5 },
    { codigo: '002', descripcion: 'Producto 2', precio: 19.99, stock: 0 },
    // ... otros productos
  ];

  return (
    <div>
      <h1>Bienvenido a Gabriel Repuestos</h1>
      <Grilla productos={productos} />
    </div>
  );
};

export default Home;
