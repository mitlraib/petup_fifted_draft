import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TextInput, StyleSheet, Dimensions, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import { titles } from '../src/menu/headers';
import colors from '../src/utils/colors';
import defaultImage from '../../assets/images/poxi.jpeg';

const { width, height } = Dimensions.get('window');

const NewDogsInformation = () => {
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

    const whenMenuClicked = () => {
        setMenuClicked(!menuClicked);
  };  
  
  const whenLikedClicked = () => {
    //router.navigate('myLikedDogs/MyLikedDogs');
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

  const dog = dogs.length > 0 ? dogs[0] : null; // תיקון כדי להציג את המידע של הכלב הנוכחי

    return (
      <ScrollView style={styles.container}>
            
      <View style={styles.header}>
        <Pressable onPress={whenMenuClicked} style={styles.menuIconContainer}>
          <Image
            source={require('../../assets/images/menuLineIcon.jpg')}
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
              source={require('../../assets/images/searchIcon.png')}
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
      </View>

      {dog && (
        <View style={styles.card}>
          <Image source={dog.image} style={styles.image} />
          <Text style={styles.imageName}>❤️ {dog.dogName} ❤️</Text>
          <Text style={styles.imageDescribe}>{dog.description}</Text>

          <View style={styles.tagsContainer}>
            <Text style={styles.tagsContainerText}>גיל:   {dog.ageInNumbers} </Text>
            {dog.monthsChecked === "true" ? (
              <Text style={{fontSize: 16, paddingTop:10}}>חודשים</Text>
            ) : (
              <Text style={{fontSize: 16, paddingTop:10}}>שנים</Text>
            )}
          
          </View>
          <View style={styles.tagsContainer}>

          {dog.femaleChecked === "true" ? (
              <Text style={styles.tagsContainerText}>מין:  נקבה</Text>
            ) : (
              <Text style={styles.tagsContainerText}>מין:  זכר</Text>
            )}
          </View>

          <View style={styles.tagsContainer}>
            {dog.houseChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ מתאים לדירה</Text>
            ) : (
              <Text style={styles.tagsContainerText}>✔ מתאים לגינה בלבד</Text>
            )}
            {dog.trainedChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ מאולף</Text>
            ) : (
              <Text style={styles.tagsContainerText}>✔ לא מאולף</Text>
            )}
          </View>

          <View style={styles.tagsContainer}>
            {dog.vaccinatedChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ מחוסן</Text>
            ) : (
              <Text style={styles.tagsContainerText}>✔ לא מחוסן</Text>
            )}
            {dog.needsChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ מחונך לצרכים בחוץ</Text>
            ) : (
              <Text style={styles.tagsContainerText}>✔ לא חונך לצרכים בחוץ</Text>
            )}
          </View>

          <View style={styles.tagsContainer}>
            {dog.spayedChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ מסורס</Text>
            ) : (
              <Text style={styles.tagsContainerText}>✔ לא מסורס</Text>
            )}
            {dog.largeChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ גדול</Text>
            ) : dog.mediumChecked === "true" ? (
              <Text style={styles.tagsContainerText}>✔ בינוני</Text>
            ) : (
              <Text style={styles.tagsContainerText}>✔ קטן</Text>
            )}
          </View>
          <View style={{ alignSelf:'center'}}>

          <Text style={styles.tagsContainerText}>מיקום בארץ: {dog.location}</Text>
          <Text style={styles.tagsContainerText}>גזע: {dog.selectedBreeds}</Text>
          <Text style={styles.tagsContainerText}>שם איש קשר: {dog.contactName}</Text>
                  <Text style={styles.tagsContainerText}>מספר טלפון של איש קשר: {dog.contactPhoneNumber}</Text>
                
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                            onPress={router.navigate('userProfile/UserProfile')}
                        >
                            <Image
                                source={require('../../assets/images/messegeIkon.png')}
                                style={styles.messegeIcon}
                            />
                        </Pressable>

                        

              <Pressable
                  style={styles.likeButton}
                  onPress={whenLikedClicked}
              >
                  <Text style={{ fontSize: 25}}> ❤️ </Text>
              </Pressable>
          </View>
              </View>
          )}
         


      {menuClicked && (
        <View style={styles.menu}>
          <Pressable onPress={whenMenuClicked} style={styles.xstayle}>
            <Text style={styles.xStyleText}>X</Text>
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
    backgroundColor: colors.purpleIsh,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 6,
    zIndex: 6,
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
    marginLeft: 20,
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
    elevation: 7,
    zIndex: 7,
  },
  xstayle: {
    marginTop: 40,
    marginLeft: 10,

  },
  xStyleText: {
    fontSize: 20,
color: colors.purpleIsh

  },
  menuText: {
    marginTop: 20,
    fontSize: 16,
    paddingTop:20
  },
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
  imageName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding:10
  },
  imageDescribe: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  tagsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tagsContainerText: {
    fontSize: 16,
      marginRight: 10,
      textAlign:'center',
    padding:10
    },
    messegeIcon: {
        width: 35,
        height: 35,
        marginLeft:150,
       marginTop:30
      },
  
    likeButton: {
        paddingVertical: 10,
        marginBottom: 90,
       margin:20
    }
    },
);

export default NewDogsInformation;
