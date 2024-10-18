import { View,ScrollView, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import littlePoxi from '../../assets/images/poxi.jpeg';
import bigPoxi from '../../assets/images/bigpoxi.jpeg';
import colors from '../src/utils/colors';


export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title} >אודות:</Text>
      <Text style={styles.text}  >היי! שמי מיטל לרנר.</Text>
      <Text style={styles.text}>בשנת 2023 התחתנתי עם בעלי דולב ויחד רצינו לאמץ כלב 🐶 </Text>
      <Text style={styles.text}>אז התחלנו בתהליך...וגילינו שהתהליך הזה לא פשוט בכלל. הייינו צריכים לעבור כל פעם ממקום למקום,
        בין כל מיני אתרים לכל מיני אפליקציות לכל מיני  עמותות וחיפשנו בין חברים שיפרסמו בשבילנו
        שאנחנו מחפשים לאמץ כלב.  </Text>
        <Text style={styles.text}>לאט לאט הבנו שזה לא כזה פשוט כמו שחשבנו בהתחלה והבנו שאולי זוג אחר כבר היה מתייאש.. </Text>
      <Text style={styles.text}>בסוף באחד האתרים מצאנו מישהו שמוסר גורה קטנה 🤩. 
        החלטנו ללכת לראות לראות ו... התאהבנו 😍 ! </Text>
      
        <Text style={styles.text}  >באותו יום הגורה הקטנה כבר ישנה אצלנו בבית ...</Text>

        
      <Text style={styles.text}>הכירו את פוקסי הקטנה: </Text>
      <Text></Text>

      <Image source={littlePoxi} style={styles.image} />

      <Text></Text>

      <Text style={styles.text}>מאז עברה כבר שנה , בה גידלנו את פוקסי והיא הפכה כבר לחלק מהמשפחה שלנו ..
        ביחד עם פוקסי הכרנו חלק קטן מעולם הגדול של הכלבים , הלכנו לגינות כלבים והכרנו עוד המון בעלי כלבים 
        ולכל אחד סיפור האימוץ שלו... הבנתי שיש צורך ממשי באפליקציה נוחה ונגישה, שתוכל לעשות לכם את החיים יותר קלים בדרך אל החבר הכי טוב שלכם. מקווה שתהנו ותמצאו את אשר חפצה נפשכם ❤️
      </Text>
      <Text></Text>
      <Text></Text>
      <Text>אגב, הנה פוקסי הגדולה:</Text>
      <Text></Text>

      <Image source={bigPoxi} style={styles.image} />

      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purpleIsh,

  },
  image: {
    width: 200,
    height: 200,
    alignSelf:'center',
    padding:20
  },
  title: {
    fontSize: 18,
    color: "black",
    padding: 20,
    fontWeight:'bold'

  },
  text: {
      fontSize: 14,
    color: "black",
    padding:5

  }
})