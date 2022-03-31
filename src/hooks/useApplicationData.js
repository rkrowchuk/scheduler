import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  const updateSpots = function(state, appointments, id, dlt = false ) {

    const oldInterview = state.appointments[id].interview;
    const newInterview = appointments[id].interview;
    let update = 0;
  
    if (oldInterview !== null && newInterview !== null) {
      update = 0;
    }
    if (oldInterview !== null && newInterview === null && dlt) {
      update = 1;
    }
    if (oldInterview === null && newInterview !== null) {
      update = -1;
    }
    const newDays = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {...day, spots: day.spots + update}
      }
      return day;
    })
    return newDays;
  } 

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({...state, appointments, days});
      });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments, id, true);
        setState({...state, appointments, days});
      })
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview, 
  }

}