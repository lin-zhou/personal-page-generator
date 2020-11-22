import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, upload } from "../utilities.js";
import "../css/ShowResume.css";

import Summary from "../components/ShowResume/Summary.js";
import Contact from "../components/ShowResume/Contact.js";
import Education from "../components/ShowResume/Education.js";
import Positions from "../components/ShowResume/Positions.js";
import Skills from "../components/ShowResume/Skills.js";

function ShowResume() {
  let { id } = useParams();

  const [data, setData] = useState({ resume: {} })

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      return await fetch(baseUrl + "/resume/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
    }
    fetchData().then(d => d.json()).then(d => {
      console.log(d); setData(d)
      setLoaded(true)
    })
  }, [])

  console.log("hi")
  return (
    <div className="resume-display view">
      <div className="name">{loaded && data.names[0]}</div>
      {loaded ?
        <Summary expSummary={data.summary.experience} /> :
        "Loading..."
      }
      {loaded && <Contact links={data.links} emails={data.emails} phones={data.phones} />}
      {loaded && <Education schools={data.schools} />}
      {loaded && <Positions positions={data.positions} />}
      {loaded && <Skills skills={data.summary.skills} />}
    </div>
  );
}

export default ShowResume;