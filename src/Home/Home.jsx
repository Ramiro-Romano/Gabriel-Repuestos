
import React from "react";
import Inferior from "../Components/Inferior/Inferior";

const Home = () => {
  
  const productoDePrueba = {
    codigo: "Producto de Prueba",
    stock: 10,
    descripcion: "Este es un producto de prueba para pasar por props.",
    rubro: "electronica",
    marca: "samsung",
    observaciones: "aguante milei viva la libertad",
    cantMin: 2,
    cantMax: 300,
    proveedor: "javier milei presidente",

    
  };

  return (
    <div>
      <Inferior producto={productoDePrueba} />
    </div>
  );
};

export default Home;
