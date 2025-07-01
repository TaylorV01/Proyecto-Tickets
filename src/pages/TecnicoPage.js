import React, { useState } from 'react';
import TecnicoDashboard from '../components/Tecnico/TecnicoDashboard';
import TicketDetail from '../components/Tecnico/TicketDetail';

const mockTickets = [
  {
    id: '#001',
    cliente: 'Juan Pérez',
    problema: 'Impresora no funciona',
    estado: 'Pendiente',
    categoria: 'Hardware - Impresoras',
    dependencia: 'Contabilidad',
    recurso: 'Impresora HP-001',
    descripcion: 'Impresora no responde, luz roja encendida',
    fecha: '30/06/2025 09:15',
  },
  {
    id: '#003',
    cliente: 'Pedro García',
    problema: 'Error de sistema',
    estado: 'En Proceso',
    categoria: 'Software - Sistema',
    dependencia: 'Sistemas',
    recurso: 'PC-SIST-02',
    descripcion: 'Error crítico al iniciar sesión',
    fecha: '01/07/2025 10:30',
  },
  {
    id: '#005',
    cliente: 'Laura Martín',
    problema: 'Red lenta',
    estado: 'Finalizado',
    categoria: 'Redes - Conectividad',
    dependencia: 'Ventas',
    recurso: 'Router-VENT-01',
    descripcion: 'La red está muy lenta en la oficina de ventas',
    fecha: '02/07/2025 08:45',
  },
];

const TecnicoPage = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleShowDetail = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="tecnico-page">
      <TecnicoDashboard tickets={mockTickets} onShowDetail={handleShowDetail} />
      {selectedTicket && (
        <TicketDetail ticket={selectedTicket} onClose={handleCloseDetail} />
      )}
      {/* Aquí se agregarán rutas hijas para ver detalles de ticket, etc. */}
    </div>
  );
};

export default TecnicoPage;
