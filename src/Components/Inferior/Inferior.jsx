import React from 'react';
import '../Inferior.css';

const Inferior = () => {
    return (
        <div className="containerpadre">

            <div className="row1">
                <div className="col-uno-uno">
                    <button className="gabriel-button">Gabriel</button>
                    <label className="producto-label">Productos</label>
                    <label className="texto-precio">Precio Actual</label>
                    <label className="texto-dinero">$1000</label>
                </div>
                <div className="col-uno-dos">
                    <span role="img" aria-label="Carrito" className="icono-carrito">
                        🛒
                    </span>
                    <label className="texto-periodo">Periodo Actual</label>
                </div>
            </div>


            <div className='row2'>
                <div className='col-dos-uno'>
                    <div className='subcontainer'>
                        <label className='lbl'>codigo</label>
                        <input className='inp' type='text'></input>
                    </div>

                    <div className='subcontainer'>
                        <label className='lbl'>stock</label>
                        <input className='inp' type='text'></input>
                    </div>

                    <div className='subcontainer'>
                        <label className='lbl'>descripcion</label>
                        <input className='inp' type='text'></input>
                    </div>
                </div>

                <div className='col-dos-dos'>
                    <div className='subcontainer'>
                        <label className='lbl'>codigo</label>
                        <input className='inp' type='text'></input>
                    </div>

                    <div className='subcontainer'>
                        <label className='lbl'>stock</label>
                        <input className='inp' type='text'></input>
                    </div>

                    <div className='subcontainer'>
                        <label className='lbl'>descripcion</label>
                        <input className='inp' type='text'></input>
                    </div>
                </div>

                <div className='col-dos-tres'>
                    <div className='subcontainer'>
                        <label className='lbl'>codigo</label>
                        <input className='inp' type='text'></input>
                    </div>

                    <div className='subcontainer'>
                        <label className='lbl'>stock</label>
                        <input className='inp' type='text'></input>
                    </div>

                    <div className='subcontainer'>
                        <label className='lbl'>descripcion</label>
                        <input className='inp' type='text'></input>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inferior;
