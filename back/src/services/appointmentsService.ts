import { AppDataSource } from "../config/data-source";
import Appointments from "../entities/Appointments";
import { Repository } from "typeorm";

class AppointmentsService {
    private appointmentRepository: Repository<Appointments>;

    constructor() {
        this.appointmentRepository = AppDataSource.getRepository(Appointments);
    }

    async getAllAppointments() {
        return this.appointmentRepository.find(); // TypeORM usa find()
    }

    async getAppointmentById(id: number) {
        return this.appointmentRepository.findOne({ where: { id } }); // TypeORM usa findOne()
    }

    async createAppointment(date: string, time: string, userId: number) {
        const newAppointment = this.appointmentRepository.create({ date, time, userId });
        return this.appointmentRepository.save(newAppointment); // Guardar en la DB
    }

    async cancelAppointment(id: number) {
        const appointment = await this.appointmentRepository.findOne({ where: { id } });
        if (!appointment) return false;

        await this.appointmentRepository.remove(appointment);
        return true;
    }
}

export default new AppointmentsService();
