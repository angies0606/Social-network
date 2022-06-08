// import { useEffect, useState } from 'react';
// import { passedTimeCalc } from './passedTimeCalc';

// function DateBar ({
//   creationDate,
//   className = ''
// }) {
//   let [currentTimeout, setCurrentTimeout] = useState(null);
//   let [timeMessage, setCurrentTime] = useState('');
  
//   useEffect(() => {  
//     refreshTime();
//   }, [creationDate]);

//   useEffect(() => {
//     if (currentTimeout === null) return;  

//     const timeoutId = setTimeout(() => {
//       refreshTime();
//     }, currentTimeout);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [currentTimeout]);

//   const refreshTime = () => {
//     const {timeMessage, timeout} = passedTimeCalc(creationDate);
//     setCurrentTime(timeMessage);
//     setCurrentTimeout(timeout);
//   }

//   return (
//     <div className={className}>
//       {timeMessage}
//     </div>
//   )
// }

// export default DateBar;

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
  }

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