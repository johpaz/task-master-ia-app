import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Asegúrate que Tailwind CSS está importado aquí o en App.tsx

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);