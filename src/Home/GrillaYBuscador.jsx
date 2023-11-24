import React, { useState, useEffect, useContext } from 'react';
import Grilla from '../Components/Grilla/Grilla';
import Buscador from '../Components/Buscador/Buscador';
import axios from 'axios';
import { DatosContext } from '../context/DatosContext'; // Importa el contexto

const GrillaYBuscador = () => {
  const { actualizarProductoSeleccionado } = useContext(DatosContext); // Obtiene la función del contexto
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (result) => {
    setProductos(result);
  };

  const handleClickFila = (producto) => {
    actualizarProductoSeleccionado(producto); // Actualiza el producto seleccionado en el contexto
  };

  return (
    <div>
      <h1>Bienvenido a Gabriel Repuestos</h1>
      <Buscador onSearch={handleSearch} />
      <Grilla productos={productos} onRowClick={handleClickFila} />
    </div>
  );
};

export default GrillaYBuscador;
