import { Stack, useRouter } from "expo-router";


export default function ApplicationFormPageLayout() {

    return <Stack initialRouteName="ApplicationFormPage">
        <Stack.Screen name="ApplicationFormPage" />
    </Stack>
}