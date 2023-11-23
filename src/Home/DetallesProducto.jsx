import React, { useEffect, useState } from "react";
import Inferior from "../Components/Inferior/Inferior";
import axios from "axios";


const DetallesProducto = () => {
  const [datos,setDatos]= useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/productos'); 
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  /*const productoDePrueba = {
    codigo: "Producto de Prueba",
    stock: 10,
    descripcion: "Este es un producto de prueba para pasar por props.",
    precio: "250000",
    rubro: "electronica",
    marca: "samsung",
    observaciones: "aguante milei viva la libertad",
    cantMin: 2,
    cantMax: 300,
    proveedor: "javier milei presidente",

    
  };*/

  return (
    <div>
      {datos.length !== 0 && <Inferior producto={datos} />}
    </div>
  );
};

export default DetallesProducto;