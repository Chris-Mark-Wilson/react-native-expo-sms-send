import MapView from "react-native-maps";
import * as SMS from "expo-sms";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { getLocation } from "./utils/getLocation";
import { useEffect, useState } from "react";

import { Marker } from "react-native-maps";
export default function App() {
  const [lat, setLat] = useState(52.57559667266577);
  const [long, setLong] = useState(-0.25841876864433294);
  const[timer,setTimer]=useState(0)
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pos, setPos] = useState({
    latitude: 52.57559667266577,
    longitude: -0.25841876864433294,
  });
  const text = () => {
    const numbersArray=["+447597852695"]
    console.log("pressed send")
    return SMS.isAvailableAsync()
    .then((isAvailable) => {
      if (isAvailable) {
  
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

  useEffect(()=>{
    setTimeout(()=>{
      setTimer((timer)=>{
        return timer+1
      })
      console.log(timer)
    },10000)
  },[timer])

  useEffect(() => {
    
    getLocation()
    .then(({ latitude, longitude }) => {
      console.log(latitude, longitude, "lat long");
      setLat(latitude);
      setLong(longitude);
      setRegion((region) => {
        return {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
      });
      console.log("set region")
    })
    .catch(()=>{
console.log("in catch block appjs")
    });
    console.log("in use effect")
  }, [timer]);


  


  const handlePress = (e) => {
    console.log(e.nativeEvent.coordinate);
    setPos(e.nativeEvent.coordinate);
  };

  return isLoading ? (
    <View style={styles.container}>
      <Text>loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>
        latitude:{lat} longitude{long}
      </Text>

      <MapView
        style={styles.map}
        region={region}
        onRegionChange={() => {
          setRegion((region) => {
            return {
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            };
          });
        }}
        onPress={handlePress}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsUserLocation={true}
      >
        <Marker coordinate={pos} />
      </MapView>

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
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyItems: "space-around",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: "10%",
    justifySelf: "flex-end",
  },
  map: {
    width: "80%",
    height: "30%",
  },
});
