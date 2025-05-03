// src/index.ts (Ejemplo)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar cors
import authRouter from './auth'; // <-- Importar nuestro router de autenticación
// Importa otros routers si los tienes (ej: import pymesRouter from './routes/pymes';)

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Usa un puerto diferente al del frontend (Vite usa 5173 por defecto)

// --- Middlewares Esenciales ---
// Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors(/* Puedes añadir opciones de configuración aquí si es necesario */));
// Permitir que Express entienda bodies de petición en formato JSON
app.use(express.json());
// ----------------------------

// --- Montar Routers ---
// Todas las rutas definidas en authRouter estarán bajo /api/auth
app.use('/api/auth', authRouter);
// Ejemplo: app.use('/api/pymes', pymesRouter);
// ---------------------

// Ruta de prueba básica
app.get('/', (req, res) => {
  res.send('Servidor Backend Tesis V2 funcionando!');
});

app.listen(port, () => {
  console.log(`[server]: Servidor corriendo en http://localhost:${port}`);
});