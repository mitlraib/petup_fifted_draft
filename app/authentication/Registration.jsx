import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

import { colors } from '../src/utils/colors';
import { fontSizes, spacing } from '../src/utils/sizes';
import { Login } from './Login';
import eyeIconImage from '../../assets/images/eye.png';
import englishIconImage from '../../assets/images/americanFlag.jpg';
import { useAuth } from '../src/context/AuthContext';


export const Registration = ({ }) => {
  const [english, setEnglish] = useState(false);
  const [hebrew, setHebrew] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [tel, setTel] = useState('');
  const [experience, setExperience] = useState('');
  const [aboutYou , setAboutYou] = useState('');

  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');
  const [PasswordMessage, setPasswordMessage] = useState('');
  const [mailMessage, setMailMessage] = useState('');
  const [telMessage, setTelMessage] = useState('');


  const [login, setLogin] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {register: _register, user} = useAuth()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  useEffect(() => {
    if (user) {
      router.navigate('/swipepage/SwipePage')
    }
  },[user])

  const englishPress = () => {
    setEnglish(true);
    setHebrew(false);  };

  const hebrewPress = () => {
    setHebrew(true);
    setEnglish(false);  };

  // הפיכת מספר הטלפון למספרים בלבד:
  const handleTelChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setTel(numericText);
  };

  const validateFields = () => {
    let isValid=true
  


  // ולידציה של שם :
    if (!(firstName.length>1)) {
      isValid = false
      
      if (firstName.length < 1) {
        {hebrew ? (setFirstNameMessage('נא למלא שם פרטי ')):(setFirstNameMessage( 'Please fill your first name!')) }
      }
      if (0<firstName.length < 2) {
        {hebrew ? (setFirstNameMessage('השם הפרטי שלך קצר מדי!')):(setFirstNameMessage( 'Your first name is too short!')) }
      }
    }

    if (!(lastName.length>1)) {
      isValid = false
      
      
      if (lastName.length < 1) {
        {hebrew ? (setLastNameMessage('נא למלא שם משפחה ')):(setLastNameMessage( 'Please fill your last name!')) }
      }
      if (0<lastName.length < 2) {
        {hebrew ? (setLastNameMessage('השם משפחה שלך קצר מדי!')):(setLastNameMessage( 'Your last name is too short!')) }
      }
    }

  // ולידציה של סיסמה:
    if (!(password.length > 6 && password.length <= 30)) {
      isValid = false
      if (password.length < 7) { 
        {hebrew ? (setPasswordMessage('הסיסמה חייבת להיות מעל 6 ספרות!')) :
          (setPasswordMessage('Password must include more than 6 charecters...'))}
      }
      if (password.length > 30) {
        { hebrew ? (setPasswordMessage('אופסס.. הסתחררנו... לסיסמה שלך יש יותר מדי ספרות...')) :
          (setPasswordMessage('Your password is too long!'))}
    }
    }
    
    
  // ולידציה של מייל:
  if (!(mail.includes("@"))) {
    isValid = false
    {hebrew ? (setMailMessage('אופס.. נראה לנו שהמייל שלך לא תקין...')) :
      setMailMessage('Your mail is unvalid!')}
  }

    // ולידציה של מספר טלפון:
    if (!((tel.length === 9 || tel.length === 10) && tel[0] === '0')) {
      
      isValid = false

      if (tel.length < 9) {
        {hebrew ? (setTelMessage('אופס.. נראה לנו שחסר לך כמה ספרות..')) :
           (setTelMessage('This number is too short!'))}
      } 

      if (tel.length > 10) {
        {hebrew ? ('אופס.. נראה לנו שיש לך כמה ספרות מיותרות כאן..'):('This number is too long!')}
      }

      if (tel[0] !== '0') {
        { hebrew ? ('שים לב! מספר הטלפון חייב להתחיל בספרה 0!') : ('phone number must start with 0 !') }
      }
    }


    return isValid
  }

  const register = async (e) => {
    e.preventDefault()
  
    console.log(validateFields())
    if (validateFields()) {
    if (!registered) {
      setRegistered(true);
    }
   
    try {
      await _register({
        firstName,
        lastName,
        password,
        email:mail,
        tel,
        experience,
        aboutYou
      })
      setRegistered(true)
      Alert.alert(
        hebrew ?"הצלחה":"Success"
      )
    } catch (error) {
      console.error(error)
    }

      router.navigate('/Login');

    }

    else {
      alert("nooo!");

      errorMessagesFields();

    }
  };

  const moveToLogin = () => {
    if (!login) {
      setLogin(true);
    }
  };


  return (
    <View style={styles.container}>
      {!login ? (
        <>
          <View>

          <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end', paddingRight: 15 }}>
            <Text onPress={hebrewPress}>עב </Text>
            <Text>  |</Text>
              <Pressable
                onPress={englishPress}>
              <Image source={englishIconImage} style={{ width: 20, height: 20 }}/>
            </Pressable>
          </View>
          
            {/* כותרת */}
          <Text style={styles.welcomeText}>{hebrew ? "הרשמה בקלות ובמהירות: " : "Register:"}</Text>
      
          
            
            {/* שם משתמש */}
            <View style={styles.textInput_wrapper}>

            <TextInput
                id='firstName'
                style={[styles.textInput,{textAlign: hebrew? "right" : "left"}]}
                onChangeText={setFirstName}
                autoComplete='given-name'
                placeholder={hebrew?"שם פרטי:":"First name:"}
              />
            </View>
            
            <Text style={styles.messageText}>{firstNameMessage}</Text>


           <View style={styles.textInput_wrapper}>

              <TextInput
                id='lastName'
                style={[styles.textInput,{textAlign: hebrew? "right" : "left"}]}
                onChangeText={setLastName}
                placeholder={hebrew ? "שם משפחה:" : "Last name:"}
                autoComplete='family-name'
              />
              
            </View>
            <Text style={styles.messageText}>{lastNameMessage}</Text>

            
           
            {/* סיסמה */}
            <View style={styles.textInput_wrapper}>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  id='Password'
                    style={[styles.password, {textAlign: hebrew? "right" : "left"}]}
                  onChangeText={setPassword}
                    placeholder={hebrew?"סיסמה:":"Password:"}
                  secureTextEntry={!showPassword}
                />
                 {/* כפתור הצגת/הסתרת סיסמה */}
                <Pressable onPress={toggleShowPassword}>
                  <Image
                    source={eyeIconImage}
                    style={{ width: 30, height: 30, marginTop: spacing.lg}}
                  />
                </Pressable>
              </View>
              <Text style={styles.messageText}>{PasswordMessage}</Text>
              </View>
            

            {/* מייל */}
            <View style={styles.textInput_wrapper}>

              <TextInput
                id='mail'
                style = {[ styles.textInput ,{ textAlign: hebrew?"right":"left"}]}
                onChangeText={setMail}
                placeholder={hebrew? "אימייל: ": "Email:" }
            
              />
           
           <Text style={styles.messageText}>{mailMessage}</Text>
           </View>

            
            {/* מספר טלפון */}
            <View style={styles.textInput_wrapper}>

         <TextInput
                id='tel'
                style={[styles.textInput, { textAlign: hebrew ? "right" : "left" }]}
                onChangeText={handleTelChange}
                keyboardType="numeric"
                value={tel}
                placeholder={hebrew ? "טלפון:" : "tel:"}
              />
             
             <Text style={styles.messageText}>{telMessage}</Text>
             </View>
            
{/* ניסיון */}
<View style={styles.textInput_wrapper}>

<TextInput
    id='Experience'
    style={[styles.textInput,{textAlign: hebrew? "right" : "left"}]}
    onChangeText={setExperience}
    placeholder={hebrew?" ניסיון עם כלבים:":"Experience with dogs:"}
  />
 </View>

            
                       
{/* תיאור עצמי  */}
<View style={styles.textInput_wrapper}>

<TextInput
    id='AboutYou'
    style={[styles.textInput,{textAlign: hebrew? "right" : "left"},{height:75}]}
    onChangeText={setAboutYou}
    placeholder={hebrew?" משהו נוסף שתרצה לספר לנו על עצמך:":"Anything else you would like to  tell us about yourself:"}
  multiline={true}
              />
 </View>
            

            {/* כפתור שליחה */}

        
            <View style={{ paddingLeft: hebrew? 150 : 100 }}>
              <Pressable
                onPress={register}
                  style={[styles.button, { width: hebrew? 75 :85}]}
              >
                <Text style={styles.registerText}
                > {hebrew ? "הרשם!" : "Register!"} </Text>
              </Pressable>
            </View>



           
            {/* חזרה להתחברות */}

            <View style={{ flexDirection:hebrew? "row-reverse":"row", alignSelf:'center' }}>
              <Text style={styles.login}> {hebrew?"כבר יש לך חשבון אצלנו?": " Already have an account? "}  </Text> 
              <Pressable onPress={moveToLogin} style={styles.loginButton}>
                <Text style={styles.login}> {hebrew?" התחברות לאזור האישי": "Login"}</Text>
              </Pressable>
            </View>
              
          </View>
        </>
      ) : (
        <View>
          <Login />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purpleIsh,
  },
  welcomeText: {
    fontSize: fontSizes.xxl,
    textAlign: 'center',
    marginBottom: 25
  },
  textInput: {
    marginTop: spacing.sm,
    width: 200,
    fontSize: 12,
    textAlign: 'right',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: colors.pinkIsh,
    paddingHorizontal: 10,
    color: colors.black,
  },
  textInput_wrapper: {
    marginTop: spacing.sm,
    fontSize: 12,
    alignItems:'center'
  },
  password: {
    marginTop: spacing.md,
      width: 200,
      fontSize: 12,
    textAlign: 'right',
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: colors.pinkIsh,
      paddingHorizontal: 10,
  marginLeft:30
  },
  messageText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'right',
    flexWrap: 'nowrap',
  },
  login: {
     paddingTop: spacing.sm,
    fontSize: 13,
    color: colors.white
  },
  registerText: {
    color: "purple",
    fontSize: 17,
    textAlign: 'center' 
  },
  button: {
    marginTop: spacing.lg,
    width: 75,
    height: 35,
    paddingTop: 5,
      backgroundColor: colors.white
  },
 
 
});

export default Registration;
