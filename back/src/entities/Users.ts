// src/entities/Users.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import Credential from "./Credential"; // Asegúrate de importar la entidad Credential
import Appointments from "./Appointments"; // Asegúrate de importar la entidad Appointments

@Entity({
    name: "Users"
})
export default class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    birthdate: Date;

    @Column()
    nDni: number;

    // Relación con la credencial
    @OneToOne(() => Credential, (credential) => credential.user) // Relación inversa
    @JoinColumn()
    credential: Credential;

    // Relación con los turnos
    @OneToMany(() => Appointments, (appt) => appt.user)
    appointments: Appointments[];
}
