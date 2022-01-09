import React, { useState, useEffect } from "react";
import "./App.css";
import { addScheduleTimes } from "./utilities/times.js";
import CourseList from "./compoents/CourseList.js";

const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";

const schedule = {
  title: "CS Courses for 2018-2019",
  courses: {
    F101: {
      id: "F101",
      meets: "MWF 11:00-11:50",
      title: "Computer Science: Concepts, Philosophy, and Connections",
    },
    F110: {
      id: "F110",
      meets: "MWF 10:00-10:50",
      title: "Intro Programming for non-majors",
    },
    S313: {
      id: "S313",
      meets: "TuTh 15:30-16:50",
      title: "Tangible Interaction Design and Learning",
    },
    S314: {
      id: "S314",
      meets: "TuTh 9:30-10:50",
      title: "Tech & Human Interaction",
    },
  },
};

const Banner = ({ title }) => <h1>{title}</h1>;

const App = () => {
  const [schedule, setSchedule] = useState();

  // If no argument is given, React runs the function on all updates.
  // If an empty list is given, then React runs the function only when
  // the component is first added. That's what we want here:
  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    };
    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

export default App;
