export function getAppointmentsForDay(state, day) {
  const appointments = [];
  for (let obj of state.days) {
    if (obj.name === day) {
      let appointmentNums = obj.appointments;
      for (let key of appointmentNums) {
        appointments.push(state.appointments[key]);
      }
    }
  }
  return appointments;
}