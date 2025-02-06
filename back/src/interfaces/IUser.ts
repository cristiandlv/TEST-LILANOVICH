// src/interfaces/IUser.ts

export interface IUser {
  id: number;
  name: string;
  email: string; // o 'mail', según tu elección
  birthdate: Date;
  nDni: number;
  credentialsId: number;  // Agregado 'credentialsId'
}
