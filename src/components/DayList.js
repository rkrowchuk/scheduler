import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const listDays = days.map((item => {
    return (
        <DayListItem
          key={item.id} 
          name={item.name} 
          spots={item.spots}
          selected={item.name === props.day}
          setDay={props.setDay}
        />)
  })); 
  return (
    <ul>
      {listDays}
    </ul>
  );
}