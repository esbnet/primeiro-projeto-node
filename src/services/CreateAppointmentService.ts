import { startOfHour } from "date-fns";
import Appointment from "../model/Appointment";
import AppointmentController from "../controller/AppointmentsController";

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsController: AppointmentController;

  constructor(appointmentsController: AppointmentController) {
    this.appointmentsController = appointmentsController;
  }

  public execute({ provider, date }: Request): Appointment {
    const appontmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsController.findByDate(
      appontmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsController.create({
      provider,
      date: appontmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
