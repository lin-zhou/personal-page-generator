import React from 'react';

function EducationCard(props) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="education-card shadow-box">
      <div className="education-card__org"><b>{props.school.org}</b></div>
      <div className="education-card__deg-gpa">
        {props.school.degree} {props.school.field}&nbsp;
        {props.school.gpa &&
          <span>
            | GPA: {props.school.gpa}
          </span>
        }
        {props.school.end && <div>{months[props.school.end.month - 1]} {props.school.end.year}</div>}
      </div>
    </div>
  )
}

export default EducationCard;