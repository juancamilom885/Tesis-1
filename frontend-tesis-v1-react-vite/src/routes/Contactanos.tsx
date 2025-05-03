// src/routes/Contactanos.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

const Contactanos: React.FC = () => {
  // Estado simple para un formulario de ejemplo
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // const [isSubmitting, setIsSubmitting] = useState(false); // Para estado de envío
  // const [submitMessage, setSubmitMessage] = useState(''); // Para mensaje de éxito/error

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsSubmitting(true);
    // setSubmitMessage('');
    console.log('Enviando formulario:', formData);
    // Aquí iría la lógica para enviar el formulario (ej: API call)
    // Simulación:
    setTimeout(() => {
      // setSubmitMessage('¡Mensaje enviado con éxito!');
      // setIsSubmitting(false);
      // setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
      alert('Mensaje enviado (simulación)'); // Placeholder
    }, 1000);
  };

  return (
    <div>
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-protocol-gray-dark mb-6">
        Contáctanos
      </h1>

      {/* Contenedor principal */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Sección de Información (Izquierda) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-protocol-gray-dark">Información de Contacto</h2>
          <p className="text-protocol-gray">
            Si tienes alguna pregunta o necesitas soporte, no dudes en ponerte en contacto con nosotros a través de los siguientes medios o usando el formulario.
          </p>
          <div>
             <h3 className="font-semibold">Correo Electrónico:</h3>
             <a href="mailto:soporte@protocol.com" className="text-protocol-green hover:underline">soporte@protocol.com</a>
          </div>
           <div>
             <h3 className="font-semibold">Teléfono:</h3>
             <p className="text-protocol-gray">+57 (1) 234 5678</p> {/* Ejemplo */}
          </div>
           <div>
             <h3 className="font-semibold">Dirección:</h3>
             <p className="text-protocol-gray">
                Calle Falsa 123, Oficina 404<br/>
                Chía, Cundinamarca<br/>
                Colombia
             </p>
          </div>
        </div>

        {/* Sección de Formulario (Derecha) */}
        <div>
          <h2 className="text-xl font-semibold text-protocol-gray-dark mb-4">Envíanos un Mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-protocol-green focus:border-protocol-green sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-protocol-green focus:border-protocol-green sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-protocol-green focus:border-protocol-green sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                // disabled={isSubmitting} // Descomentar para deshabilitar durante envío
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-protocol-green hover:bg-protocol-green/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-protocol-green disabled:opacity-50"
              >
                {/* {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'} */}
                Enviar Mensaje
              </button>
            </div>
            {/* Mensaje de éxito/error */}
            {/* {submitMessage && <p className="text-sm text-center mt-4">{submitMessage}</p>} */}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contactanos;