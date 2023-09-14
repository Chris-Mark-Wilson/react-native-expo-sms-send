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
  const[isLoading,setIsLoading]=useState(true)

useEffect(()=>{
  setIsLoading(true)
  getLocation()
  .then(({latitude,longitude})=>{
    console.log(latitude,longitude,"lat long")
    setLat(latitude)
    setLong(longitude)
setIsLoading(false)
  })
},[lat,long])

useEffect(()=>{
  setTimeout(()=>{
    getLocation()
  .then(({latitude,longitude})=>{
    console.log(latitude,longitude,"lat long")
    setLat(latitude)
    setLong(longitude)
  },10000)
  })
})



return(isLoading?<View style={styles.container}>
<Text>loading...</Text></View>
: <View style={styles.container}>
    
    <StatusBar style="auto" />
    <Text>latitude:{lat} longitude{long}</Text> 

    <MapView style={styles.map}
  initialRegion={{
    latitude:lat,
    longitude:long,
    latitudeDelta:0.005,
    longitudeDelta:0.005
  }}
    />
    <Button
    style={styles.button}
onPress={text}
title="send text"
color="#841584"
accessibilityLabel="Learn more about this purple button"
/> 
 </View>)


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
