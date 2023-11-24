import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { DatosProvider } from './context/DatosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DatosProvider>
    <App />
  </DatosProvider>
);
