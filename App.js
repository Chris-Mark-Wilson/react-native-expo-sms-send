import MapView from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { getLocation } from "./utils/getLocation";
import { useEffect, useState } from "react";
import { text } from "./utils/sendText";
import { Marker } from "react-native-maps";
export default function App() {
  const [lat, setLat] = useState(52.57559667266577);
  const [long, setLong] = useState(-0.25841876864433294);
  let regionObject = {};
  const [isLoading, setIsLoading] = useState(false);
  const [pos, setPos] = useState({
    latitude: 52.57559667266577,
    longitude: -0.25841876864433294,
  });

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
      setIsLoading(true)
      getLocation().then(({ latitude, longitude }) => {
        console.log(latitude, longitude, "lat long");
        setLat((lat)=>{
          return lat+0.0001
        });
        setLong((long)=>{
          return long+0.0001
        });
        console.log(lat,long)
        setIsLoading(false)
      }, 10000);
    });
  });

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
        initialRegion={{
          latitude:lat ,
          longitude: long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
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
