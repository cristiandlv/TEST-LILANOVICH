// src/services/usersService.ts
import { AppDataSource } from '../config/data-source'; // Importa el DataSource configurado
import Users from '../entities/Users';
import Credential from '../entities/Credential';

class UserService {
    // Crear un nuevo usuario
    async createUser({ name, email, birthdate, nDni }: { name: string, email: string, birthdate: Date, nDni: number }, username: string, password: string) {
        const userRepository = AppDataSource.getRepository(Users); // Usamos AppDataSource para obtener el repositorio de Users
        
        const newUser = new Users();
        newUser.name = name;
        newUser.email = email;
        newUser.birthdate = birthdate;
        newUser.nDni = nDni;

        // Crear la credencial asociada al usuario
        const credential = new Credential();
        credential.username = username;
        credential.password = password;

        // Guardamos la credencial en la base de datos
        await AppDataSource.getRepository(Credential).save(credential);

        // Asociamos la credencial al usuario
        newUser.credential = credential;

        // Guardamos el nuevo usuario con la credencial asociada
        await userRepository.save(newUser);

        return newUser;
    }

    // Obtener todos los usuarios
    async getUsers() {
        const userRepository = AppDataSource.getRepository(Users);
        return await userRepository.find({ relations: ['credential', 'appointments'] });
    }

    // Obtener un usuario por ID
    async getUserById(id: number) {
        const userRepository = AppDataSource.getRepository(Users);
        return await userRepository.findOne({ where: { id }, relations: ['credential', 'appointments'] });
    }

    // Login de usuario
    async loginUser(username: string, password: string) {
        const credentialRepository = AppDataSource.getRepository(Credential);
        const credential = await credentialRepository.findOne({ where: { username }, relations: ['user'] });

        if (!credential || credential.password !== password) {
            return null; // Si no se encuentra la credencial o la contraseña no es correcta
        }

        return credential.user; // Retorna el usuario asociado a la credencial
    }

    // Eliminar un usuario
    async deleteUser(id: number) {
        const userRepository = AppDataSource.getRepository(Users);
        const result = await userRepository.delete(id);
        return result.affected ? true : false; // Retorna true si el usuario fue eliminado
    }
}

export default new UserService();
