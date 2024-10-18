import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';


import { Registration } from './Registration';
import { colors } from '../src/utils/colors';
import { spacing } from '../src/utils/sizes';
import { storeData, storeString } from '../src/utils/storage';

import { fontSizes } from '../src/utils/sizes';
import eyeIconImage from '../../assets/images/eye.png';
import englishIconImage from '../../assets/images/americanFlag.jpg';
import { useAuth } from '../src/context/AuthContext';



export const Login = () => {
  const [english, setEnglish] = useState(false);
  const [hebrew, setHebrew] = useState(true);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(true);
  const router = useRouter()
  const {login, user} = useAuth()


  useEffect(() => {
    if (user) {
      router.navigate('/swipepage/SwipePage')
    }
  },[user])

  const handleLogin = async () => {
    try {
      await login(mail,password)
    } catch (error) {
      console.error(error)
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const englishPress = () => {
    setEnglish(true);
    setHebrew(false);
  };

  const hebrewPress = () => {
    setHebrew(true);
    setEnglish(false);
  };

  const register = () => {
    setRegistered(!registered);
  };

  return (
    <View style={styles.container}>

      {registered ? (

        <View style={styles.innerContainer}>

          <View style={{ flexDirection: 'row-reverse', alignSelf: 'flex-end', paddingRight: 15 }}>
            <Text onPress={hebrewPress}>עב </Text>
            <Text>  |</Text>
            <Pressable onPress={englishPress}>
              <Image source={englishIconImage} style={{ width: 20, height: 20 }}/>
            </Pressable>
          </View>

          <Text style={styles.welcomeText}> {hebrew ? "כניסה לאיזור האישי:" : "Login:"}</Text>


          {/* Mail */}
          <TextInput
            style={[styles.textInput, { textAlign: hebrew? "right" :"left"}]}
            onChangeText={setMail}
            placeholder={hebrew ? ":אימייל" : "mail:"}
            value={mail}
          />
          

          {/* Password: */}
          <View style={{ flexDirection: 'row', paddingLeft: 25 }}>
         <TextInput
              style={[styles.textInput, { textAlign: hebrew? "right" :"left"}]}
              onChangeText={setPassword}
              placeholder={hebrew ? ":סיסמה" : "password:"}
              secureTextEntry={!showPassword}
              value={password}
            />
            
            <Pressable onPress={toggleShowPassword}>
              <Image source={eyeIconImage} style={styles.eyeIcon}/>
            </Pressable>
          </View>

          {/* Login button: */}

          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>{hebrew ? "התחבר" : "Login"}</Text>
          </Pressable>

          
         {/* Register button: */}
          <View style={{flexDirection: hebrew? "row-reverse":"row", marginTop: spacing.lg, alignItems: 'center'}}>
            <Text style={styles.register}>{hebrew ? "לא רשומים עדיין לאפליקציה?" : "don't have an account yet?"}</Text>
            <Pressable onPress={register} style={styles.registerButton}>
              <Text style={styles.registerButtonText}> {hebrew ? "הירשמו!" : "Register here!"}</Text>
            </Pressable>
          </View>
          
        </View>
      ) : (
        <Registration />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacing.lg,
    alignItems: 'center',
    backgroundColor: colors.purpleIsh
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  textInput: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.pinkIsh,
    borderColor: colors.darkBlue,
    width: 320,
    height: 40,
    paddingHorizontal: 10,

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    width: 30,
    height: 30,
    marginTop: 25

  },
  button: {
    marginTop: spacing.md,
    width: '80%',
    height: 45,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: colors.purple,
    fontSize: 22,
  },
  
  register: {
    fontSize: fontSizes.md,
    color: colors.white,
  },
  registerButton: {
    marginLeft: 10,
  },
  registerButtonText: {
    color: colors.white,
    fontSize: 14,
  },
  welcomeText: {
    fontSize: fontSizes.xxl,
    marginBottom: spacing.lg,
    paddingTop: spacing.lg
  },
});

export default Login;
