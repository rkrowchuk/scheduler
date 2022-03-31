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
      .then((response) => {
        setState({...state, appointments});
        updateSpots();
      })
  }

  const cancelInterview = (id) => {
   return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        updateSpots();
      })
  }

  const updateSpots = function(state, appointments, id) {

    const oldInterview = state.appointments[id].interview;
    const newInterview = appointments[id].interview;
    let update = 0;
  
    if (oldInterview !== null && newInterview !== null) {
      update = 0;
    }
    if (oldInterview !== null && newInterview === null) {
      update = 1;
    }
    if (oldInterview === null && newInterview !== null) {
      update = -1;
    }
    const dayObj = state.days.find(d1 => d1.name === state.day);
    const newDays = state.days.map(day => {
      if (dayObj) {
        return {...day, spots: day.spots + update}
      }
      return day;
    })
    return newDays;
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview, 
    updateSpots
  }

}