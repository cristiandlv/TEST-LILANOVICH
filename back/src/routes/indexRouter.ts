import { Router } from "express";
import usersRouter from '../routes/usersRouter'; 
import appointmentsRouter from "./appoinmentsRouter";

const router = Router();

router.use("/users", usersRouter);
router.use("/appointments", appointmentsRouter);

export default router;



