import React from "react";
import { useState, useEffect } from "react";
import DateTools from "../DateTools";
import HabitsDataServices from "../../services/habits";

const LinearBar = (props) => {
  const start = props.start;
  const duration = props.duration;
  const habit = props.habit;
  // bars will indicate when a habit is done
  // and will chaneg the state to success
  // it will also track last updated to get
  // rid of habit if not followed up by user
  const setHabitState = props.setHabitState;

  const [progress, setProgress] = useState(
    Math.min(1, DateTools.Percentage(start, duration))
  );

  //const [progress, setProgress] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      const newProgress = DateTools.Percentage(start, duration);

      setProgress(Math.min(newProgress, 1));

      if (newProgress >= 1) {
        clearInterval(interval);
        const updatedHabit = {
          ...habit,
          archived: "" + true,
          success: "" + habit.success,
          discrete: "" + habit.discrete,
        };
        console.log("updated habit is : ");
        console.log(updatedHabit);
        HabitsDataServices.updateHabit(habit._id, updatedHabit)
          .then((response) => {
            console.log("updated to archived true successfully");
            props.setHabit({
              ...habit,
              archived: true,
              success: habit.success,
              discrete: habit.discrete,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 1000); // Update every 100ms for smoother animation

    return () => clearInterval(interval);
  }, [progress]);

  const Bar = (props) => {
    const progress = props.progress;
    return (
      <div className="w-full h-6 bg-gray-800 bg-opacity-30 rounded-lg border-blue-800 border-2">
        <div className={`relative h-full bg-gray-800 bg-opacity-30 rounded-lg`}>
          <div
            className={`text-whit flex items-center pl-2 font-bold absolute top-0 left-0 h-full bg-gradient-to-r from-green-700 to-green-500 rounded-md ${
              progress < 1 && "rounded-r-none"
            }`}
            style={{ width: `${Math.max(progress * 100, 1)}%` }}
          >
            {Math.round(progress * 100)}%{" "}
          </div>
        </div>
      </div>
    );
  };
  function DivsRenderer({ count }) {
    const divs = [];

    let track = DateTools.DaysPassed(progress, duration);
    let days = track[0];
    let remain = track[1];

    for (let i = 0; i < count; i++) {
      divs.push(
        <div
          className={`text-whit flex items-center font-bold border-blue-800 border-2 bg-opacity-30 bg-gray-800 w-full rounded-lg 
      ${days > 0 && "pl-2  bg-gradient-to-r from-green-700 to-green-500"}
      `}
          key={i}
        >
          {i == 0 && days != 0 && Math.round(progress * 100) + "%"}
          {days == 0 && (
           <> <div
              className={`  items-center bg-gradient-to-r from-green-700 to-green-500 rounded-lg rounded-r-none h-full`}
              style={{ width: `${Math.max(remain * 100,1)}%` }}
            >
  
            </div>
             {i == 0 && <p className="absolute top-0 left-2">{Math.round(progress * 100) + "%"}</p>}</>
          )}
        </div>
      );
      days -= 1;
    }

    return divs;
  }
  const Block = () => {
    return (
      <div className="w-full h-6 relative flex flex-row justify-stretch bg-opacity-30 ">
        <DivsRenderer count={habit.duration} />
      </div>
    );
  };

  return <>{habit.discrete ? <Block /> : <Bar progress={progress} />}</>;
};

export default LinearBar;
