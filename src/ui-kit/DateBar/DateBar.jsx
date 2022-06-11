import { useEffect, useState } from "react";
import { passedTimeCalc } from "./passedTimeCalc";

function DateBar ({
  creationDate,
  updateDate = null,
  className = ''
}) {
  let [currentTimeout, setCurrentTimeout] = useState(null);
  let [timeMessage, setCurrentTime] = useState('');
  
  useEffect(() => {  
    refreshTime();
  }, [creationDate]);

  function updateTimeout(timeout) {
    if (timeout === null) {
      setCurrentTimeout(null);
      return;
    } 

    if(currentTimeout) {
      clearTimeout(currentTimeout);
    }

    const timeoutId = setTimeout(() => {
      refreshTime();
    }, timeout);

    setCurrentTimeout(timeoutId);
  }
  
  const refreshTime = () => {
    const {timeMessage, timeout} = passedTimeCalc(creationDate);
    setCurrentTime(timeMessage);
    updateTimeout(timeout);
  };

  return (
    <>
    {creationDate === updateDate
      ? timeMessage
      : timeMessage + ' ' + "(ред.)"
    }
    </>
  )
}

export default DateBar;