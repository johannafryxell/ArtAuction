import { useEffect, useState } from "react";
import { LoaderSkeleton } from "../loaders/LoaderSkeleton";

interface ICountDownProps {
  endTime: string;
}

export const CountDown = (props: ICountDownProps) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const endTime = new Date(props.endTime).toLocaleString();
  const today: string = new Date().toLocaleString();
  const endDate = new Date(endTime).getDate().toLocaleString();
  const endMonth = monthNames[+new Date(endTime).getMonth().toLocaleString()];
  const [timeLeft, setTimeLeft] = useState(calcCountDown());

  function calcCountDown() {
    const difference = +new Date(endTime) - +new Date(today);

    let timeLeft: any = {};

    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  }

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calcCountDown());
    }, 1000);
  });

  function timeDisplay() {
    if (timeLeft.days <= 0) {
      return (
        <div className="timeCount">
          <span>{timeLeft.hours < 10 && "0"}{timeLeft.hours}:</span>
          <span>{timeLeft.minutes < 10 && "0"}{timeLeft.minutes}:</span>
          <span>{timeLeft.seconds < 10 && "0"}{timeLeft.seconds}</span>
        </div>
      );
    } else if(timeLeft.days > 0){
      return (
        <div>
          {timeLeft.days != 0 && (
            <span>
              {timeLeft.days} {timeLeft.days == 1 ? "day " : "days "}
            </span>
          )}
          <span>
            {timeLeft.hours} {timeLeft.hours == 1 ? "hour" : "hours"}
          </span>
        </div>
      );
    }else{
      return(<LoaderSkeleton type={"text"}/>)
    }
  }

  return (
    <>
      {new Date(props.endTime).toLocaleDateString() ===
      new Date().toLocaleDateString() ? (
        <div>
          <span>Ends today</span>
          <span>{endTime}</span>
        </div>
      ) : (
        <div className="endTime">
          <span>Ends</span>
          <span>
            {endDate} {endMonth}{" "}
            {new Date(props.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      )}
      {timeDisplay()}
    </>
  );
};
