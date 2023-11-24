import React, { useContext } from 'react';
import { DatosContext } from '../../context/DatosContext'; // Importa el contexto
import '../Inferior.css';

const Inferior = () => {
  const { productoSeleccionado } = useContext(DatosContext); // Obtiene el producto seleccionado desde el contexto

  return (
    <div className="containerpadre">
      {productoSeleccionado ? (
        <div>
          <div className="row1">
            <div className="col-uno-uno">
              <label className="producto-label">Producto</label>
            </div>

            <div className="col-uno-dos">
              <label className="texto-precio">Precio de venta</label>
              <label className="texto-dinero">{productoSeleccionado.precio}</label>
            </div>
          </div>

          <div className="row2">
            <div className="col-dos-uno">
              <div className="subcontainer">
                <label className="lbl">Código</label>
                <label>{productoSeleccionado.codigo}</label>
              </div>

              <div className="subcontainer">
                <label className="lbl">Stock</label>
                <label>{productoSeleccionado.stock}</label>
              </div>

              <div className="subcontainer">
                <label className="lbl">Descripción</label>
                <label>{productoSeleccionado.descripcion}</label>
              </div>
            </div>

            <div className="col-dos-dos">
              <div className="subcontainer">
                <label className="lbl">Rubro</label>
                <label>{productoSeleccionado.rubro}</label>
              </div>

              <div className="subcontainer">
                <label className="lbl">Marca</label>
                <label>{productoSeleccionado.marca}</label>
              </div>

              <div className="subcontainer">
                <label className="lbl">Observaciones</label>
                <label>{productoSeleccionado.observaciones}</label>
              </div>
            </div>

            <div className="col-dos-tres">
              <div className="subcontainer">
                <label className="lbl">Cant_min</label>
                <label>{productoSeleccionado.cant_min}</label>
              </div>

              <div className="subcontainer">
                <label className="lbl">Cant_max</label>
                <label>{productoSeleccionado.cant_max}</label>
              </div>

              <div className="subcontainer">
                <label className="lbl">Proveedor</label>
                <label>{productoSeleccionado.proveedor}</label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className='NoProduct'>NO SE HA SELECCIONADO UN PRODUCTO</h2>
      )}
    </div>
  );
};

export default Inferior;
