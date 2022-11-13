import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import callGoogleVisionAsync from "./helperFunctions";
import MissingComponent from "./esha"
import findFood from "./helperFindFood";
import logo from "./assets/myreal1.png"


export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  //const [goog, setGoog] = useState();
  const [photoduplicate, setPhotoduplicate] = useState();
  const [text, setText] = useState("Please add an image");
  const [scannedvalues, setScannedvalues] = useState("Please add an image");
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    setPhotoduplicate(newPhoto);
    console.log("picture taken");
    const responseData = await callGoogleVisionAsync(newPhoto.base64);
    //await setTimeout (5000);
    //setGoog(responseData);
    console.log("responseData ==> " , responseData);
    setText(responseData.toString());
    setScannedvalues(responseData);
    console.log("Called Google");

    //savePhoto();

  };

  if (photo) {

    //Share the pic function
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
      //setPhoto(undefined);
      });
    };

    //scan = {text};
    //scan = new Array(text) ; // what the image has from google api
    let values = findFood(scannedvalues);
    //console.log("Esha scan --> ", values[0]);
    //console.log("Esha scan --> ", values[1]);

    return (
      
      <SafeAreaView style={styles.container}>
        <View style= {styles.textbox}>
        <Text style={styles.presentText}>{values[0]} </Text>
        <Text style={styles.missingText}>{values[1]}</Text>
        </View>
        {/* //<Text>{text}</Text> */}
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style= {styles.textbox}>
        <Button style = {styles.eshabutton} title="Share" onPress={sharePic} />
        <Button tyle = {styles.eshabutton} title="Start Again" onPress={() => setPhoto(undefined)} />
        </View>
      </SafeAreaView>
    );
  }



  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        {/* <<Button title="Take Food Pic" onPress={takePic} />> */}
        <TouchableOpacity style = {styles.buttonContainer} activeOpacity = {0.5} onPress={takePic}>
          <Image source = {logo} style = {{width: 100, length: 50, resizeMode: 'center'}} ></Image>
        </TouchableOpacity>


      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#3DA35D",
    
  },
  textbox: {
    borderWidth: 3,
    borderRadius: 20,
    width: 400,
    backgroundColor:"#96E072",
    borderColor: '#134611'
    
  },
  buttonContainer: {
    //backgroundColor: '#fff',
    alignSelf: 'flex-end',
    margin: 10
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
    margin: 20,
    borderWidth: 4,
    borderRadius: 30,
    borderColor: '#134611'
  
  },
  eshabutton: {
    backgroundColor: "khaki",
    color: "hotpink", 
    borderColor: '#134611'
  },
  baseText: {
    fontFamily: 'serif',
    padding: 50,
    backgroundColor:"pink",
    textAlign: 'center',
    resizeMode: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "hotpink", 
    height: 150

  },
  presentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "green", 
    height: 50,
    alignSelf: "left",
    paddingHorizontal: 20

  },
  missingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "indianred", 
    height: 50,
    alignSelf: "left",
    paddingHorizontal: 20,

  },
});