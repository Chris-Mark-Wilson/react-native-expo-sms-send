
import * as Location from 'expo-location';

   

export const getLocation=()=>{
  console.log("in get location")
return  Location.requestForegroundPermissionsAsync()
 .then(({status})=>{
 
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      console.log("rejecting access")
      return Promise.reject(errorMsg);
    }
    return status;
})
.then((status)=>{
  console.log(status,"<=status")
  return  Location.getCurrentPositionAsync({});
  })
  .then(({coords:{latitude,longitude}})=>{
    console.log("returning")
return ({latitude,longitude})
  })
.catch(err=>{
  console.log(err,"err in catch")
  // return ({latitude:52.57559667266577,longitude:-0.25841876864433294})
})
}


