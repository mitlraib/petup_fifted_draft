// SwipePage.js

import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import Swiper from 'react-native-deck-swiper';  // Import the Tinder-like swiper

import { titles } from '../src/menu/headers';
import colors from '../src/utils/colors';
import defaultImage from '../../assets/images/poxi.jpeg';
import arrowImage from '../../assets/images/upArrow.png'; 
import menuLineIconImage from '../../assets/images/menuLineIcon.jpg'; 
import searchIconImage from '../../assets/images/searchIcon.png'; 


const { width, height } = Dimensions.get('window');

const SwipePage = () => {
  const {
    dogName = "פוקסי",
    description = "פוקסי שלנו לא למסירה אבל היא הכי חמודה בעולם",
    ageInNumbers = "8",
    location = "פתח תקווה",
    maleChecked = "true",
    femaleChecked = "false",
    houseChecked = "true",
    gardenChecked = "false",
    trainedChecked = "true",
    untrainedChecked = "false",
    vaccinatedChecked = "true",
    notVaccinatedChecked = "false",
    needsChecked = "true",
    noNeedsChecked = "false",
    largeChecked = "false",
    mediumChecked = "true",
    smallChecked = "false",
    spayedChecked = "false",
    notSpayedChecked = "true",
    monthsChecked = "true",
    yearsChecked = "false",
    contactName = "מיטל",
    contactPhoneNumber = "0522096672",
    selectedBreeds = "מעורב, שנאוצר",
    image = defaultImage
  } = useLocalSearchParams(); // קבלת הפרמטרים מניווט

  const [menuClicked, setMenuClicked] = useState(false);
  const router = useRouter();
  const [dogs, setDogs] = useState([]);


  const handleArrowPress = () => {
    
    router.push({
      pathname: 'newDogsInformation/NewDogsInformation',
      params: {
        dogName, description, ageInNumbers, location, maleChecked, femaleChecked,
        houseChecked, gardenChecked, trainedChecked, untrainedChecked,
        vaccinatedChecked, notVaccinatedChecked, needsChecked, noNeedsChecked,
        largeChecked, mediumChecked, smallChecked, spayedChecked, notSpayedChecked, monthsChecked,
        yearsChecked, contactName, contactPhoneNumber, selectedBreeds, image
      }
    });

  };

  const whenMenuClicked = () => {
    setMenuClicked(!menuClicked);
  };

  const whenLikedClicked = () => {
    

  };  

  const handleMenuItemPress = (title) => {
    if (title === "יש לי כלב/ה למסור") {
      whenMenuClicked();
      router.navigate('applicationForm/ApplicationFormPage');
    }
    else if (title === "כלבים שסימנתי בלייק") {
      whenMenuClicked();
    router.navigate('myLikedDogs/MyLikedDogs');
    }
    else if (title === "אודות") {
    whenMenuClicked();
  router.navigate('aboutPage/AboutPage');
    }
    
    else if (title === "הפרופיל שלי") {
  whenMenuClicked();
router.navigate('myProfile/MyProfile');
} 
    
    else {
      Alert.alert(`בחרת את הכותרת: ${title}`);
    }
  };

  if (!dogName || !description || !ageInNumbers || !location) {
    return <Text>Some required information is missing.</Text>;
  }


  useEffect(() => {
    addDog({
      dogName, description, ageInNumbers, location, maleChecked, femaleChecked, houseChecked,
      gardenChecked, trainedChecked, untrainedChecked, vaccinatedChecked, notVaccinatedChecked,
      needsChecked, noNeedsChecked, largeChecked, mediumChecked, smallChecked, spayedChecked,
      notSpayedChecked, monthsChecked, yearsChecked, contactName, contactPhoneNumber, selectedBreeds, image
    });
  }, [dogName, description, ageInNumbers, location, maleChecked, femaleChecked, houseChecked,
    gardenChecked, trainedChecked, untrainedChecked, vaccinatedChecked, notVaccinatedChecked,
    needsChecked, noNeedsChecked, largeChecked, mediumChecked, smallChecked, spayedChecked,
    notSpayedChecked, monthsChecked, yearsChecked, contactName, contactPhoneNumber, selectedBreeds, image]);

  const addDog = (newDog) => {
    setDogs(prevDogs => [
      ...prevDogs,
      {
        ...newDog,
        image: newDog.image || defaultImage // הגדרת תמונת ברירת מחדל
      }
    ]);
  };

  const renderCard = (dog) => {
    if (!dog) {
      return <Text>Dog data is not available.</Text>;
    }

    return (
      <View style={styles.card}>
        <Image source={dog.image ? dog.image : defaultImage} style={styles.image} />
        <Pressable style={styles.arrowButton} onPress={handleArrowPress}>
          <Image source={arrowImage} style={styles.arrowIcon} />
        </Pressable>
        <Text style={styles.imageName}>❤️ {dog.dogName} ❤️</Text>

        <View style={styles.tagsContainer}>
          <Text style={styles.tagsContainerText}>גיל: {dog.ageInNumbers}</Text>
          {(dog.monthsChecked === "true") ? (<Text style={styles.tagsContainerText}>חודשים</Text>) : (<Text style={styles.tagsContainerText}>שנים</Text>)}
        </View>

        {(dog.femaleChecked === "true") ? (<Text style={styles.tagsContainerText}>מין:  נקבה</Text>) : (<Text style={styles.tagsContainerText}>מין:  זכר</Text>)}

        <Text style={styles.tagsContainerText}>מיקום בארץ: {dog.location}</Text>
        <Text style={styles.tagsContainerText}>גזע: {dog.selectedBreeds}</Text>
      
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={whenMenuClicked} style={styles.menuIconContainer}>
          <Image
            source={menuLineIconImage}
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
              source={searchIconImage}
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
      </View>

      <Swiper 
        cards={dogs}
        renderCard={renderCard}
        onSwiped={(cardIndex) => { console.log('Swiped card at index:', cardIndex); }}
        onSwipedAll={() => { console.log('All cards swiped!'); }}
        cardIndex={0}
        backgroundColor={colors.purpleIsh}
        stackSize={3}
      />

      {menuClicked && (
        <View style={styles.menu}>
          <Pressable onPress={whenMenuClicked}>
            <Text style={styles.xStyleText}>X</Text>
          </Pressable>
          {titles.map((title, index) => (
            <Pressable key={index} onPress={() => handleMenuItemPress(title)}>
              <Text style={styles.menuText}>- {title}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purpleIsh,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 6,
    zIndex: 6, // Make sure the header is above other components
  },
  menuIconContainer: {
    width: 40,
    height: 40,
  },
  menuIcon: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 10,
    marginLeft:20
  },
  searchStyle: {
    height: 30,
    width: 200,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 6,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginLeft: 6,
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width / 2,
    height: height,
    backgroundColor: 'white',
    padding: 10,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 7, // Ensure the menu is on top of everything
  },
 
  xStyleText: {
    color: "purple",
    fontSize: 22,
    marginLeft:10
  },
  menuText: {
    fontSize: 18,
    marginVertical: 5,
    paddingTop:20
  },
  card: {
    width: 370,
    height:560,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginTop:60,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 5,
  },
  imageName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  imageDescribe: {
    fontSize: 16,
    marginVertical: 5,
  },
  tagsContainer: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tagsContainerText: {
    fontSize: 14,
    color: colors.textColor,
    margin: 5,
  },
  arrowButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  arrowIcon: {
    width: '100%',
    height: '100%',
  },
});

export default SwipePage;

