import React from 'react';
import { Table, Container } from 'react-bootstrap';

const Grilla = ({ productos }) => {
  return (
    <Container fluid style={{ width: '66%' }}>
      <Table striped bordered hover style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: 'orange', border: '2px solid black', textAlign: 'left' }}>Código</th>
            <th style={{ backgroundColor: 'orange', border: '2px solid black', textAlign: 'center' }}>Descripción</th>
            <th style={{ backgroundColor: 'orange', border: '2px solid black', textAlign: 'right' }}>Precio</th>
            <th style={{ backgroundColor: 'orange', border: '2px solid black', width: '1%' }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigo}>
              <td style={{ border: '2px solid black', textAlign: 'left' }}>{producto.codigo}</td>
              <td style={{ border: '2px solid black', textAlign: 'center' }}>{producto.descripcion}</td>
              <td style={{ border: '2px solid black', textAlign: 'right' }}>{producto.precio}</td>
              <td style={{ border: '2px solid black', width: '1%' }}>
                {producto.stock > 0 ? (
                  <span style={{ color: 'green' }}>En Stock</span>
                ) : (
                  <span style={{ color: 'red' }}>Sin Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Grilla;
