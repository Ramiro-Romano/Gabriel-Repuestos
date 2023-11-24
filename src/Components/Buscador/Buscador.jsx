import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Buscador.css';
import axios from 'axios';

function Buscador({ onSearch }) {
  const [codigo, setCodigo] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/productos?codigo=${codigo}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error al buscar:', error);
      onSearch([]); // Limpiar la grilla en caso de error
    }
  };

  return (
    <div className="search-container" style={{ textAlign: 'left', marginBottom: '20px', marginLeft: '20px' }}>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Buscar"
          className="me-2"
          aria-label="Search"
          style={{ width: '400px', fontSize: '20px' }}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <Button variant="primary" className="search-button" onClick={handleSearch}>
          Buscar
        </Button>
      </Form>
    </div>
  );
}

export default Buscador;
