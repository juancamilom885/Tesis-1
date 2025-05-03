// src/App.tsx
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import Login from './routes/Login';
// --- IMPORTAR LOS NUEVOS COMPONENTES ---
import Servicios from './routes/Servicios';
import Pymes from './routes/Pymes';
import Contactanos from './routes/Contactanos';
import Analitica from './routes/analitica';
import Clientes from './routes/Clientes';
// ---------------------------------------

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas que usan el Layout principal */}
        <Route
          path="/"
          element={
            <Layout>
              <Outlet /> {/* Las rutas anidadas se renderizan aquí */}
            </Layout>
          }
        >
          {/* Página principal (Home) */}
          {/* El path de Home es relativo a "/", así que podemos usar solo "/" o "/home" */}
          <Route path="/home" element={<Home />} /> {/* Asegúrate que el link en Sidebar sea a "/home" o cambia esto a index */}
          {/* <Route index element={<Home />} /> */} {/* Alternativa si quieres que "/" sea Home */}


          {/* --- AÑADIR LAS NUEVAS RUTAS AQUÍ --- */}
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/pymes" element={<Pymes />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/analitica" element={<Analitica />} />
          <Route path="/clientes" element={<Clientes />} />
          {/* ----------------------------------- */}

          {/* Otras rutas que podrían usar el Layout */}
          {/* <Route path="/guides/:guideId" element={<div>Guide Content</div>} /> */}
          {/* <Route path="/resources/:resourceId" element={<div>Resource Content</div>} /> */}

        </Route>

        {/* Rutas SIN el Layout principal */}
        {/* <Route path="/login" element={<Login />} /> */}{/* Comentado/Eliminado si usas el Modal */}
        <Route path="/register" element={<div>Página de Registro</div>} /> {/* Añade una ruta de ejemplo para Registro */}


        {/* Ruta para página no encontrada */}
        <Route path="*" element={
            <Layout> {/* Opcional: Mostrar 404 dentro del layout */}
               <div>
                  <h1 className="text-2xl font-bold">404 - Página No Encontrada</h1>
               </div>
            </Layout>
         } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;