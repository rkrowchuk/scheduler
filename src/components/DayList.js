import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const listDays = props.days.map((item => {
    return (
        <DayListItem
          key={item.id} 
          name={item.name} 
          spots={item.spots}
          selected={item.name === props.value}
          setDay={() => props.onChange(item.name)}
        />)
  })); 
  return (
    <ul>
      {listDays}
    </ul>
  );
}