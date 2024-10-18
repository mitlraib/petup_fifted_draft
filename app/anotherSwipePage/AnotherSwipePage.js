// AnotherSwipePage.js
import { View, Text } from 'react-native';
import React from 'react';

const AnotherSwipePage = (props,{route}) => {
  return (
    <View>
      <Text>AnotherSwipePage</Text>
      <Text style={{ fontSize: 30, color: "black" }}>{props.title}</Text>
      <Text style={{fontSize: 30, color: "black"}}>{props.description}</Text>

    </View>
  );
};

export default AnotherSwipePage;
