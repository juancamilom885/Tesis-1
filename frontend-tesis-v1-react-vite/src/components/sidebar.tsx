// src/components/Sidebar.tsx
import React from 'react';
// --- CAMBIO 1: Importar Link y useLocation ---
import { Link, useLocation } from 'react-router-dom';

// Componente interno para los enlaces
// --- CAMBIO 2: Usar Link en lugar de <a> ---
const SidebarLink: React.FC<{ to: string; children: React.ReactNode; active?: boolean }> = ({ to, children, active }) => (
  <Link // <-- Usar Link
    to={to} // <-- Usar la prop 'to'
    className={`block px-4 py-2 text-sm rounded-md ${
      active
        ? 'bg-gray-200 text-gray-900 font-medium'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {children}
  </Link>
);

// Componente interno para las secciones (sin cambios)
const SidebarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    // ... (igual que antes)
    <div className="mb-6">
      <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <nav className="space-y-1">
        {children}
      </nav>
    </div>
);


const Sidebar: React.FC = () => {
  // --- CAMBIO 3: Usar useLocation ---
  const location = useLocation();
  const currentPathname = location.pathname; // Obtiene la ruta actual (ej: "/servicios")
  // Ya no necesitamos la constante 'currentPath' hardcodeada

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
          {/* ... (Logo) ... */}
          <div className="mt-5 flex-grow flex flex-col px-2">

            <SidebarSection title="Menú Principal">
               {/* --- CAMBIO 4: Usar 'to' y 'currentPathname' --- */}
               {/* Asegúrate que la ruta de Home sea "/home" si así está en App.tsx */}
               <SidebarLink to="/home" active={currentPathname === '/home'}>Home</SidebarLink>
               <SidebarLink to="/servicios" active={currentPathname === '/servicios'}>Servicios</SidebarLink>
               <SidebarLink to="/pymes" active={currentPathname === '/pymes'}>PYMES</SidebarLink>
               <SidebarLink to="/analitica" active={currentPathname === '/analitica'}>Analítica</SidebarLink>
               <SidebarLink to="/clientes" active={currentPathname === '/clientes'}>Clientes</SidebarLink>
               <SidebarLink to="/contactanos" active={currentPathname === '/contactanos'}>Contáctanos</SidebarLink>
            </SidebarSection>

          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;