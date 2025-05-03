// src/routes/auth.ts
import express, { Request, Response, NextFunction } from 'express'; // Mantén las importaciones por si acaso
import { PrismaClient, UserRole } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const registerSchema = z.object({
    email: z.string({ required_error: "El email es requerido." })
             .email({ message: "Formato de email inválido." }),
    password: z.string({ required_error: "La contraseña es requerida." })
                .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
    name: z.string({ required_error: "El nombre es requerido." })
            .min(1, { message: "El nombre no puede estar vacío." }),
    role: z.nativeEnum(UserRole).optional(),
    sector: z.string().optional(),
});

const router = express.Router();

// --- Endpoint POST /register ---
// --- CAMBIO AQUÍ: Quitar los tipos explícitos de req, res, next ---
router.post('/register', async (req, res, next):Promise<any> => {
    // 1. Validar el cuerpo de la petición (req.body) con Zod
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
        const errors = validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({ message: "Datos de entrada inválidos.", errors });
    }

    // Typescript debería inferir los tipos de req.body aquí
    const { email, password, name, role, sector } = validationResult.data;

    try {
        // 2. Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // 3. Hashear la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Crear el nuevo usuario
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword,
                role: role,
                sector: sector,
            },
            select: { // Seleccionar qué devolver
                id: true, email: true, name: true, role: true, sector: true, createdAt: true, updatedAt: true
            }
        });

        // 5. Enviar respuesta exitosa
        res.status(201).json(newUser);

    } catch (error) {
        // 6. Manejo de errores
        console.error("Error en POST /register:", error);
        // Si tienes un middleware de errores configurado, puedes usar next(error)
        // next(error);
        // O enviar respuesta genérica
        res.status(500).json({ message: 'Error interno del servidor al registrar el usuario.' });
    }
});

// ... (futuro /login) ...

export default router;