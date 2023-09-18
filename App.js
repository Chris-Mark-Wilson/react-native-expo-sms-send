 // require('dotenv').config({path: `${__dirname}/../.env.development`})


import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MapView from "react-native-maps";
import * as SMS from "expo-sms";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button ,Pressable,TextInput,FlatList} from "react-native";
import { getLocation } from "./utils/getLocation";
import { useEffect, useState } from "react";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
export default function App() {

  const Drawer = createDrawerNavigator();

  return (<>
       <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Myfreinds" component={Myfreinds} />
      </Drawer.Navigator>
    </NavigationContainer>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
flex:1

 

  },
  button: {
    display:"flex",
    justifyContent:"center",
    
 height:"10",padding:0
  },
  map: {top:40,
   
    
    width: "100%",
    height: "80%",
  },
  pressable:{

    postion:"absolute", 
    left:"40%",
    top:"10%",
    backgroundColor:"black",
    padding:"2%",
    justifyContent:"center",
    margin:"auto",
    alignContent:"center",
    borderWidth:2,
    borderRadius:10
  },
  text:{
    position:"absolute",
    top:"15%",
    left:"10%",
    justifyContent:"center",
    backgroundColor:"grey",
    color:"white",
  }
});
function Myfreinds({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}
function HomeScreen({ navigation }) {
  const [lat, setLat] = useState(52.57559667266577);
  const [long, setLong] = useState(-0.25841876864433294);
  const [timer, setTimer] = useState(0);
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
  const[buttonText,setButtonText]=useState("Press me")




  const text = () => {
    const numbersArray = ["+447597852695"];
    console.log("pressed send");
    return SMS.isAvailableAsync()
      .then((isAvailable) => {
        if (isAvailable) {
          return SMS.sendSMSAsync(
            numbersArray,
            `https://www.google.com/maps/@${lat},${long},16z?entry=ttuu`
          );
        } else {
          console.log("not available");
        }
      })
      .catch((err) => {
        console.log(err, "err in block");
        console.log("catch block error");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setTimer((timer) => {
        return timer + 1;
      });

    }, 1000);
  }, [timer]);

  useEffect(() => {
    getLocation()
      .then(({ latitude, longitude }) => {

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

      })
      .catch((err) => {
        console.log(err,"in get location")
      });

  }, [timer]);

  const handlePress = (e) => {
    console.log(e.nativeEvent.coordinate);
    setPos(e.nativeEvent.coordinate);
  };
  const pressPressable=(e)=>{
    console.log("pressed")
    buttonText==="Press me"?setButtonText("and again"):setButtonText("Press me")

  }
  return isLoading ? (
    <View style={styles.container}>
       
      <Text>loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>

<StatusBar
        animated={true}
        backgroundColor="#61dafb"
       
     
      
      />
  
        <MapView
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
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
          showsPointsOfInterest={true}
          showsUserLocation={true}
        >
        <Marker coordinate={pos} />
        </MapView>
        {/* <TextInput style={{position:"absolute",top:"30%"}}></TextInput> */}
        <Pressable style={{postion:"absolute", 
      left:"30%",
      top:"-10%",
      backgroundColor:"grey",
      padding:"2%",
    width:100,
      alignContent:"center",
      justifyContent:"center",
      borderRadius:10
  }} onPress={pressPressable}>
        <Text style={{color:"black",backgroundColor:"white",alignContent:"center",paddingHorizontal:"2%",borderRadius:5}} >{buttonText}</Text>
        </Pressable>
        <Text style={styles.text}>
          latitude:{lat}    longitude{long}
        </Text> 
         <Button
          style={styles.button}
          onPress={text}
          title="send text"
          color="grey"  
    />
      <Button
        onPress={() => navigation.navigate('My friends')}
        title="My friends"
      />
          </View>
   

  );
}
