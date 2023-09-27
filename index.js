// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    
    // success, print out the deets!
    printPassTimes(passTimes);
  });


// fetchMyIP((error, IP) => {
//     if (error) {
//         console.log("It didn't work!", error);
//         return;
//     }

//     console.log('It worked! Returned IP:', IP);
// });
// fetchCoordsByIP('174.0.181.81', (error, data) => {
//     if (error) {
//         console.log("It didn't work!", error);
//         return;
//     }

//     console.log('It worked! Returned :', data);

// });
// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, result) => {
//     if (error) {
//         console.log("It didn't workkkkk!", error);
//         return;
//     }

//     console.log('It worked! Returned  risetime is:', result);
// });


