import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './Buscador.css';

function Buscador() {
  return (
    <div className="search-container" style={{ textAlign: 'left', marginBottom: '20px', marginLeft: '20px' }}>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          style={{ width: '400px', fontSize: '20px' }}
        />
        <Button variant="primary" className="search-button">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Buscador;
