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

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  for (let obj of state.days) {
    if (obj.name === day) {
      let interviewerNums = obj.interviewers;
      for (let key of interviewerNums) {
        interviewers.push(state.interviewers[key]);
      }
    }
  }
  return interviewers;
}

export function getInterview(state, interview) {
  let interviewData = {};
  if (interview === null) {
    return null;
  } else {
    for (let interviewer in state.interviewers) {
      if (state.interviewers[interviewer].id === interview.interviewer) {
        interviewData.student = interview.student;
        interviewData.interviewer = state.interviewers[interviewer];
        return interviewData;
      }
    }
  }
}