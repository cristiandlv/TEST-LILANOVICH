import { Router } from "express";
import { getAppointments, getAppointment, addAppointment, cancelAppointmentById } from "../controllers/appoinmentsControllers";

const router = Router();

router.get("/", getAppointments);
router.get("/:id", getAppointment);
router.post("/", addAppointment);
router.put("/:id/cancel", cancelAppointmentById);

export default router;
