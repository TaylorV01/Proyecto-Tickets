import React, { useState } from 'react';
import MesaDashboard from '../components/MesaAyuda/MesaDashboard';
import TicketForm from '../components/MesaAyuda/TicketForm';
import ClientForm from '../components/MesaAyuda/ClientForm';

const MesaAyudaPage = () => {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  // Mostrar formulario de ticket al hacer clic en el botón del dashboard
  const handleCrearTicket = () => {
    setShowTicketForm(true);
    setShowClientForm(false);
  };

  // Mostrar formulario de cliente desde el formulario de ticket
  const handleNuevoCliente = () => {
    setShowClientForm(true);
  };

  // Al crear cliente, volver al formulario de ticket
  const handleClienteCreado = () => {
    setShowClientForm(false);
    setShowTicketForm(true);
  };

  // Cerrar formularios
  const handleCerrarFormularios = () => {
    setShowTicketForm(false);
    setShowClientForm(false);
  };

  return (
    <div className="mesa-ayuda-page">
      <MesaDashboard onCrearTicket={handleCrearTicket} />
      {showTicketForm && !showClientForm && (
        <TicketForm onNuevoCliente={handleNuevoCliente} onClose={handleCerrarFormularios} />
      )}
      {showClientForm && (
        <ClientForm onClienteCreado={handleClienteCreado} onClose={handleCerrarFormularios} />
      )}
      {/* Aquí se agregarán rutas hijas para crear ticket, ver tickets, etc. */}
    </div>
  );
};

export default MesaAyudaPage;
