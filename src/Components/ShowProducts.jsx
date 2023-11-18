import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { show_alert } from '../Components/Function';
import { FaPlusCircle, FaGift, FaDollarSign, FaFileSignature } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import BotonEliminar from './BotonEliminar';
import BotonEditar from './BotonEditar';
import '../css/ShowProducts.css'

const ShowProducts = () => {
    const URL = 'http://localhost:3000/productos';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [codigo, setCodigo] = useState('');
    const [marca, setMarca] = useState('');
    const [stock, setStock] = useState(null);
    const [rubro, setRubro] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [cant_max, setCant_Max] = useState(null);
    const [cant_min, setCant_Min] = useState(null);
    const [proveedor, setProveedor] = useState('');
    const [precio, setPrecio] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');
    const [abierto, setAbierto] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const respuesta = await axios.get(URL);
            setProducts(respuesta.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            show_alert('Error', 'Ocurrió un error al obtener productos', 'error');
        }
    }

    const abrirModal = (op, id, codigo, descripcion, precio) => {
        setAbierto(!abierto);
        setId('');
        setCodigo('');
        setMarca('');
        setPrecio('');
        setDescripcion('');
        setRubro('');
        setObservaciones('');
        setStock(null);
        setCant_Max(null);
        setCant_Min(null);
        setProveedor('');
        setOperation(op);

        if (op === 1) {
            setTitle('Registrar Producto')
        } else if (op === 2) {
            setTitle('Editar Producto')
            setId(id);
            setCodigo(codigo);
            setMarca(marca);
            setPrecio(precio);
            setDescripcion(descripcion);
            setRubro(rubro);
            setObservaciones('');
            setStock();
            setCant_Max();
            setCant_Min();
            setProveedor('')
        }
    };

    const validar = async () => {
        var parametros;
        var metodo;
        if (!codigo || codigo.trim() === '') {
            show_alert('Coloca el codigo del producto', 'warning');
        } else if (!marca || marca.trim() === '') {
            show_alert('Coloca la marca del producto', 'warning');
        } else if (!precio || precio === '') {
            show_alert('Coloca el precio del producto', 'warning');
        } else if (!descripcion || descripcion.trim() === '') {
            show_alert('Coloca la descripción del producto', 'warning');
        } else if (!rubro || rubro.trim() === '') {
            show_alert('Coloca el rubro del producto', 'warning');
        } else if (!observaciones || observaciones.trim() === '') {
            show_alert('Coloca la observación del producto', 'warning');
        } else if (!stock || stock.trim() === '') {
            show_alert('Coloca el stock del producto', 'warning');
        } else if (!cant_max || cant_max.trim() === '') {
            show_alert('Coloca la cantidad máxima del producto', 'warning');
        } else if (!cant_min || cant_min.trim() === '') {
            show_alert('Coloca la cantidad mínima del producto', 'warning');
        } else if (!proveedor || proveedor.trim() === '') {
            show_alert('Coloca el proveedor del producto', 'warning');

        } else {
            // Verificar si el producto ya existe en la lista
            const productoExistente = products.find((product) => product.codigo.trim() === codigo.trim());

            if (operation === 1) {
                if (productoExistente) {
                    // Si el producto es nuevo y ya existe uno con el mismo nombre, mostrar mensaje de producto existente
                    Swal.fire({
                        icon: 'info',
                        title: 'Producto Existente',
                        text: 'El producto ya ha sido agregado anteriormente.',
                    });
                } else {
                    // Si el producto es nuevo y no existe en la lista, mostrar mensaje de producto agregado
                    parametros = { codigo: codigo.trim(), marca: marca.trim(), precio: precio.trim(), descripcion: descripcion.trim(), rubro: rubro.trim(), observaciones: observaciones.trim(), stock: stock.trim(), cant_max: cant_max.trim(), cant_min: cant_min.trim(), proveedor: proveedor.trim() };
                    metodo = 'POST';
                    await enviarSolicitud(metodo, parametros);
                    getProducts(); // Actualiza la tabla después de la operación
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto Agregado',
                        text: 'El producto se ha agregado exitosamente.',
                    });

                    const limpiarCampos = () => {
                        setCodigo('');
                        setMarca('');
                        setPrecio('');
                        setDescripcion('');
                        setRubro('');
                        setObservaciones('');
                        setStock();
                        setCant_Max();
                        setCant_Min();
                        setProveedor('');
                    }

                    abrirModal(1);
                    limpiarCampos();
                }
            } else {
                // Si la operación no es agregar (es editar), realizar la edición
                parametros = { id: id, codigo: codigo.trim(), marca: marca.trim(), precio: precio.trim(), descripcion: descripcion.trim(), rubro: rubro.trim(), observaciones: observaciones.trim(), stock: stock.trim(), cant_max: cant_max.trim(), cant_min: cant_min.trim(), proveedor: proveedor.trim() };
                metodo = 'PUT';
                await enviarSolicitud(metodo, parametros);
                getProducts(); // Actualiza la tabla después de la operación
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Editado',
                    text: 'El producto se ha editado exitosamente.',
                });
                abrirModal(1);
            }
        }
    }

    const enviarSolicitud = async (metodo, parametros) => {
        try {
            const respuesta = await axios({ method: metodo, url: URL, data: parametros });
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alert(msj, tipo);
            if (tipo === 'success') {
                document.getElementById('btnCerrar').click();
            }
        } catch (error) {
            show_alert('Error en la solicitud', 'error');
            console.log(error);
        }
    }



    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'></div>
                </div>

                <div className='row mt-3'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='table-responsive-lg text-center'>
                            <Table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>CÓDIGO</th>
                                        <th>MARCA</th>
                                        <th>PRECIO</th>
                                        <th>DESCRIPCIÓN</th>
                                        <th>RUBRO</th>
                                        <th>OBSERVACIÓN</th>
                                        <th>STOCK</th>
                                        <th>CANT_MAX</th>
                                        <th>CANT_MIN</th>
                                        <th>PROVEEDOR</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {products.map((product, i) => (
                                        <tr key={product.id}>
                                            <td>{(i + 1)}</td>
                                            <td>{(product.codigo)}</td>
                                            <td>{(product.marca)}</td>
                                            <td>${new Intl.NumberFormat('es-mx').format(product.precio)}</td>
                                            <td>{(product.descripcion)}</td>
                                            <td>{(product.rubro)}</td>
                                            <td>{(product.observaciones)}</td>
                                            <td>{(product.stock)}</td>
                                            <td>{(product.cant_max)}</td>
                                            <td>{(product.cant_min)}</td>
                                            <td>{(product.proveedor)}</td>
                                            <td>
                                                <BotonEditar product={product} onUpdate={getProducts} />
                                                &nbsp;
                                                <BotonEliminar url={URL} id={product.id} onUpdate={getProducts} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="text-center">
                                <div className="btn-container">
                                    <Button className='btn btn-dark' data-bs-toggle='modal' onClick={() => abrirModal(1)}>
                                        <FaPlusCircle /> Añadir
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Modal isOpen={abierto} className='custom-modal centered-modal'>
                <ModalHeader>
                    <label className='h5'>{title}</label>
                </ModalHeader>


                <ModalBody>
                    <FormGroup className='input-group mb-3'>
                        <Label for='codigo'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='codigo' value={codigo} placeholder='Codigo' onChange={(e) => setCodigo(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='marca'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='marca' value={marca} placeholder='Marca' onChange={(e) => setMarca(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='precio'></Label>
                        <span className='input-group-text'><FaDollarSign /></span>
                        <Input
                            className='form-control'
                            autoComplete='off'
                            type='text'
                            id='precio'
                            value={precio}
                            placeholder='Precio'
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^\d*\.?\d*$/.test(inputValue)) {
                                    setPrecio(inputValue);
                                } else {
                                    // Muestra un mensaje de error con SweetAlert2
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Solo se permiten números.',
                                    });
                                }
                            }}
                        />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='descripcion'></Label>
                        <span className='input-group-text'><FaFileSignature /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='descripcion' value={descripcion} placeholder='Descripción' onChange={(e) => setDescripcion(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='rubro'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='rubro' value={rubro} placeholder='Rubro' onChange={(e) => setRubro(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='observaciones'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='observaciones' value={observaciones} placeholder='Observaciones' onChange={(e) => setObservaciones(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='stock'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input
                            className='form-control'
                            autoComplete='off'
                            type='text'
                            id='stock'
                            value={stock}
                            placeholder='Stock'
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const numericValue = inputValue.replace(/\D/g, ''); // Filtrar caracteres no numéricos
                    
                                if (inputValue !== numericValue) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Solo se permiten números.',
                                    });
                                }
                    
                                setStock(numericValue); // Actualizar el estado solo con dígitos numéricos
                            }}
                        />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='cant_max'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input
                            className='form-control'
                            autoComplete='off'
                            type='text'
                            id='cant_max'
                            value={cant_max}
                            placeholder='Cantidad Máxima'
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const numericValue = inputValue.replace(/\D/g, ''); // Filtrar caracteres no numéricos
                    
                                if (inputValue !== numericValue) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Solo se permiten números.',
                                    });
                                }
                    
                                setCant_Max(numericValue); // Actualizar el estado solo con dígitos numéricos
                            }}
                        />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='cant_min'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input
                            className='form-control'
                            autoComplete='off'
                            type='text'
                            id='cant_min'
                            value={cant_min}
                            placeholder='Cantidad Mínima'
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                const numericValue = inputValue.replace(/\D/g, ''); // Filtrar caracteres no numéricos
                    
                                if (inputValue !== numericValue) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Solo se permiten números.',
                                    });
                                }
                    
                                setCant_Min(numericValue); // Actualizar el estado solo con dígitos numéricos
                            }}
                        />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='proveedor'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='proveedor' value={proveedor} placeholder='Proveedor' onChange={(e) => setProveedor(e.target.value)} />
                    </FormGroup>
                </ModalBody>


                <ModalFooter>
                    <Button color='primary' onClick={() => validar()}>Agregar</Button>
                    <Button color='secondary' id='btnCerrar' onClick={abrirModal}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default ShowProducts