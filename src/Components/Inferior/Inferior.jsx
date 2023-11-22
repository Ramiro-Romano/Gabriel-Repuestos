import React, { useState } from 'react';
import '../Inferior.css';

const Inferior = ({ producto }) => {
    /*const [codigo, setCodigo] = useState(producto.codigo || '');
    console.log(codigo)
    const [stock, setStock] = useState(producto.stock || '');
    const [descripcion, setDescripcion] = useState(producto.descripcion || '');
    const [rubro, setRubro] = useState(producto.rubro || '');
    const [marca, setMarca] = useState(producto.marca || '');
    const [observaciones, setObservaciones] = useState(producto.observaciones || '');
    const [cantMin, setCantMin] = useState(producto.cantMin || '');
    const [cantMax, setCantMax] = useState(producto.cantMax || '');
    const [proveedor, setProveedor] = useState(producto.proveedor || '');
    const [precio, setPrecio] = useState(producto.precio || ''); */

    return (
        <div className="containerpadre">
            <div className="containerpadre">
                <div className="row1">
                    <div className="col-uno-uno">
                        <button className="gabriel-button">Gabriel</button>
                        <label className="producto-label">Productos</label>
                    </div>

                    <div className="col-uno-tres">
                        <span role="img" aria-label="Carrito" className="icono-carrito">
                            🛒
                        </span>
                        <label className="texto-periodo">Periodo Actual</label>
                    </div>

                    <div className='col-uno-dos'>
                        <label className="texto-precio">Precio de venta</label>
                        <label className= "texto-dinero">{producto[0].precio}</label>
                    </div>
                </div>

                <div className='row2'>
                    <div className='col-dos-uno'>
                        <div className='subcontainer'>
                            <label className='lbl'>codigo</label>
                            <label>{producto[0].codigo}</label>
                        </div>

                        <div className='subcontainer'>
                            <label className='lbl'>stock</label>
                            <label>{producto[0].stock}</label>
                        </div>

                        <div className='subcontainer'>
                            <label className='lbl'>descripcion</label>
                            <label>{producto[0].descripcion}</label>
                        </div>
                    </div>

                    <div className='col-dos-dos'>
                        <div className='subcontainer'>
                            <label className='lbl'>Rubro</label>
                            <label>{producto[0].rubro}</label>
                        </div>

                        <div className='subcontainer'>
                            <label className='lbl'>Marca</label>
                            <label>{producto[0].marca}</label>
                        </div>

                        <div className='subcontainer'>
                            <label className='lbl'>Observaciones</label>
                            <label>{producto[0].observaciones}</label>
                        </div>
                    </div>

                    <div className='col-dos-tres'>
                        <div className='subcontainer'>
                            <label className='lbl'>Cant_min</label>
                            <label>{producto[0].cantMin}</label>
                        </div>

                        <div className='subcontainer'>
                            <label className='lbl'>Cant_max</label>
                            <label>{producto[0].cantMax}</label>
                        </div>

                        <div className='subcontainer'>
                            <label className='lbl'>Proveedor</label>
                            <label>{producto[0].proveedor}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inferior;
