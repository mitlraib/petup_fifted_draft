
//ApplicationFormPage.js
import colors from '@/app/src/utils/colors';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Image, Pressable, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system'
import axios from 'axios';
import { ServerIP } from '@/constants/Network';
import { uploadImage } from '@/firebase/storage';

export const ApplicationFormPage = () => {

  // שדות פתוחים
  const [dogName, setDogName] = useState("");
  const [description, setDescription] = useState("");
  const [ageInNumbers, setAgeInNumbers] = useState("");
  const [location, setLocation] = useState("");

  // כפתור נלחץ 
  const [buttonSendClicked, setButtonSendClicked] = useState(false);
  const [buttonSendValid, setButtonSendValid] = useState(false);


  // מצבי צ'קבוקסים
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);

  const [houseChecked, setHouseChecked] = useState(false);
  const [gardenChecked, setGardenChecked] = useState(false);

  const [trainedChecked, setTrainedChecked] = useState(false);
  const [untrainedChecked, setUntrainedChecked] = useState(false);

  const [vaccinatedChecked, setVaccinatedChecked] = useState(false);
  const [notVaccinatedChecked, setNotVaccinatedChecked] = useState(false);

  const [needsChecked, setNeedsChecked] = useState(false);
  const [noNeedsChecked, setNoNeedsChecked] = useState(false);

  const [largeChecked, setLargeChecked] = useState(false);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [smallChecked, setSmallChecked] = useState(false);

  const [size, setSize] = useState('');

  const [spayedChecked, setSpayedChecked] = useState(false);
  const [notSpayedChecked, setNotSpayedChecked] = useState(false);

  const [monthsChecked, setMonthsChecked] = useState(false);
  const [yearsChecked, setYearsChecked] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");


  // שדות שלא מולאו:
  const [dogNameUnfil, setDogNameUnfil] = useState("");
  const [descriptionUnfil, setDescriptionUnfil] = useState("");
  const [ageInNumbersUnfil, setAgeInNumbersUnfil] = useState("");
  const [locationUnfil, setLocationUnfil] = useState("");

  const [sexCheckedUnfil, setSexCheckedUnfil] = useState("");
  const [houseCheckedUnfil, setHouseCheckedUnfil] = useState("");
  const [trainedCheckedUnfil, setTrainedCheckedUnfil] = useState("");
  const [vaccinatedCheckedUnfil, setVaccinatedCheckedUnfil] = useState("");
  const [needsCheckedUnfil, setNeedsCheckedUnfil] = useState("");
  const [sizeCheckedUnfil, setSizeCheckedUnfil] = useState("");
  const [spayedCheckedUnfil, setSpayedCheckedUnfil] = useState("");
  const [monthsCheckedUnfil, setMonthsCheckedUnfil] = useState("");
  const [breedsUnfil, setBreedsUnfil] = useState("");
  const [imageUnfil, setImageUnfil] = useState("");
  const [contactNameUnfil, setContactNameUnfil] = useState("");
  const [contactPhoneNumberUnfil, setContactPhoneNumberUnfil] = useState("");



  const [isBreedDropdownVisible, setBreedDropdownVisible] = useState(false);
  const [selectedBreeds, setSelectedBreeds] = useState([]);


  const [imageUri, setImageUri] = useState(null);

  const [descriptionCharectersCounter, setDescriptionCharectersCounter] = useState(0)

  const router = useRouter();


  const renderCheckbox = (isChecked, onChange) => (
    <TouchableOpacity
      style={styles.checkbox}
      onPress={onChange}>
      {isChecked && <View style={styles.checked} />}
    </TouchableOpacity>
  );


  const toggleBreedSelection = (breed) => {
    if (selectedBreeds.includes(breed)) {
      setSelectedBreeds(selectedBreeds.filter((item) => item !== breed));
    } else {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  };

  useEffect(() => {
    if (description.length > 0) {
      setDescriptionCharectersCounter(description.length)
    }
    // בצע פעולה כאשר `description` משתנה
  }, [description]);

  const handleSend = () => {

    if (buttonSendClicked) return;  // אם הכפתור כבר נלחץ, אין לבצע שוב את השליחה

    if (!buttonSendValid) {
      if ((!femaleChecked) && (!maleChecked)) {
        setSexCheckedUnfil("נא למלא את מין הכלב   ")
      }

      else if ((dogName == "")) {
        setDogNameUnfil("נא למלא את שם הכלב")
      }

      else if ((selectedBreeds.length === 0)) {
        setBreedsUnfil("נא למלא את גזע הכלב")
      }

      else if ((!trainedChecked) && (!untrainedChecked)) {
        setTrainedCheckedUnfil("נא למלא את רמת אילוף הכלב")
      }

      else if ((!vaccinatedChecked) && (!notVaccinatedChecked)) {
        setVaccinatedCheckedUnfil("נא למלא את רמת חיסון הכלב")
      }

      else if ((!spayedChecked) && (!notSpayedChecked)) {
        setSpayedCheckedUnfil("נא למלא את רמת סירוס הכלב")
      }

      else if ((!largeChecked) && (!mediumChecked) && (!smallChecked)) {
        setSizeCheckedUnfil("נא למלא את גודל הכלב")
      }

      else if ((!houseChecked) && (!gardenChecked)) {
        setHouseCheckedUnfil("נא למלא את הרגלי הכלב")
      }
      else if ((!needsChecked) && (!noNeedsChecked)) {
        setNeedsCheckedUnfil("נא למלא את חינוך  הכלב")
      }

      else if (!ageInNumbers) {
        setAgeInNumbersUnfil("נא למלא את גיל הכלב")
      }
      else if ((!yearsChecked) && (!monthsChecked)) {
        setMonthsCheckedUnfil("נא למלא את חודשי  הכלב")
      }
      else if (description == "") {
        setDescriptionUnfil("נא למלא את תיאור הכלב")
      }
      else if (location == "") {
        setLocationUnfil("נא למלא את מיקום הכלב")
      }


      else if (contactName == "") {
        setContactNameUnfil("נא למלא את שם איש הקשר  ")
      }

      else if (!contactPhoneNumber) {
        setContactPhoneNumberUnfil("נא למלא את מספר הטלפון של איש הקשר ")
      }

      else if (imageUri == null) {
        setImageUnfil("נא למלא את תמונת הכלב")
      }
      else { setButtonSendValid(true) }

    }

    else {
      if (largeChecked) {
        setSize("large")
      }
      if (mediumChecked) {
        setSize("medium")
      }
      if (smallChecked) {
        setSize("small")
      }

      setButtonSendClicked(true);  // הגדר את הכפתור כ"לחוץ" כדי למנוע לחיצה כפולה
      //לבדוק:
      insertDogInfo();

      setDogName(""); setDescription(""); setAgeInNumbers("");
      setLocation(""); setButtonSendClicked(false); setButtonSendValid(false);
      setMaleChecked(false); setFemaleChecked(false); setHouseChecked(false); setGardenChecked(false);
      setTrainedChecked(false); setUntrainedChecked(false); setVaccinatedChecked(false);
      setNotVaccinatedChecked(false); setNeedsChecked(false); setNoNeedsChecked(false);
      setLargeChecked(false); setMediumChecked(false); setSmallChecked(false);
      setSpayedChecked(false); setNotSpayedChecked(false); setMonthsChecked(false);
      setYearsChecked(false); setContactName(""); setContactPhoneNumber("");
      setSelectedBreeds([]); setImageUri(null);
      setDogNameUnfil(""); setDescriptionUnfil("");
      setAgeInNumbersUnfil(""); setLocationUnfil(""); setSexCheckedUnfil("");
      setHouseCheckedUnfil(""); setTrainedCheckedUnfil(""); setVaccinatedCheckedUnfil("");
      setNeedsCheckedUnfil(""); setSizeCheckedUnfil(""); setSpayedCheckedUnfil("");
      setMonthsCheckedUnfil(""); setContactNameUnfil(""); setContactPhoneNumberUnfil("");
      setBreedsUnfil(""); setImageUnfil(""); setDescriptionCharectersCounter(0)
    }
  };


  



  const insertDogInfo = async () => {
    try {
      //לבדוק!
        // המרת התמונה ל-blob בעזרת fetch
      const response = await fetch(imageUri);
      const blob = await response.blob();
    
      const imageUrl = await uploadImage(blob, "dogImage1")
      const body = {
        name: dogName,
        location,
        description,
        age: ageInNumbers,
        male: maleChecked,
        indoor: houseChecked,
        trained: trainedChecked,
        vaccinated: vaccinatedChecked,
        pottyTrained: needsChecked,
        sterilized: spayedChecked,
        puppy: monthsChecked,
        breed: selectedBreeds,
        size,
        image: imageUrl.replace("localhost", ServerIP).replace("127.0.0.1",ServerIP ),
        contactName,
        contactTel: contactPhoneNumber,
      }
      const resposnt = await axios.post(`http://${ServerIP}:5000/api/dog/dog`, body)
      if (resposnt.status === 201) {
        Alert.alert("הצלחה")
        router.navigate('swipepage/SwipePage');
      }

    } catch (error) {
      console.log(error)
    }



  };




  const returnToMainPaige = () => {
    router.navigate('swipepage/SwipePage');
  }


  return (
    <ImageBackground
      source={{ uri: 'https://marketplace.canva.com/EAFKY9-Frd0/1/0/900w/canva-purple-cute-dog%27s-paw-and-bone-seamless-phone-wallpaper-U_g_N0rsOTw.jpg' }}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>

        <Pressable
          onPress={returnToMainPaige}
        >

          <Text style={styles.X}>חזרה לדף הראשי ללא שמירת הנתונים X  </Text>
        </Pressable>

        <Text style={styles.title}>טופס מסירה</Text>


        <TextInput
          style={styles.textInput}
          onChangeText={setDogName}
          placeholder="שם הכלב\ה: "
          value={dogName}
        />

        <Text style={styles.warningText}>{dogNameUnfil}</Text>

        {/* בחירת גזע */}
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => setBreedDropdownVisible(!isBreedDropdownVisible)}
        >
          <Text style={styles.breedPlaceholder}>
            {selectedBreeds.length === 0 ? 'בחר גזע:' : selectedBreeds.join(', ')}
          </Text>
        </TouchableOpacity>

        {isBreedDropdownVisible && (
          <View style={styles.breedDropdown}>
            {['מעורב', 'אלסקן מלמוט', 'אמסטף', 'אקיטה', 'בולדוג', 'בולי', 'בורדר קולי', 'ביגל', 'גק ראסל טרייר', 'גולדן רטריבר',
              'גרייהאונד', 'דוברמן', 'דלמטי', 'דני ענק', 'האסקי סיבירי', 'טרייר', 'יורקשייר טרייר',
              'כלב כנעני', 'כלב מים פורטוגזי', 'כלב מלטזי', 'כלב ציד איטלקי', 'כלב ציד ארטואה', 'כלב ציד גרמני',
              'לברדור', 'לברדור רטריבר', 'מסטיף', 'סמויד', 'ניופאונדלנד', 'סן ברנרד', 'ספינונה איטלקי',
              'ספניאל', 'סקי טרייר', 'פאג', 'פודל', 'פיטבול', 'פינצר', 'פקינז', 'פומרניאן', 'צאו צאו', 'ציוואווה', 'קומונדור',
              'רוטוויילר', 'רועה אוסטרלי', 'רועה בלגי', 'רועה', 'שי טסו', 'שיבה אינו', 'שנאוצר', 'שפיץ', 'תחש', 'אחר'
            ].map((breed) => (
              <TouchableOpacity
                key={breed}
                onPress={() => toggleBreedSelection(breed)}
                style={styles.breedOption}
              >
                <Text style={styles.breedOptionText}>{breed}</Text>
                {selectedBreeds.includes(breed) && <Text style={styles.breedOptionText}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.warningText}>{breedsUnfil}</Text>


        <View style={styles.row}>
          {renderCheckbox(maleChecked, () => {
            setMaleChecked(!maleChecked);
            setFemaleChecked(false);
          })}
          <Text style={styles.optionText}>                                זכר   </Text>

          {renderCheckbox(femaleChecked, () => {
            setFemaleChecked(!femaleChecked);
            setMaleChecked(false);
          })}
          <Text style={styles.optionText}>   נקבה        </Text>
        </View>

        <Text style={styles.warningText}>{sexCheckedUnfil}</Text>


        <View style={styles.row}>
          {renderCheckbox(trainedChecked, () => {
            setTrainedChecked(!trainedChecked);
            setUntrainedChecked(false);
          })}
          <View>

            {maleChecked ? (<Text style={styles.optionText}>                           מאולף  </Text>) :
              (<Text style={styles.optionText}>                        מאולפת   </Text>)}
          </View>
          {renderCheckbox(untrainedChecked, () => {
            setUntrainedChecked(!untrainedChecked);
            setTrainedChecked(false);
          })}
          {maleChecked ? (<Text style={styles.optionText}>לא מאולף    </Text>) :
            (<Text style={styles.optionText}>לא מאולפת </Text>)}
        </View>
        <Text style={styles.warningText}>{trainedCheckedUnfil}</Text>


        <View style={styles.row}>
          {renderCheckbox(vaccinatedChecked, () => {
            setVaccinatedChecked(!vaccinatedChecked);
            setNotVaccinatedChecked(false);
          })}
          {maleChecked ? (<Text style={styles.optionText}>                          מחוסן    </Text>) :
            (<Text style={styles.optionText}>                         מחוסנת   </Text>)}
          {renderCheckbox(notVaccinatedChecked, () => {
            setNotVaccinatedChecked(!notVaccinatedChecked);
            setVaccinatedChecked(false);
          })}
          {maleChecked ? (<Text style={styles.optionText}>לא מחוסן     </Text>) :
            (<Text style={styles.optionText}>לא מחוסנת </Text>)}
        </View>
        <Text style={styles.warningText}>{vaccinatedCheckedUnfil}</Text>

        <View style={styles.row}>
          {renderCheckbox(spayedChecked, () => {
            setSpayedChecked(!spayedChecked);
            setNotSpayedChecked(false);
          })}
          {maleChecked ? (<Text style={styles.optionText}>                          מסורס   </Text>) :
            (<Text style={styles.optionText}>                          מעוקרת  </Text>)}
          {renderCheckbox(notSpayedChecked, () => {
            setNotSpayedChecked(!notSpayedChecked);
            setSpayedChecked(false);
          })}
          {maleChecked ? (<Text style={styles.optionText}>לא מסורס    </Text>) :
            (<Text style={styles.optionText}>לא מעוקרת </Text>)}
        </View>
        <Text style={styles.warningText}>{spayedCheckedUnfil}</Text>

        <View style={styles.row}>
          {renderCheckbox(largeChecked, () => {
            setLargeChecked(!largeChecked);
            setMediumChecked(false);
            setSmallChecked(false);
          })}

          {maleChecked ? (<Text style={styles.optionText}>          גדול     </Text>) :
            (<Text style={styles.optionText}>        גדולה  </Text>)}

          {renderCheckbox(mediumChecked, () => {
            setMediumChecked(!mediumChecked);
            setLargeChecked(false);
            setSmallChecked(false);
          })}

          {maleChecked ? (<Text style={styles.optionText}>         בינוני  </Text>) :
            (<Text style={styles.optionText}>          בינונית  </Text>)}


          {renderCheckbox(smallChecked, () => {
            setSmallChecked(!smallChecked);
            setLargeChecked(false);
            setMediumChecked(false);
          })}

          {maleChecked ? (<Text style={styles.optionText}>  קטן     </Text>) :
            (<Text style={styles.optionText}> קטנה  </Text>)}


        </View>
        <Text style={styles.warningText}>{sizeCheckedUnfil}</Text>


        <View style={styles.row}>
          {renderCheckbox(houseChecked, () => {
            setHouseChecked(!houseChecked);
            setGardenChecked(false);
          })}


          {maleChecked ? (<Text style={styles.optionText}>     מתאים גם לבית </Text>) :
            (<Text style={styles.optionText}>      מתאימה גם לבית </Text>)}


          {renderCheckbox(gardenChecked, () => {
            setGardenChecked(!gardenChecked);
            setHouseChecked(false);
          })}



          {maleChecked ? (<Text style={styles.optionText}>  מתאים רק לגינה </Text>) :
            (<Text style={styles.optionText}>  מתאימה רק לגינה </Text>)}

        </View>
        <Text style={styles.warningText}>{houseCheckedUnfil}</Text>

        <View style={styles.row}>
          {renderCheckbox(needsChecked, () => {
            setNeedsChecked(!needsChecked);
            setNoNeedsChecked(false);
          })}


          {maleChecked ? (<Text style={styles.optionText}> מחונך לצרכים בחוץ</Text>) :
            (<Text style={styles.optionText}>    מחונכת לצרכים בחוץ</Text>)}


          {renderCheckbox(noNeedsChecked, () => {
            setNoNeedsChecked(!noNeedsChecked);
            setNeedsChecked(false);
          })}

          <Text style={styles.optionText}>עושה צרכים בבית</Text>
        </View>
        <Text style={styles.warningText}>{needsCheckedUnfil}</Text>


        <View style={styles.row}>
          {renderCheckbox(monthsChecked, () => {
            setMonthsChecked(!monthsChecked);
            setYearsChecked(false);
          })}
          <Text style={styles.optionText}>             חודשים </Text>

          {renderCheckbox(yearsChecked, () => {
            setYearsChecked(!yearsChecked);
            setMonthsChecked(false);
          })}
          <Text style={styles.optionText}> שנים</Text>

          <TextInput
            style={styles.ageInput}
            onChangeText={setAgeInNumbers}
            placeholder="גיל:"
            value={ageInNumbers}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flexDirection: "row-reverse" }}>

          <Text style={styles.warningText}>{ageInNumbersUnfil}</Text>
          <Text style={styles.warningText}>{monthsCheckedUnfil}</Text>

        </View>

        <TextInput
          style={styles.textInput}
          onChangeText={setLocation}
          placeholder="מיקום בארץ:"
          value={location}
        />
        <Text style={styles.warningText} >{locationUnfil}</Text>

        <Text style={styles.optionText}> תוים {descriptionCharectersCounter} </Text>

        <TextInput
          style={[styles.textInput, { height: 120 }]}
          onChangeText={setDescription}
          placeholder=" ספרו לנו על הכלב\ה שלכם: (ב 500 תוים בלבד) "
          value={description}
          maxLength={500}
          multiline={true}
        />
        <Text style={styles.warningText}>{descriptionUnfil}</Text>


        <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
          <Text style={styles.imageUploadText}>העלה תמונה</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        <Text style={styles.warningText}>{imageUnfil}</Text>

        <Text style={{ fontSize: 18, paddingBottom: 20 }} >פרטי קשר של המוסר: </Text>

        <TextInput
          style={styles.textInput}
          onChangeText={setContactName}
          placeholder="שם איש קשר:"
          value={contactName}
        />
        <Text style={styles.warningText} >{contactNameUnfil}</Text>


        <TextInput
          style={styles.textInput}
          onChangeText={setContactPhoneNumber}
          placeholder="מספר טלפון של איש קשר:"
          value={contactPhoneNumber}
          keyboardType="numeric"
        />



        <Text style={styles.warningText} >{contactPhoneNumberUnfil}</Text>


        <Pressable
          style={styles.submitButton}
          onPress={handleSend}>
          <Text style={styles.submitButtonText}>שלח\י</Text>
        </Pressable>


      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  X: {
    fontSize: 14,
    textAlign: 'left',
    color: colors.darkPurple,
    paddingTop: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    paddingTop: 25
  },

  textInput: {
    borderColor: colors.text,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: 'white',

  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,

  },
  checked: {
    width: 16,
    height: 16,
    backgroundColor: "black"
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },

  warningText: {
    fontSize: 16,
    color: "red",
    paddingBottom: 60,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,

  },
  ageInput: {
    borderColor: colors.text,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: 'white',
    width: 100,
    textAlign: 'center',
  },
  breedDropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    backgroundColor: 'white',
  },
  breedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  breedOptionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: colors.white,
    borderColor: colors.darkPurple,
    borderWidth: 1,
    width: 150,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 90,




  },
  submitButtonText: {
    color: colors.purpleIsh,
    fontSize: 18,
  },
  messageContainer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
  },
  imageUploadButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.darkPurple,
    borderWidth: 1,
    width: 200
  },
  imageUploadText: {
    color: colors.darkPurple,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default ApplicationFormPage