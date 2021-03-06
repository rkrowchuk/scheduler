import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  })
  const formatSpots = (num) => {
    let spot = "";
    if (num === 0) {
      spot = "no spots";
    } else if (num === 1) {
        spot = "1 spot";
      } else {
        spot = `${num} spots`;
      }
      return spot;
  }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} value={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}