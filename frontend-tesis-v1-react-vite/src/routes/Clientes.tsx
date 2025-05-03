// src/routes/Clientes.tsx
import React from 'react';
// Podrías importar iconos para acciones, ej: import { Edit, Trash2, Plus } from 'lucide-react';

// Datos de ejemplo (normalmente vendrían de una API)
const sampleClients = [
  { id: 'cli-001', name: 'Empresa Ejemplo S.A.S.', contact: 'Juan Pérez', email: 'juan.perez@ejemplo.com', status: 'Activo' },
  { id: 'cli-002', name: 'Soluciones Digitales Ltda.', contact: 'Ana García', email: 'ana.garcia@soluciones.com', status: 'Activo' },
  { id: 'cli-003', name: 'Innovatec Colombia', contact: 'Carlos Rojas', email: 'carlos.rojas@innovatec.co', status: 'Inactivo' },
  { id: 'cli-004', name: 'Servicios Integrales Web', contact: 'Maria López', email: 'maria.lopez@serviciosweb.net', status: 'Activo' },
];

const Clientes: React.FC = () => {
  return (
    <div>
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-protocol-gray-dark mb-6">
        Gestión de Clientes
      </h1>

      {/* Barra de Acciones/Filtros (Ejemplo) */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
         {/* Placeholder para búsqueda/filtros */}
         <div className="w-full sm:w-auto">
            <input
                type="search"
                placeholder="Buscar cliente..."
                className="block w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-protocol-green focus:border-protocol-green sm:text-sm"
             />
         </div>
         {/* Botón para añadir nuevo cliente */}
         <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-protocol-green text-white text-sm font-medium rounded hover:bg-protocol-green/80 transition-colors">
             {/* <Plus size={16} className="mr-2"/> */} {/* Icono opcional */}
             Añadir Cliente
         </button>
      </div>


      {/* Tabla de Clientes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto Principal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Estilo condicional para el estado */}
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    {/* Placeholder para botones de acción */}
                    <button className="text-indigo-600 hover:text-indigo-900" title="Editar">
                        {/* <Edit size={16} /> */}
                        Editar {/* O usa icono */}
                    </button>
                    <button className="text-red-600 hover:text-red-900" title="Eliminar">
                        {/* <Trash2 size={16} /> */}
                        Eliminar {/* O usa icono */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aquí podrías añadir paginación para la tabla */}

    </div>
  );
};

export default Clientes;