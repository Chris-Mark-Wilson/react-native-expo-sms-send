import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { getLocation } from './components/getLocation';
import { useEffect, useState } from 'react';
import * as SMS from "expo-sms";
export default function App() {
  const numbersArray=["+447597852695"]
  const[lat,setLat]=useState(null)
  const[long,setLong]=useState(null)
useEffect(()=>{
  getLocation()
  .then(({latitude,longitude})=>{
    console.log(latitude,longitude)
    setLat(latitude)
    setLong(longitude)
  })
},[lat,long])
  const text = () => {
    return SMS.isAvailableAsync()
    .then((isAvailable) => {
      if (isAvailable) {
        // do your SMS stuff here
        return SMS.sendSMSAsync(numbersArray, `https://www.google.com/maps/@${lat},${long},16z?entry=ttuu`)
      }else{
          console.log("not available")
      }
  })
  .catch(err=>{
      console.log(err,"err in block")
      console.log("catch block error")
  })
  }  
  

  return (
    <View style={styles.container}>
    
      <StatusBar style="auto" />
      <Text>latitude:{lat} longitude{long}</Text> 
      <MapView style={styles.map}
      Region={{
        latitude: lat,
        longitude: long,
       
      }}/>
      <Button
      style={styles.button}
  onPress={text}
  title="send text"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/> 
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
flex:1,
    flexDirection:"column",
    backgroundColor: '#fff',
    justifyItems:"space-around",
    alignItems: 'center',
    justifyContent: 'center',

  },
  button:{
   height:'10%',
    justifySelf:"flex-end"
  },
  map: {
    width: '80%',
    height: '30%',
  },
});
