// src/components/Login2.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Button from './Button'; // Asegúrate que la ruta sea correcta

// Interfaz para las props (opcional, pero útil si pasas onLoginSuccess)
interface Login2Props {
  onLoginSuccess?: () => void;
}

const Login2: React.FC<Login2Props> = ({ onLoginSuccess }) => {
  // Estado para los campos del formulario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false); // Descomentar si añades lógica de carga
  // const [error, setError] = useState<string>(''); // Descomentar para manejo de errores

  // Manejador para el envío del formulario (necesitas implementar la lógica real)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setIsLoading(true);
    // setError('');
    console.log('Intentando login con:', { email, password, remember });

    // --- AQUÍ VA TU LÓGICA DE AUTENTICACIÓN ---
    // Ejemplo: llamar a una API, verificar credenciales...
    // Si el login es exitoso:
    // if (loginFueExitoso) {
    //   console.log("Login OK!");
    //   if (onLoginSuccess) {
    //     onLoginSuccess(); // Cierra el modal si la función fue pasada
    //   }
    // } else {
    //   setError('Credenciales incorrectas');
    // }
    // setIsLoading(false);
    // --- FIN LÓGICA AUTENTICACIÓN ---
  };

  return (
    // Contenedor principal del formulario dentro del modal
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-sm text-gray-600">Accede a tu cuenta</p>
      </div>

      {/* Formulario */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         {/* Mensaje de error (opcional) */}
         {/* {error && <p className="text-center text-sm text-red-600">{error}</p>} */}

         {/* Campo Email */}
         <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaEnvelope className="h-4 w-4"/> {/* Ajustado tamaño icono */}
            </span>
            <input
                placeholder="Correo Electrónico"
                className="pl-10 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:border-protocol-green focus:ring-1 focus:ring-protocol-green"
                type="email"
                id="email-login" // Añadido id
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                aria-label="Correo Electrónico"
            />
         </div>

         {/* Campo Contraseña */}
         <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaLock className="h-4 w-4"/> {/* Ajustado tamaño icono */}
            </span>
            <input
                placeholder="Contraseña"
                className="pl-10 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:border-protocol-green focus:ring-1 focus:ring-protocol-green"
                type="password"
                id="password-login" // Añadido id
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                aria-label="Contraseña"
            />
         </div>

         {/* Opciones: Recordarme y Olvidaste Contraseña */}
         <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={remember}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)}
                    className="h-4 w-4 text-protocol-green focus:ring-protocol-green border-gray-300 rounded"
                 />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Recordarme </label>
            </div>
            <div className="text-sm">
                {/* Puedes usar Link de react-router si es ruta interna y no quieres nueva pestaña */}
                <a href="/forgot-password" /* target="_blank" rel="noopener noreferrer" */ className="font-medium text-protocol-green hover:text-protocol-green/80">
                    ¿Olvidaste tu contraseña?
                </a>
            </div>
         </div>

         {/* Botón de Envío */}
         <div>
            <Button
                type="submit"
                className="w-full" // Hace que el botón ocupe todo el ancho
                // disabled={isLoading} // Descomentar si manejas estado de carga
            >
                 {/* {isLoading ? 'Ingresando...' : 'Iniciar Sesión'} */}
                 Iniciar Sesión {/* Texto simple mientras no haya carga */}
            </Button>
         </div>

         {/* Enlace de Registro */}
         <p className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a
                href="/register" // Asegúrate que esta sea tu ruta de registro
                target="_blank" // Abre en nueva pestaña
                rel="noopener noreferrer" // Seguridad y buena práctica
                className="font-medium text-protocol-green hover:text-protocol-green/80"
            >
                Regístrate
            </a>
         </p>
      </form>
    </div>
  );
};

export default Login2;