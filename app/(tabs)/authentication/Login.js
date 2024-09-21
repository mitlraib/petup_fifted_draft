import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { Registration } from './Registration';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { fontSizes } from '../../utils/sizes';
import { useRouter } from 'expo-router';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [connected, setConnected] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(true);
  const router = useRouter() 
  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      router.navigate("swipepage")
    } else {
      alert("Invalid username or password!");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const register = () => {
    setRegistered(!registered);
  };

  return (
    <View style={styles.container}>
      {registered ? (
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>Welcome! Please log in:</Text>

          <TextInput
            style={styles.textInput}
            onChangeText={setUsername}
            placeholder="Username"
            value={username}
            />
            <View style={{flexDirection: 'row', paddingLeft:25}}>

            <TextInput
              style={styles.textInput}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
            />
            <Pressable onPress={toggleShowPassword}>
              <Image
                  source={require('../../../assets/images/eye.png')}
                style={styles.eyeIcon}
              />
            </Pressable>
          </View>

          <Pressable onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <View style={styles.registerContainer}>
            <Text style={styles.register}>Don't have an account?</Text>
            <Pressable onPress={register} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
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
    marginTop:25
    
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
  registerContainer: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    alignItems: 'center',
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
  },
});

export default Login;
