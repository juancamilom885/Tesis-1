// src/components/Header.tsx
import React from 'react';
// QUITA este import si ya no lo usas para otros links internos
// import { Link } from 'react-router-dom';
import { Search, LogIn, Menu } from 'lucide-react';

interface HeaderProps {
  onSignInClick: () => void; // Prop para abrir el modal
}

const Header: React.FC<HeaderProps> = ({ onSignInClick }) => {
  return (
    <header /* ... */ >
      {/* ... (Contenido del Header) ... */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
           {/* ... (Lado izquierdo) ... */}

          {/* Lado Derecho */}
          <div className="flex items-center space-x-6 ml-auto"> {/* Mantenemos ml-auto */}
             {/* ... (Links de escritorio si los hay) ... */}

            {/* Botón Sign In (SIN Link wrapper) */}
            {/* --- CORRECCIÓN AQUÍ --- */}
            <button
              onClick={onSignInClick} // <-- Llama a la función para abrir el modal
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-protocol-gray-dark hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
              Sign in
            </button>
            {/* --- FIN DE LA CORRECCIÓN --- */}

          </div>
        </div>
      </div>
      {/* ... (Menú Móvil) ... */}
    </header>
  );
};

export default Header;