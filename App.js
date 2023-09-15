import MapView from "react-native-maps";
import * as SMS from "expo-sms";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { getLocation } from "./utils/getLocation";
import { useEffect, useState } from "react";
import { text } from "./utils/sendText";
import { Marker } from "react-native-maps";
export default function App() {
  const [lat, setLat] = useState(52.57559667266577);
  const [long, setLong] = useState(-0.25841876864433294);
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   getLocation()
  //   .then(({ latitude, longitude }) => {
  //     console.log(latitude, longitude, "lat long");
  //     setLat(latitude);
  //     setLong(longitude);
  //     setIsLoading(false);
  //   })
  //   .catch(()=>{

  //   });
  // }, [lat, long]);

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(true);
      setLat((lat) => {
        return lat + 0.00001;
      });
      setLong((long) => {
        return long + 0.00001;
      });
      console.log(lat, long);
      setIsLoading(false);
      setRegion((region) => {
        return {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
      });
      console.log(region)
    }, 1000);
  },[region]);

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
