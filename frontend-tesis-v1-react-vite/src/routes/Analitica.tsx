// src/routes/Analitica.tsx
import React from 'react';
// Podrías importar una librería de gráficos aquí, ej: import { Line } from 'react-chartjs-2';

const Analitica: React.FC = () => {

  // --- Datos de ejemplo (en una app real vendrían de una API) ---
  const kpiData = [
    { title: 'Usuarios Activos', value: '1,234', change: '+5.2%' },
    { title: 'Ventas del Mes', value: '$15,670', change: '+12.1%' },
    { title: 'Nuevos Clientes', value: '89', change: '-1.5%' },
    { title: 'Tasa de Conversión', value: '4.8%', change: '+0.3%' },
  ];

  // Datos de ejemplo para un gráfico (simplificado)
  // const chartData = { ... }; // Objeto de datos para react-chartjs-2 u otra librería

  return (
    <div>
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-protocol-gray-dark mb-6">
        Panel de Analítica
      </h1>

      {/* Sección de KPIs (Indicadores Clave de Rendimiento) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 truncate">{kpi.title}</h3>
            <p className="mt-1 text-3xl font-semibold text-protocol-gray-dark">{kpi.value}</p>
            {/* Podrías añadir lógica para colorear el cambio (verde/rojo) */}
            <p className="text-sm text-gray-500">{kpi.change} vs mes anterior</p>
          </div>
        ))}
      </div>

      {/* Sección de Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Placeholder para Gráfico 1 */}
        <div className="bg-white p-4 rounded-lg shadow h-64 md:h-80 flex items-center justify-center">
          <p className="text-gray-400 italic">Placeholder para Gráfico de Ventas</p>
          {/* Aquí renderizarías tu componente de gráfico: */}
          {/* <Line data={chartData} /> */}
        </div>

        {/* Placeholder para Gráfico 2 */}
        <div className="bg-white p-4 rounded-lg shadow h-64 md:h-80 flex items-center justify-center">
          <p className="text-gray-400 italic">Placeholder para Gráfico de Usuarios</p>
        </div>
      </div>

      {/* Sección de Tabla de Datos */}
      <div className="bg-white p-4 rounded-lg shadow">
         <h2 className="text-xl font-semibold text-protocol-gray-dark mb-4">Datos Detallados</h2>
         <div className="overflow-x-auto">
            {/* Placeholder para una tabla */}
            <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-50">
                 <tr>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Columna 1</th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Columna 2</th>
                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Columna 3</th>
                 </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                 {/* Aquí irían las filas de datos */}
                 <tr>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dato A1</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dato A2</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dato A3</td>
                 </tr>
                 {/* Más filas... */}
               </tbody>
             </table>
         </div>
      </div>

    </div>
  );
};

export default Analitica;