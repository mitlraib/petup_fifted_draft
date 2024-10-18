import { View, Image, Text, TextInput, StyleSheet, Dimensions, Pressable, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {useAuth} from '../src/context/AuthContext'
import colors from '../src/utils/colors';
import ProfileImage from '../../assets/images/ProfileImage.jpg'; 

export default function MyProfile() {
  const {user, logout,token} = useAuth()
  const router = useRouter();
  const [image, setImage] = useState(null);


  const whenLogOutClicked = async () => {
    await logout()
  }

  useEffect(() => {
    if (!user) {
      router.navigate('authentication/Login');
    }
  },[user])

  

  

    const whenProfileImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
  


  return (
    <View>
          
          <Pressable onPress={whenProfileImage} style={styles.profileImage}>
          <Image
            source={image ? { uri: image } : ProfileImage}
            style={styles.profileImage}
          />
      </Pressable>


      
      <Text style={styles.name}>{"שלום, " + user?.firstName + " !"}</Text>

      <Pressable
      //onPress={ }
      >
          <Text style={styles.menuHeader} >שינוי שם </Text>
          </Pressable>

      <Pressable
      //onPress={ }
      >
          <Text style={styles.menuHeader} >שינוי תיאור </Text>
          </Pressable>


      <Pressable
      //onPress={ }
      >
          <Text style={styles.menuHeader} >שינוי כתובת מייל </Text>
          </Pressable>
      

          <Pressable onPress={whenLogOutClicked}>
          <Text style={styles.menuHeader} >התנתק</Text>
          </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purpleIsh,
  },

  profileImage: {
    paddingTop: 50,
    width: 200,
    height: 200,
    borderRadius:100,
    alignSelf:'center'
  },
  name: {
    fontSize: 22,
    color: "black",
    paddingTop:100,
    padding: 40,
    alignSelf:'center'

  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },

  menuHeader: {
    fontSize: 18,
    borderColor: "black",
    borderWidth:2,
    color: "black",
    marginTop:40,
    backgroundColor:colors.lightBlue,
    padding: 5
  }
})