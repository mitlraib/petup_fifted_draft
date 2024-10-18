import { Stack } from "expo-router";



export default function UserProfileLayout() {
    return <Stack initialRouteName="UserProfile">
         <Stack.Screen name="UserProfile"></Stack.Screen>
    </Stack>
}