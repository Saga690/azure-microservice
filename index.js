import express from "express";
import dotenv from "dotenv";
dotenv.config();

import usergroupRoutes from "./routes/usergroup.js";
import scheduleRoutes from "./routes/schedule.js";
import appointmentsRoutes from "./routes/appointments.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => res.send("OK"));

app.use(appointmentsRoutes);
app.use(scheduleRoutes);
app.use(usergroupRoutes);

app.listen(port, () => {
  console.log(`Patient Service running at http://localhost:${port}`);
});
