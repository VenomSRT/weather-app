import axios from 'axios';

const BASE_URL = 'http://www.7timer.info/bin/civil.php';
const altitudeCorrection = 0;
const units = 'metric';
const output = 'json';
const timezoneAdjustment = 0;

export function getData(latitude, longitude) {  
  return axios.get(`${BASE_URL}?lon=${longitude}&lat=${latitude}&ac=${altitudeCorrection}&unit=${units}&output=${output}&tzshift=${timezoneAdjustment}`)
    .then(response => response.data)
    .catch(error => console.log(Error(error)));
}

