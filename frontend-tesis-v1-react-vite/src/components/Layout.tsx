// src/components/Layout.tsx
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './sidebar';
import Modal from './Modal'; // Importar Modal
import Login2 from './Login2'; // Importar el formulario de Login

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Estado para controlar la visibilidad del modal de login
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pasar la función para abrir el modal al Header */}
        <Header onSignInClick={openLoginModal} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>

      {/* Renderizar el Modal condicionalmente */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
         {/* Pasar una función para cerrar el modal al componente Login2 si es necesario (ej: después de login exitoso) */}
        <Login2 /* onLoginSuccess={closeLoginModal} */ />
      </Modal>
    </div>
  );
};

export default Layout;