import { Stack } from "expo-router";



export default function MyProfileLayout() {
    return <Stack initialRouteName="MyProfile">
         <Stack.Screen name="MyProfile"></Stack.Screen>
    </Stack>
}