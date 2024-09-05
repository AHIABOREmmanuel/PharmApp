import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from "../ecrans/tabs";
import PharmaciesList from "../composantes/PharmaciesList";
import PharmacyDetail from "../composantes/PharmacyDetail";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={BottomTabs} />
                <Stack.Screen name="PharmaciesList" component={PharmaciesList} />
                <Stack.Screen name="PharmacyDetail" component={PharmacyDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
