// src/components/Modal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // Función para cerrar el modal
  children: React.ReactNode;
  title?: string; // Título opcional para el modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // No renderizar nada si no está abierto
  if (!isOpen) {
    return null;
  }

  // Evitar que el clic dentro del contenido del modal lo cierre
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Overlay (fondo oscuro)
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose} // Cierra el modal al hacer clic en el overlay
    >
      {/* Contenedor del contenido del modal */}
      <div
        className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 md:p-8"
        onClick={handleContentClick} // Previene cierre al hacer clic dentro
      >
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        {/* Título Opcional */}
        {title && (
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        )}

        {/* Contenido principal del modal (aquí irá el Login2) */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;