// Importa useState para manejar el estado del input
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Buscador.css';

function Buscador({ onSearch }) {
  // Estado para manejar el valor del input
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar la búsqueda al hacer clic en el botón
  const handleSearch = () => {
    // Llama a la función de búsqueda pasando el término de búsqueda
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Buscar"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <Button variant="primary" className="search-button" onClick={handleSearch}>
          Buscar
        </Button>
      </Form>
    </div>
  );
}

export default Buscador;
