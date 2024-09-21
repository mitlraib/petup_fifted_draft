
// Tags.js
import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput, Image, Pressable } from 'react-native';

export const Characteristics = () => {
  
    const [indoor, setIndoor] = useState(false);
    const [trained, setTrained] = useState(false);
    const [pottyTrained, setPottyTrained] = useState(false);
    const [small, setSmall] = useState(false);
    const [big, setBig] = useState(false);
    const [medium, setMedium] = useState(false);
    const [vacsinated, setVacsinated] = useState(false);
    const [castrated, setCastrated] = useState(false);
    const [race, setRace] = useState('');
    const [age, setAge] = useState('');
    if (indoor) {
      <View>
        <Text> מתאים לבית </Text>
        </View>
    } else {
      <View>
        <Text> מתאים לגינה בלבד </Text>
        </View>
    }
    if (trained) {
      <View>
        <Text> מאולף </Text>
        </View>
    } else {
      <View>
        <Text> לא מאולף </Text>
        </View>
    }
  };
  
//5