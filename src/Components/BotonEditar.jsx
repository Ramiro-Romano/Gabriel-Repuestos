import React, { useState } from 'react';
import { FaEdit, FaDollarSign, FaBarcode , FaFileSignature, FaScroll , FaBuilding , FaClipboardList, FaShoppingBasket , FaCartPlus, FaCartArrowDown, FaUserTie  } from "react-icons/fa";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup} from 'reactstrap';
import axios from 'axios';
import '../css/ShowProducts.css'
import Swal from 'sweetalert2';

const BotonEditar = ({ product, onUpdate }) => {
    const [editModal, setEditModal] = useState(false);
    const [codigo, setCodigo] = useState(product.codigo);
    const [marca, setMarca] = useState(product.marca);
    const [precio, setPrecio] = useState(product.precio);
    const [descripcion, setDescripcion] = useState(product.descripcion);
    const [rubro, setRubro] = useState(product.rubro);
    const [observaciones, setObservaciones] = useState(product.observaciones || '');
    const [stock, setStock] = useState(product.stock || '');
    const [cant_max, setCant_Max] = useState(product.cant_max || '');
    const [cant_min, setCant_Min] = useState(product.cant_min || '');
    const [proveedor, setProveedor] = useState(product.proveedor || '');

    const toggleEditModal = () => {
        setEditModal(!editModal);
    };

    const handleUpdate = async () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas realmente editar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProduct = {
                    id: product.id,
                    codigo,
                    marca,
                    precio,
                    descripcion,
                    rubro,
                    observaciones,
                    stock,
                    cant_max,
                    cant_min,
                    proveedor,
                };

                try {
                    axios.put(`http://localhost:3000/productos/${product.id}`, updatedProduct);
                    onUpdate(updatedProduct);
                    toggleEditModal();
                    Swal.fire('Editado', 'El producto ha sido editado correctamente.', 'success');
                } catch (error) {
                    console.error('Error al actualizar el producto:', error);
                    Swal.fire('Error', 'Ocurrió un error al actualizar el producto.', 'error');
                }
            }
        });
    };


    return (
        <>
            <button className='btn btn-warning' onClick={toggleEditModal}>
                <FaEdit />
            </button>

            <Modal isOpen={editModal} className='custom-modal modal-dialog-centered'>

                <ModalHeader>Editar Producto</ModalHeader>

                <ModalBody>
                    <Row>
                        {/* Columnas del modal izquierdo */}
                        <Col md="6">
                            <FormGroup className='input-group mb-3'>
                                <Label for='codigo'></Label>
                                <span className='input-group-text'><FaBarcode /></span>
                                <Input className='form-control' autoComplete='off' type='text' placeholder='Código' id='codigo' value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                            </FormGroup>

                            <FormGroup className='input-group mb-3'>
                                <Label for='marca'></Label>
                                <span className='input-group-text'><FaScroll   /></span>
                                <Input className='form-control' autoComplete='off' type='text' placeholder='Marca' id='marca' value={marca} onChange={(e) => setMarca(e.target.value)} />
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
                                <Label for='rubro'></Label>
                                <span className='input-group-text'><FaBuilding  /></span>
                                <Input className='form-control' autoComplete='off' type='text' id='rubro' value={rubro} placeholder='Rubro' onChange={(e) => setRubro(e.target.value)} />
                            </FormGroup>

                            <FormGroup className='input-group mb-3'>
                                <Label for='descripcion'></Label>
                                <span className='input-group-text'><FaFileSignature /></span>
                                <textarea
                                    className='form-control'
                                    autoComplete='off'
                                    id='descripcion'
                                    value={descripcion}
                                    placeholder='Descripción'
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    style={{ resize: 'none' }}
                                />
                            </FormGroup>
                        </Col>



                        {/* Columnas del modal derecho */}
                        <Col>

                            <FormGroup className='input-group mb-3'>
                                <Label for='stock'></Label>
                                <span className='input-group-text'>< FaShoppingBasket /></span>
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
                                <span className='input-group-text'><FaCartPlus  /></span>
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
                                <span className='input-group-text'><FaCartArrowDown /></span>
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
                                <span className='input-group-text'><FaUserTie  /></span>
                                <Input className='form-control' autoComplete='off' type='text' id='proveedor' value={proveedor} placeholder='Proveedor' onChange={(e) => setProveedor(e.target.value)} />
                            </FormGroup>

                            <FormGroup className='input-group mb-3'>
                                <Label for='observaciones'></Label>
                                <span className='input-group-text'><FaClipboardList /></span>
                                <textarea
                                    className='form-control'
                                    autoComplete='off'
                                    id='observaciones'
                                    value={observaciones}
                                    placeholder='Observaciones'
                                    onChange={(e) => setObservaciones(e.target.value)}
                                    style={{ resize: 'none' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>


                <ModalFooter>
                    <Button color='primary' onClick={handleUpdate}>
                        Actualizar
                    </Button>
                    <Button color='secondary' onClick={toggleEditModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal >
        </>
    );
};

export default BotonEditar;
