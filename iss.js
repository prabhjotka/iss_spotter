const request = require('request');
const url = 'https://api.ipify.org?format=json&callback=getIP';

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API


  request(`${url}`, (error, response, body) => {
    // console.log("body part is",body);
    // console.log("response is",response);
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};
const fetchCoordsByIP = function(ip, callback) {



  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    //console.log("body part is",body);
    // console.log("response is",response);
    if (error) {

      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });

    //its was my way to solve
    //  const data={latitude:"",
    // longitude:""};

    //   data.latitude= JSON.parse(body).latitude;
    //   data.longitude= JSON.parse(body).longitude;
    // callback(null, data);
  });

};
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const riseTime = JSON.parse(body).response;


    callback(null, riseTime);



  });

};

const nextISSTimesForMyLocation = ((callback) => {


  fetchMyIP((error, ip,) => {
    if (error) {
      console.log("It didn't work!", error);
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!", error);
        return callback(error, null);
      }

      fetchISSFlyOverTimes(data, (error, result) => {
        if (error) {
          // console.log("It didn't workkkkk!", error);
          return callback(error, null);
        }

        callback(null, result);

      });

    });


  });

});


module.exports = {
  nextISSTimesForMyLocation
};


