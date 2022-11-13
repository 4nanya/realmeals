import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import callGoogleVisionAsync from "./helperFunctions";

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();
  const [goog, setGoog] = useState();
  const [photoduplicate, setPhotoduplicate] = useState();
  const [text, setText] = useState("Please add an image");
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
    setGoog(responseData);
    setText(responseData.description)
    console.log(responseData);
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



    return (
      <SafeAreaView style={styles.container}>
        <Text>{text}</Text>
        <Text>{text}</Text>
        <Text>{text}</Text>
        <Text>{text}</Text>
        <Text>{text}</Text>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        <Button title="Start Again" onPress={() => setPhoto(undefined)} />

      </SafeAreaView>
    );
  }



  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title="Take Food Pic" onPress={takePic} />
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
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  }
});