import React, { useState } from 'react';
import { FaEdit, FaDollarSign, FaGift, FaFileSignature } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import axios from 'axios';
import '../css/ShowProducts.css'
import Swal from 'sweetalert2';

const BotonEditar = ({ product, onUpdate }) => {
    const [editModal, setEditModal] = useState(false);
    const [nombre, setnombre] = useState(product.nombre);
    const [descripcion, setdescripcion] = useState(product.descripcion);
    const [linkImg, setLinkImg] = useState(product.linkImg);
    const [precio, setprecio] = useState(product.precio);

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
                    nombre,
                    descripcion,
                    linkImg,
                    precio,
                };

                try {
                    axios.put(`http://localhost:3001/productos/${product.id}`, updatedProduct);
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
            <Modal isOpen={editModal} className='custom-modal centered-modal'>

                <ModalHeader>Editar Producto</ModalHeader>

                <ModalBody>

                    <FormGroup className='input-group mb-3'>
                        <Label for='nombre'></Label>
                        <span className='input-group-text'><FaGift /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='nombre' value={nombre} onChange={(e) => setnombre(e.target.value)} />
                    </FormGroup>


                    <FormGroup className='input-group mb-3'>
                        <Label for='descripcion'></Label>
                        <span className='input-group-text'><FaFileSignature /></span>
                        <Input type='text' autoComplete='off' id='descripcion' value={descripcion} onChange={(e) => setdescripcion(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='input-group mb-3'>
                        <Label for='img'></Label>
                        <span className='input-group-text'><FaFileSignature /></span>
                        <Input className='form-control' autoComplete='off' type='text' id='img' value={linkImg} placeholder='Link de la imagen' onChange={(e) => setLinkImg(e.target.value)} />
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
                    <Button color='primary' onClick={handleUpdate}>
                        Actualizar
                    </Button>
                    <Button color='secondary' onClick={toggleEditModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default BotonEditar;
