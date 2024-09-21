import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Image, Pressable } from 'react-native';

import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { Login } from './Login';

export const Registration = ({}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameIsTaken, setUsernameIsTaken] = useState(false);
  const [registered, setRegistered] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const register = () => {
    if (!registered) {
      setRegistered(true);
    }
  };

  const moveToLogin = () => {
    if (!login) {
      setLogin(true);
    }
  };

  // הפיכת מספר הטלפון למספרים בלבד:
  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(numericText);
  };

  // ולידציה של מספר טלפון:
  useEffect(() => {
    if ((phoneNumber.length === 9 || phoneNumber.length === 10) && phoneNumber[0] === '0') {
      setValidPhoneNumber(true);
    } else {
      setValidPhoneNumber(false);
    }
  }, [phoneNumber]);

  // ולידציה של מייל:
  useEffect(() => {
    if (mail.includes("@")) {
      setValidMail(true);
    } else {
      setValidMail(false);
    }
  }, [mail]);

  // ולידציה של שם משתמש:
  useEffect(() => {
    if (!usernameIsTaken) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }, [usernameIsTaken]);

  // ולידציה של סיסמה:
  useEffect(() => {
    if (password.length > 6 && password.length <= 30) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [password]);

  // הודעות שגיאה:
  const getPhoneNumberMessage = () => {
    if (phoneNumber.length < 9) return "Not enough digits!";
    if (phoneNumber.length > 10) return "Too many digits!";
    if (phoneNumber[0] !== '0') return "Your first digit of your phone number must be 0!";
    return ` `;
  };

  const getEmailMessage = () => {
    return !validMail ? "Your email is invalid!" : " ";
  };

  const getUsernameMessage = () => {
    return !validUsername ? "Your username is taken!" : " ";
  };

  const getPasswordMessage = () => {
    if (password.length < 7) return "Must be more than 6 characters!";
    if (password.length > 30) return "Too many characters!";
    return " ";
  };

  // פונקציה לקביעת זמינות כפתור שליחה:
  const buttonClickable = () => {
    return !(validMail && validPassword && validPhoneNumber && validUsername);
  };

  return (
    <View>
      {!login ? (
        <>
          <View>
            {/* כותרת */}
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.welcomeText}> Fill your details here:</Text>
            <Text style={styles.welcomeText}> </Text>


            {/* שם משתמש */}
            <View style={styles.textInput_wrapper}>
              <TextInput
                id='username'
                style={styles.textInput}
                onChangeText={setUsername}
                placeholder="Username"
              />
              <Text style={styles.messageText}>{getUsernameMessage()}</Text>
            </View>

            {/* סיסמה */}
            <View style={styles.textInput_wrapper}>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  id='Password'
                  style={styles.textInput}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                />
                 
                 {/* כפתור הצגת/הסתרת סיסמה */}
                <Pressable onPress={toggleShowPassword}>
                  <Image
                    source={require('../../../assets/images/eye.png')}
                    style={{ width: 30, height: 30, marginTop: spacing.lg}}
                  />
                </Pressable>
              </View>
              <Text style={styles.messageText}>{getPasswordMessage()}</Text>
            </View>
            
            {/* מייל */}
            <View style={styles.textInput_wrapper}>
              <TextInput
                id='mail'
                style={styles.textInput}
                onChangeText={setMail}
                placeholder="Email"
              />
              <Text style={styles.messageText}>{getEmailMessage()}</Text>
            </View>

            {/* מספר טלפון */}
            <View style={styles.textInput_wrapper}>
              <TextInput
                id='phone'
                style={styles.textInput}
                onChangeText={handlePhoneNumberChange}
                keyboardType="numeric"
                value={phoneNumber}
                placeholder="Phone Number"
              />
              <Text style={styles.messageText}>{getPhoneNumberMessage()}</Text>
            </View>

            {/* כפתור שליחה */}
            <View style={{ paddingLeft: 150 }}>
              <Pressable
                onPress={register}
                style={styles.button}
                disabled={buttonClickable()}
              >
                <Text style={{ color: "purple", fontSize: 17, textAlign: 'center' }}>Submit!</Text>
              </Pressable>
            </View>

            {/* חזרה להתחברות */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.login}>
                Already have an account? 
              </Text> 
              <Pressable onPress={moveToLogin} style={styles.loginButton}>
                <Text style={{ paddingLeft: 5, color: "white", fontSize: 10 }}>Login</Text>
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
  textInput: {
    marginTop: spacing.sm,
    width: 200,
    fontSize: 12,
    textAlign: 'left',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: colors.pinkIsh,
    paddingHorizontal: 10,
    color: colors.black,
  },
  textInput_wrapper: {
    marginTop: spacing.sm,
    width: 200,
    fontSize: 12,
    paddingLeft: 90,
    textAlign: 'left'
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm
  },
  messageText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    flexWrap: 'nowrap',
  },
  login: {
    marginTop: spacing.sm,
    fontSize: fontSizes.sm,
    paddingLeft: 110,
    color: colors.white
  },
  button: {
    marginTop: spacing.lg,
    width: 75,
    height: 30,
    paddingTop: 5,
    backgroundColor: colors.white
  },
  loginButton: {
    width: 60,
    height: 30,
    paddingTop: spacing.sm,
  },
  welcomeText: {
    fontSize: fontSizes.xxl,
    paddingLeft: 20,
    justifyContent: 'center',
    textAlign:'center'
  },
});

export default Registration;
