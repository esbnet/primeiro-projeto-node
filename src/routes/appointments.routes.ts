import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsController from "../controller/AppointmentsController";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.get("/", (resquest, response) => {
  const appointments = appointmentsController.all();

  return response.json(appointments);
});

appointmentsRouter.post("/", (resquest, response) => {
  try {
    const { provider, date } = resquest.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsController
    );

    const appointment = createAppointment.execute({
      provider,
      date: parseDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
