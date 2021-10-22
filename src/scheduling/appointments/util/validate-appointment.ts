import Appointment from '../../../shared/model/Appointment'

export class AppointmentError extends Error {
  patient?: string

  startDateTime?: string

  constructor(patient: string, startDateTime: string, message: string) {
    super(message)
    this.patient = patient
    this.startDateTime = startDateTime
    Object.setPrototypeOf(this, AppointmentError.prototype)
  }
}

export default function validateAppointment(appointment: Appointment): AppointmentError {
  const newError: any = {}

  if (!appointment.patient) {
    newError.patient = 'scheduling.appointment.errors.patientRequired'
  }

  return newError as AppointmentError
}
