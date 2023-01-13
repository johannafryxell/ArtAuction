import { useEffect, useState } from "react";

interface ICountDownProps {
  endTime: Date;
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
  const endMonth = monthNames[+(new Date(endTime).getMonth().toLocaleString())];
  const [timeLeft, setTimeLeft] = useState(calcCountDown());

  function calcCountDown() {
    const year = new Date(today).getFullYear();
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
    const oneDay = 24 * 60 * 60 * 1000;

    const diffDays = Math.round(Math.abs((+today - +endTime) / oneDay));

    const ending = new Date(props.endTime).toLocaleDateString();
    const now: string = new Date().toLocaleDateString();
    // console.log(endDate);
    // console.log(endTime)

    if (ending === now) {
      return (
        <div className="timeCount">
          <span>{timeLeft.hours}:</span>
          <span>{timeLeft.minutes}:</span>
          <span>{timeLeft.seconds}</span>
        </div>
      );
    } else {
      return (
        <div>
          <span>{timeLeft.days} days </span>
          <span>
            {timeLeft.hours} {timeLeft.hours == 1 ? "hour" : "hours"}
          </span>
        </div>
      );
    }
  }

  return (
    <>
      {new Date(props.endTime).toLocaleDateString() === new Date().toLocaleDateString() ? (
        <span>Ends today</span>
      ) : (
        <span>
          Ends {endDate} {endMonth}
        </span>
      )}
      {timeDisplay()}
    </>
  );
};
