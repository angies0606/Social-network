import { useEffect, useState } from 'react';
import { passedTimeCalc } from './passedTimeCalc';

function DateBar ({
  creationDate,
  className = ''
}) {
  let [currentTimeout, setCurrentTimeout] = useState(null);
  let [timeMessage, setCurrentTime] = useState('');
  
  useEffect(() => {  
    refreshTime();
  }, [creationDate]);

  useEffect(() => {
    if (currentTimeout === null) return;  

    const timeoutId = setTimeout(() => {
      refreshTime();
    }, currentTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentTimeout]);

  const refreshTime = () => {
    const {timeMessage, timeout} = passedTimeCalc(creationDate);
    setCurrentTime(timeMessage);
    setCurrentTimeout(timeout);
  }

  return (
    <div className={className}>
      {timeMessage}
    </div>
  )
}

export default DateBar;