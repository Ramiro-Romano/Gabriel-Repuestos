import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { show_alert } from '../Components/Function';
import { FaPlusCircle, FaGift, FaDollarSign, FaFileSignature } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import BotonEliminar from './BotonEliminar';
import BotonEditar from './BotonEditar'; // Importa el componente BotonEditar
import '../css/ShowProducts.css'

const ShowProducts = () => {
    const URL = 'http://localhost:3000/productos';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setnombre] = useState('');
    const [descripcion, setdescripcion] = useState('');
    const [precio, setprecio] = useState('');
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

    const abrirModal = (op, id, nombre, descripcion, precio) => {
        setAbierto(!abierto);
        setId('');
        setnombre('');
        setdescripcion('');
        setprecio('');
        setOperation(op);

        if (op === 1) {
            setTitle('Registrar Producto')
        } else if (op === 2) {
            setTitle('Editar Producto')
            setId(id);
            setnombre(nombre);
            setdescripcion(descripcion);
            setprecio(precio);
        }
    };

    const validar = async () => {
        var parametros;
        var metodo;
        if (!nombre || nombre.trim() === '') {
            show_alert('Coloca el nombre del producto', 'warning');
        } else if (!descripcion || descripcion.trim() === '') {
            show_alert('Coloca la descripción del producto', 'warning');
        } else if (!precio || precio === '') {
            show_alert('Coloca el precio del producto', 'warning');
        } else {
            // Verificar si el producto ya existe en la lista
            const productoExistente = products.find((product) => product.nombre.trim() === nombre.trim());

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
                    parametros = { nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio};
                    metodo = 'POST';
                    await enviarSolicitud(metodo, parametros);
                    getProducts(); // Actualiza la tabla después de la operación
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto Agregado',
                        text: 'El producto se ha agregado exitosamente.',
                    });

                    const limpiarCampos = () => {
                        setnombre('');
                        setdescripcion('');
                        setprecio('');
                    }

                    abrirModal(1);
                    limpiarCampos();
                }
            } else {
                // Si la operación no es agregar (es editar), realizar la edición
                parametros = { id: id, nombre: nombre.trim(), descripcion: descripcion.trim(), precio: precio};
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
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive text-center'>
                            <Table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>PRODUCTO</th>
                                        <th>DESCRIPCIÓN</th>
                                        <th>PRECIO</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                    {products.map((product, i) => (
                                        <tr key={product.id}>
                                            <td>{(i + 1)}</td>
                                            <td>{(product.nombre)}</td>
                                            <td>{(product.descripcion)}</td>
                                            <td>${new Intl.NumberFormat('es-mx').format(product.precio)}</td>
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
                        <Label for='nombre'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='nombre' value={nombre} placeholder='Nombre' onChange={(e) => setnombre(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='descripcion'></Label>
                        <span className='input-group-text'><FaFileSignature /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='descripcion' value={descripcion} placeholder='Descripción' onChange={(e) => setdescripcion(e.target.value)} />
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
                                    setprecio(inputValue);
                                } else {
                                    // Muestra un mensaje de error con SweetAlert2
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Solo se permiten números en el campo de precio.',
                                    });
                                }
                            }}
                        />
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