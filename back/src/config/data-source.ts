import { DataSource } from "typeorm";
import { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "./envs";
import Appointments from "../entities/Appointments";
import Credential from "../entities/Credential";
import Users from "../entities/Users";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST || "localhost",  
    username: DB_USERNAME, 
    password: DB_PASSWORD,  
    database: DB_DATABASE,  
    synchronize: true,
    logging: true,
    entities: [Appointments, Credential, Users],
    subscribers: [],
    migrations: [],
});

export const userModel = AppDataSource.getRepository(Users);
export const appointmentModel = AppDataSource.getRepository(Appointments);
export const credentialModel = AppDataSource.getRepository(Credential);
