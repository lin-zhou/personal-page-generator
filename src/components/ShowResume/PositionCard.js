import React from 'react';

function PositionCard(props) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let endDate;
  if (props.position.isCurrent) {
    endDate = "Present";
  } else if (props.position.end) {
    endDate = months[props.position.end.month - 1] + " " + props.position.end.year;
  } else {
    endDate = "Unknown";
  }

  return (
    <div className="position-card shadow-box">
      <div className="position-card__org-title"><b>
        {props.position.org && <span>{props.position.org}</span>}
        {props.position.org && props.position.title && <span> | </span>}
        {props.position.title && <span>{props.position.title}</span>}
      </b></div>
      <div className="position-card__date">
        <i>{props.position.start && <span>{months[props.position.start.month - 1]} {props.position.start.year} &ndash;</span>} {endDate}</i>
      </div>
      {props.position.summary &&
        <span>
          <hr></hr>
          <div className="position-card__summary">{props.position.summary}</div>
        </span>
      }
    </div>
  )
}

export default PositionCard;