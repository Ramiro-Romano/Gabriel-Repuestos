import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';


const BotonEliminar = (props) => {

    const confirmarEliminar = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Una vez eliminado, no podrás recuperar este producto.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarProducto();
            }
        });
    }

    const eliminarProducto = async () => {
        const url = `${props.url}/${props.id}`;
        try {
            await axios.delete(url);
            Swal.fire(
                'Eliminado!',
                'Tu producto ha sido eliminado.',
                'success'
            );
            if (props.onUpdate) {
                props.onUpdate();
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error',
                'Ocurrió un error al eliminar el producto.',
                'error'
            );
        }
    }

    return (
        <Button onClick={confirmarEliminar} className='btn btn-danger'>
            <FaTrash />
        </Button>
    );
}

export default BotonEliminar;
g