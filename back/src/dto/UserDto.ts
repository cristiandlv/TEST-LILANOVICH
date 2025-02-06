// src/dto/UserDto.ts

interface UserDto {
  name: string;        // Nombre completo del usuario
  email: string;       // Dirección de email del usuario
  active: boolean;     // Estado activo del usuario
  birthdate: Date;     // Fecha de nacimiento
  nDni: number;        // Número de DNI o identificación
  username: string;    // Nombre de usuario (para las credenciales)
  password: string;    // Contraseña para las credenciales
  id: number;
}

export default UserDto;
