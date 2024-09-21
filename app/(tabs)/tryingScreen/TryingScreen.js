// TryingScreen.js

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TextInput, StyleSheet, Dimensions, Pressable, Alert,Platform  } from 'react-native';
import { useRouter } from 'expo-router';  
import { useLocalSearchParams } from 'expo-router';

import { titles } from '../menu/headers';
import colors from '../../utils/colors';
import ApplicationFormPage from '../applicationForm/ApplicationFormPage';

const { width, height } = Dimensions.get('window');

const TryingScreen = () => {
  const {
    dogName,
    description,
    ageInNumbers,
    location,
    maleChecked,
    femaleChecked,
    houseChecked,
    gardenChecked,
    trainedChecked,
    untrainedChecked,
    vaccinatedChecked,
    notVaccinatedChecked,
    needsChecked,
    noNeedsChecked,
    largeChecked,
    mediumChecked,
    smallChecked,
    spayedChecked,
    notSpayedChecked,
    monthsChecked,
    yearsChecked,
    selectedBreeds,
    image
  } = useLocalSearchParams(); // קבלת הפרמטרים מניווט

  const [dogSex, setDogSex] = useState("");
  const [house, setHouse] = useState("");
  const [trained, setTrained] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [needs, setNeeds] = useState("");
  const [size, setSize] = useState("");
  const [spayed, setSpayed] = useState("");
  const [puppy, setPuppy] = useState("");

  const [menuClicked, setMenuClicked] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const router = useRouter();
     
  useEffect(() => {
    if (femaleChecked || maleChecked) {
      setDogSex(femaleChecked ? "female" : "male");
    }
    if (houseChecked || gardenChecked) {
      setHouse(houseChecked ? "מתאים לבית" : "מתאים רק לגינה");
    }
    if (trainedChecked || untrainedChecked) {
      setTrained(trainedChecked ? "מאולף" : "לא מאולף");
    }
    if (vaccinatedChecked || notVaccinatedChecked) {
      setVaccinated(vaccinatedChecked ? "מחוסן" : "לא מחוסן");
    }
    if (needsChecked || noNeedsChecked) {
      setNeeds(needsChecked ? "עושה צרכים בבית" : "לא עושה צרכים בבית");
    }
    if (smallChecked || mediumChecked || largeChecked) {
      setSize(smallChecked ? "קטן" : mediumChecked ? "בינוני" : "גדול");
    }
    if (spayedChecked || notSpayedChecked) {
      setSpayed(spayedChecked ? "מעוקרת" : "לא מעוקרת");
    }
    if (monthsChecked || yearsChecked) {
      setPuppy(monthsChecked ? "חודשים" : "שנים");
    }
  }, [
    femaleChecked, maleChecked, houseChecked, gardenChecked, trainedChecked, untrainedChecked,
    vaccinatedChecked, notVaccinatedChecked, needsChecked, noNeedsChecked, smallChecked,
    mediumChecked, largeChecked, spayedChecked, notSpayedChecked, monthsChecked, yearsChecked
  ]);

  const whenMenuClicked = () => {
    setMenuClicked(!menuClicked);
  };

  const toggleDescription = () => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [description]: !prevState[description]
    }));
  };

  const handleMenuItemPress = (title) => {
    if (title === "יש לי כלב/ה למסור") {
      router.navigate('applicationForm/ApplicationFormPage');
    } else {
      Alert.alert(`בחרת את הכותרת: ${title}`);
    }
  };

  if (!dogName || !description || !ageInNumbers || !location) {
    return <Text>Some required information is missing.</Text>;
  }

  // useEffect(() => {
  //   console.log("Image URI:", image); // בדיקת הנתיב של התמונה
  // }, [image]);

  return (
  
    <ScrollView style={styles.container}>
       {/* 
//       <Swiper
//         showsPagination={false}
//         loop={false}
//       >
//         {dogs.map((dog, index) => (
//           <View key={index} style={styles.card}>
//             <Image
//               source={dog.uri}
//               style={styles.image}
//             />
//             <View style={styles.textContainer}>
//               <Text style={styles.imageName}>{dog.name}</Text>
//             </View>
//             <View style={styles.descriptionContainer}>
//               <Text style={styles.imageDescribe}>
//                 {expandedDescriptions[index] || dog.description.length <= 70
//                   ? dog.description
//                   : `${dog.description.substring(0, 100)}...`}
//               </Text>
//               {dog.description.length > 100 && (
//                 <Pressable onPress={() => toggleDescription(index)}>
//                   <Text style={styles.readMore}>
//                     {expandedDescriptions[index] ? "הסתר" : " קרא עוד..."}
//                   </Text>
//                 </Pressable>
//               )}
//             </View>
//             <View style={styles.tagsContainer}>
//               {dog.tag}
//             </View>
//           </View>
//         ))}
//       </Swiper> */}
      <View style={styles.header}>
        <Pressable onPress={whenMenuClicked}>
          <Image
            source={require('../../../assets/images/menuLineIcon.jpg')}
            style={styles.menuIcon}
          />
        </Pressable>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchStyle}
            placeholder={"search"}
          />
          <Pressable>
            <Image
              source={require('../../../assets/images/searchIcon.png')}
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
      </View>

      {/* <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover" // בדיקת אפשרות אחרת לשינוי הגודל
        onError={(error) => console.log("Error loading image:", error)} // הוספת הודעת שגיאה במקרה שהטעינה נכשלת
      
      /> */}
      <View style={styles.textContainer}>
        <Text style={styles.imageName}>{dogName}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.imageDescribe}>
          {expandedDescriptions[description] || description.length <= 70
            ? description
            : `${description.substring(0, 100)}...`}
        </Text>
        
        {description.length > 100 && (
          <Pressable onPress={toggleDescription}>
            <Text style={styles.readMore}>
              {expandedDescriptions[description] ? "הסתר" : " קרא עוד..."}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.tagsContainer}>
        <Text>Age: {ageInNumbers}</Text>
        <Text>Location: {location}</Text>
        <Text>Sex: {dogSex}</Text>
        <Text>House: {house}</Text>
        <Text>Trained: {trained}</Text>
        <Text>Vaccinated: {vaccinated}</Text>
        <Text>Needs: {needs}</Text>
        <Text>Size: {size}</Text>
        <Text>Spayed: {spayed}</Text>
        <Text>Puppy: {puppy}</Text>
        <Text>Race: {selectedBreeds}</Text>
      </View>

      {menuClicked && (
        <View style={styles.menu}>
          <Pressable onPress={whenMenuClicked} style={styles.xstayle}>
            <Text style={{ color: "purple", fontSize: 18, textAlign: 'center' }}>X</Text>
          </Pressable>
          {titles.map((title, index) => (
            <Pressable key={index} onPress={() => handleMenuItemPress(title)}>
              <Text style={styles.menuText}>- {title}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 5,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 5
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#e8e8e8',
    zIndex: 5
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    zIndex: 5
  },
  searchStyle: {
    width: 180,
    height: 40,
    backgroundColor: colors.pinkIsh,
    paddingHorizontal: 10,
    zIndex: 5
  },
  searchIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.lightGrey,
    zIndex: 9,
  },
  image: {
    backgroundColor:"white",
      width: Platform.OS === 'web' ? '50%' : 300, // Use percentage in web, fixed size in mobile
      height: 300, // This can be dynamically adjusted as well
      borderRadius: 10,
    marginTop: 30,
      alignSelf:'center',
      zIndex: 6
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    zIndex: 5
  },
  imageName: {
    fontSize: 20,
    color: 'black',
    marginLeft: 5,
    marginRight: 5,
    zIndex: 5
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    zIndex: 5
  },
  imageDescribe: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    zIndex: 5
  },
  tagsContainer: {
    marginTop: 20,
    zIndex: 5
  },
  menu: {
    width: width / 2,
    height: height,
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 5
  },
  menuText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    zIndex: 5
  },
  readMore: {
    color: 'blue',
    marginTop: 5,
    zIndex: 5
  },
  xstayle: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top: 30,
    zIndex: 6
  },
});

export default TryingScreen;
