import React, { useState, useEffect } from 'react';
import Grilla from '../Components/Grilla/Grilla';
import Buscador from '../Components/Buscador/Buscador';
import axios from 'axios';

const GrillaYBuscador = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/productos'); // Ajusta la URL según tu configuración de servidor
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); // Este efecto se ejecuta solo una vez al cargar la página

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

export default GrillaYBuscador;
