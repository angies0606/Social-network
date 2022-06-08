import moment from "moment";
import 'moment/locale/ru';
moment.locale('ru');

// export function passedTimeCalc (creationTime) {
//   const creationDate = moment(creationTime);
//   let currentDate = moment();
//   let diffTime = currentDate.diff(creationDate, 'seconds');
//   let timeMessage;
//   let timeout;

//   switch(true) {
//     case diffTime >= 86400:
//       let isSameYear = moment(creationDate).isSame(currentDate, 'year');
//       if(isSameYear) {
//         timeMessage = creationDate.format('D MMMM, HH:mm');
        
//       } else {
//         timeMessage = creationDate.format('D MMMM YYYY, HH:mm')
//       }
//       timeout = null;
//       break;
//     case diffTime >= 5400 && diffTime < 86400:
//       let isSameDay = moment(creationDate).isSame(currentDate, 'day');
//       if(isSameDay) {
//         timeMessage = creationDate.format('[Cегодня], HH:mm');
//       } else {
//         timeMessage = creationDate.format('D MMMM, HH:mm');
//       }
//       timeout = 82800000;
//       break;
//     case diffTime >= 3600 && diffTime < 5400:
//       timeMessage = 'час назад';
//       timeout = 1200000;
//       break;
//     case diffTime >= 2400 && diffTime < 3600:
//       timeMessage = '40 минут назад';
//       timeout = 1200000;
//       break;
//     case diffTime >= 1800 && diffTime < 2400:
//       timeMessage = 'полчаса назад';
//       timeout = 600000;
//       break;
//     case diffTime >= 1200 && diffTime < 1800:
//       timeMessage = '20 минут назад';
//       timeout = 600000;
//       break;
//     case diffTime >= 600 && diffTime < 1200:
//       timeMessage = '10 минут назад';
//       timeout = 600000;
//       break;
//     case diffTime >= 300 && diffTime < 600:
//       timeMessage = '5 минут назад';
//       timeout = 300000;
//       break;
//     case diffTime >= 120 && diffTime < 300: 
//       timeMessage = '2 минуты назад';
//       timeout = 180000;
//       break;
//     case diffTime >= 60 && diffTime < 120:
//       timeMessage = 'минуту назад';
//       timeout = 120000;
//       break;
//     case diffTime >= 0 && diffTime < 60:
//       timeMessage = 'только что';
//       timeout = 60000;
//       break;
//     default:
//       timeMessage = creationDate.format('D MMMM YYYY, HH:mm');
//       timeout = null;
//   }
  
//   return {
//     timeMessage,
//     timeout
//   }
// }

export function passedTimeCalc (creationTime) {
  const creationDate = moment(creationTime);
  let currentDate = moment();
  let diffTime = currentDate.diff(creationDate, 'milliseconds');
  
  let timeMessage;
  let timeout;

  switch(true) {
    case diffTime >= 86400000:
      let isSameYear = moment(creationDate).isSame(currentDate, 'year');
      if(isSameYear) {
        timeMessage = creationDate.format('D MMMM, HH:mm');
        
      } else {
        timeMessage = creationDate.format('D MMMM YYYY, HH:mm');
      }
      timeout = null;
      break;
    case diffTime >= 5400000 && diffTime < 86400000:
      let isSameDay = moment(creationDate).isSame(currentDate, 'day');
      if(isSameDay) {
        timeMessage = creationDate.format('[Cегодня], HH:mm');
      } else {
        timeMessage = creationDate.format('D MMMM, HH:mm');
      }
      timeout = 82800000;
      break;
    case diffTime >= 3600000 && diffTime < 5400000:
      timeMessage = 'час назад';
      timeout = 1200000;
      break;
    case diffTime >= 2400000 && diffTime < 3600000:
      timeMessage = '40 минут назад';
      timeout = 1200000;
      break;
    case diffTime >= 1800000 && diffTime < 2400000:
      timeMessage = 'полчаса назад';
      timeout = 600000;
      break;
    case diffTime >= 1200000 && diffTime < 1800000:
      timeMessage = '20 минут назад';
      timeout = 600000;
      break;
    case diffTime >= 600000 && diffTime < 1200000:
      timeMessage = '10 минут назад';
      timeout = 600000;
      break;
    case diffTime >= 300000 && diffTime < 600000:
      timeMessage = '5 минут назад';
      timeout = 300000;
      break;
    case diffTime >= 120000 && diffTime < 300000: 
      timeMessage = '2 минуты назад';
      timeout = 180000;
      break;
    case diffTime >= 60000 && diffTime < 120000:
      timeMessage = 'минуту назад';
      timeout = 120000;
      break;
    case diffTime >= 0 && diffTime < 60000:
      timeMessage = 'только что';
      timeout = 60000;
      break;
    default:
      timeMessage = creationDate.format('D MMMM YYYY, HH:mm');
      timeout = null;
  }
  
  return {
    timeMessage,
    timeout
  }
}