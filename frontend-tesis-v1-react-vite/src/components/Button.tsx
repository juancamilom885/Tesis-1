// src/components/Button.tsx

import React from 'react';

// Define las propiedades que el componente Button puede aceptar.
// Extiende las propiedades estándar de un botón HTML.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Contenido del botón (texto, etc.)
  variant?: 'primary' | 'secondary' | 'ghost'; // Estilos predefinidos del botón
  leftIcon?: React.ReactElement; // Icono opcional a la izquierda
  rightIcon?: React.ReactElement; // Icono opcional a la derecha
  // className se hereda de ButtonHTMLAttributes, pero lo incluimos implícitamente
}

// Definición del componente funcional Button
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary', // Valor por defecto si no se especifica
  leftIcon,
  rightIcon,
  className = '', // Clase CSS adicional que se pueda pasar desde fuera
  ...props // Resto de propiedades estándar del botón (onClick, disabled, etc.)
}) => {
  // Estilos base comunes a todas las variantes del botón
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out";

  // Estilos específicos para cada variante
  let variantStyle = '';
  switch (variant) {
    case 'secondary':
      variantStyle = 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-50 disabled:text-gray-400';
      break;
    case 'ghost':
      // Asegúrate de tener 'protocol-green' definido en tu tailwind.config.js
      variantStyle = 'border-transparent text-protocol-green hover:bg-green-50 focus:ring-protocol-green disabled:text-green-300';
      break;
    case 'primary':
    default:
      // Asegúrate de tener 'protocol-gray-dark' definido en tu tailwind.config.js
      variantStyle = 'border-transparent text-white bg-protocol-gray-dark hover:bg-black focus:ring-gray-800 disabled:bg-gray-500';
      break;
  }

  return (
    <button
      type="button" // Establece type="button" por defecto si no se pasa otro (como "submit")
      // Combina los estilos base, de variante y las clases externas
      className={`${baseStyle} ${variantStyle} ${className}`}
      // Pasa el resto de las propiedades (como onClick, disabled) al elemento <button>
      {...props}
    >
      {/* Renderiza el icono izquierdo si se proporciona */}
      {leftIcon && (
        // Span contenedor para el icono, controla el tamaño y espaciado
        <span className="mr-2 -ml-1 h-5 w-5 inline-flex items-center justify-center">
           {/* Clona el elemento icono pasado como prop. NO se le pasa className aquí. */}
          {React.cloneElement(leftIcon)}
        </span>
      )}

      {/* Renderiza el contenido principal del botón (normalmente texto) */}
      {children}

      {/* Renderiza el icono derecho si se proporciona */}
      {rightIcon && (
         // Span contenedor para el icono, controla el tamaño y espaciado
         <span className="ml-2 -mr-1 h-5 w-5 inline-flex items-center justify-center">
            {/* Clona el elemento icono pasado como prop. NO se le pasa className aquí. */}
           {React.cloneElement(rightIcon)}
         </span>
      )}
    </button>
  );
};

export default Button;