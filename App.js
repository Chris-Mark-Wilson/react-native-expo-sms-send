import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { getLocation } from './utils/getLocation';
import { useEffect, useState } from 'react';
import {text} from './utils/sendText'
export default function App() {

  const[lat,setLat]=useState(null)
  const[long,setLong]=useState(null)
  let regionObject={};

useEffect(()=>{
  getLocation()
  .then(({latitude,longitude})=>{
    console.log(latitude,longitude,"lat long")
    setLat(latitude)
    setLong(longitude)

regionObject.latitude=latitude;
regionObject.longitude=longitude;
regionObject.latitudeDelta=0;
regionObject.longitudeDelta=0;
console.log(regionObject,"regionObject")
  })
},[lat,long])

  return (
    <View style={styles.container}>
    
      <StatusBar style="auto" />
      <Text>latitude:{lat} longitude{long}</Text> 
      {(regionObject.latitude&&regionObject.longitude)??
      <MapView style={styles.map}
      // initialRegion={regionObject}
      />}
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
