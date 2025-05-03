// src/routes/Pymes.tsx
import React from 'react';

const Pymes: React.FC = () => {
  return (
    <div>
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-protocol-gray-dark mb-6">
        Gestión de PYMES
      </h1>

      {/* Contenido de ejemplo */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Listado de PYMES</h2>
        <p className="text-protocol-gray mb-4">
          Aquí se mostraría una tabla o lista con la información relevante de las Pequeñas y Medianas Empresas registradas.
        </p>
        {/* Puedes añadir más elementos como botones, filtros, etc. */}
        <button className="px-4 py-2 bg-protocol-green text-white text-sm font-medium rounded hover:bg-protocol-green/80 transition-colors">
            + Añadir Nueva PYME
        </button>
      </div>

      {/* Puedes añadir más secciones o componentes aquí */}

    </div>
  );
};

export default Pymes;