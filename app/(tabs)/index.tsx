//index.tsx

import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, SafeAreaView,Platform, StatusBar, Button } from 'react-native';
import Contacts from 'expo-constants';
import { colors } from '../utils/colors';
import { Login } from './authentication/Login';
import { useRouter } from 'expo-router';
import  ApplicationFormPage from './applicationForm/ApplicationFormPage'
import TryingScreen from './tryingScreen/TryingScreen'
import SwipePage from './swipepage/SwipePage'
import NewDogsInformation from '../newDogsInformation/NewDogsInformation'


export default function index() {
  const [currentSubject, setCurrentSubject] = useState();
  const router = useRouter();


  return (
    <SafeAreaView style={styles.container}>
     {/* <Text> HI!</Text> */}
      <SwipePage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.purpleIsh,
  },
});