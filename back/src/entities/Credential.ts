// src/entities/Credential.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import User from "./Users"; // Asegúrate de importar la entidad User

@Entity({
    name: "Credential"
})
export default class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @OneToOne(() => User, (user) => user.credential) // Relación uno a uno con User
    @JoinColumn() // Esto se usa para especificar la columna de la clave foránea en la tabla Credential
    user: User; // Relacionamos a un único usuario con la credencial
}
