import React, { createContext, useState } from 'react';

const DatosContext = createContext();

const DatosProvider = ({ children }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const actualizarProductoSeleccionado = (producto) => {
    setProductoSeleccionado(producto);
  };

  return (
    <DatosContext.Provider
      value={{
        productoSeleccionado,
        actualizarProductoSeleccionado,
      }}
    >
      {children}
    </DatosContext.Provider>
  );
};

export { DatosProvider, DatosContext };
