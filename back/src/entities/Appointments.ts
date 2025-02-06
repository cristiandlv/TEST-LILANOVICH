import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import  Users  from "./Users";

@Entity({
    name: "appointments"
})

export default class Appointments {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    userId: number;

    @Column()
    status: "active" | "cancelled";

    @Column()
    description: "string";

    @ManyToOne(()=> Users, (user)=> user.appointments)
    user: Users;
  }