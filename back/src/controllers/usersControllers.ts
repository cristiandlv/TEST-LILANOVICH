import { Request, Response } from 'express';
import userService from '../services/usersService'; // Asegúrate de que esta ruta sea correcta

// Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, username, password, birthdate, nDni } = req.body;

    // Verificación de campos requeridos
    if (!name || !email || !username || !password || !birthdate || !nDni) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verificación del formato de la fecha
    if (isNaN(Date.parse(birthdate))) {
        return res.status(400).json({ error: 'Invalid birthdate format' });
    }

    try {
        // Llamada al servicio para crear el nuevo usuario
        const newUser = await userService.createUser({ name, email, birthdate, nDni }, username, password);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: 'Failed to create user' });
    }
};

// Función para obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Función para obtener un usuario por ID
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Función para login de usuario
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await userService.loginUser(username, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: 'Failed to login' });
    }
};

// Función para eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const result = await userService.deleteUser(parseInt(id));
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: 'Failed to delete user' });
    }
};
