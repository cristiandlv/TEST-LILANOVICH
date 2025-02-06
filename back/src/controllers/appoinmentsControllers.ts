import { Request, Response } from "express";
import appointmentsService from "../services/appointmentsService"; // Asegúrate de que el import es correcto

// Obtener todas las citas
export const getAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await appointmentsService.getAllAppointments();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving appointments", error });
    }
};

// Obtener una cita por ID
export const getAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid appointment ID" });
            return;
        }
        
        const appointment = await appointmentsService.getAppointmentById(id);
        if (!appointment) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }
        
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving appointment", error });
    }
};

// Crear una nueva cita
export const addAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { date, time, userId } = req.body;
        if (!date || !time || !userId) {
            res.status(400).json({ message: "Missing required fields: date, time, userId" });
            return;
        }
        
        const newAppointment = await appointmentsService.createAppointment(date, time, userId);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: "Error creating appointment", error });
    }
};

// Cancelar una cita por ID
export const cancelAppointmentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid appointment ID" });
            return;
        }
        
        const isCancelled = await appointmentsService.cancelAppointment(id);
        if (!isCancelled) {
            res.status(404).json({ message: "Appointment not found" });
            return;
        }
        
        res.json({ message: "Appointment cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling appointment", error });
    }
};
