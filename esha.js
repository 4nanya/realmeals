import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,Image,
} from "react-native";
import {useFont} from 'expo-font';
import logo from './assets/myreal1.png'; //imports the logo

const scan = new Array("Naan", "Cereal", "Kale", "Meat") ; // what the image has from google api

// list of foods in the different food groups
const veg = new Array("Vegetable", "Kale");
const protein = new Array("Tofu", "Meat", "Lentil", "Daal");
const fruit = new Array("Fruit");
const grain = new Array("Bread", "Naan", "Rice", "Cereal");
const dairy = new Array("Milk", "Cheese", "Yogurt", "Curd");

// the lengths
scanLen = scan.length ; 
vegLen = veg.length ; 
proteinLen = protein.length ; 
fruitLen = fruit.length ; 
grainLen = grain.length ; 
dairyLen = dairy.length ; 

// wheter we have the group or not
const present = new Array(false, false, false, false, false) ;
//words corrosponds to the below words
const words = new Array("Vegetable", "Protein", "Fruit", "Grain", "Dairy") ;

// nested for loop that goes through the scanned list and checks those against our local database
for (let i = 0; i < scanLen; i++) {
  let scanner = scan[i]; //take individual index from scan area
  console.log(scanLen, scanner) ;
  for (let w = 0; w < vegLen; w++) {
    let check = veg[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
     console.log("vegtable") ;
     present[0] = true;
     //if the food group is present, replace that group's space with true
    
  }
  for (let w = 0; w < proteinLen; w++) {
    let check = protein[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
     console.log("protein") ;
     present[1] = true;
  }
  }
  for (let w = 0; w < fruitLen; w++) {
    let check = fruit[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
     console.log("fruit") ;
     present[2] = true; 
  }
  }
  for (let w = 0; w < grainLen; w++) {
    let check = grain[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
     console.log("grain") ;
     present[3] = true;
  }
  }
  for (let w = 0; w < dairyLen; w++) {
    let check = dairy[w];
    var checker = scanner.localeCompare(check);
    if (checker == 0 ){
    console.log(check, scanner, checker) 
     console.log("dairy") ;
     present[4] = true;
  }
  }
} }

// variables for printing
var present_print = ""; 
var missing_print = ""; 
var presentLen = present.length ; 

//count used to see if nothing is missing
var count = 0;

export default function Missing() {
  for (let i = 0; i < presentLen; i++) {
      if (present[i] == true) {
        present_print = present_print + words[i] + "\n";
        count = count + 1;
      }
      else {
        missing_print = missing_print + words[i] + "\n";
      }
  }
  if (count == 5) {
    missing_print = "Wow! Good Job! What a healthy meal!"
  } else {
    missing_print = "Missing: " + "\n" + missing_print
  }
  
  return(
    <View style = {styles.container}>
    <Text style={styles.baseText}>
    <Text style={styles.presentText}>Present: {"\n"}</Text>
    <Text style={styles.presentText}>{present_print + "\n"}</Text>
    <Text style={styles.missingText}>{missing_print}</Text>
    </Text>
    <Image source = {logo} style = {{width: 425, height:425,backgroundColor:"pink",}}/>
    </View>
    )
}

const styles = StyleSheet.create({
  contatiner:{
    backgroundColor:"hotpink",
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
    fontSize: 30,
    fontWeight: 'bold',
    color: "green", 
    height: 50

  },
  missingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "indianred", 
    height: 50,

  },
});
