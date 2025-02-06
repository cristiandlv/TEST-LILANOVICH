import express, { Request, Response, NextFunction } from "express";
import usersRouter from "./routes/usersRouter"; // Asegúrate de que tu enrutador esté bien configurado

const app = express();

// Middleware
app.use(express.json());  // Usando express.json() en lugar de body-parser

// Rutas
app.use("/users", usersRouter);

// Manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Algo salió mal!");
});

// Levantar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
