import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from "./Home";
import Panier from "./Commandes";
import Settings from "./Setting";
import Bot from "./Bot";
import Commandes from "./Commandes";

const BottomTabs = () => {

    const Tab = createBottomTabNavigator();


    return (
        <Tab.Navigator
            initialRouteName="tabs_home"
            screenOptions={{
                tabBarActiveTintColor: '#4CAF50',
                headershown: false,
            }}
        >
            <Tab.Screen
                name="EPHARMA"
                component={Home}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Historique des Commandes"
                component={Commandes}
                options={{
                    tabBarLabel: 'Commandes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="EpharmaBot"
                component={Bot}
                options={{
                    tabBarLabel: 'ebot',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Paramètres"
                component={Settings}
                options={{
                    tabBarLabel: 'Moi',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default BottomTabs;