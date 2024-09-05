import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import Register from "./ecrans/tabs/Register";
import Login from "./ecrans/tabs/Login";
import BottomTabs from "./ecrans/tabs";
import Welcome from "./ecrans/tabs/Welcome";
import PharmaciesList from "./composantes/PharmaciesList";
import PharmacyDetail from "./composantes/PharmacyDetail";
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={user ? "home" : "login"}
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <>
            <Stack.Screen name="home" component={BottomTabs} />
            <Stack.Screen name="PharmaciesList" component={PharmaciesList} />
            <Stack.Screen name="PharmacyDetail" component={PharmacyDetail} />
          </>
        ) : (
          <>
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



















// import React, { useEffect, useState } from "react";
// import { View } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Routes from "./routes";
// import Register from "./ecrans/tabs/Register";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet } from "react-native";
// import Login from "./ecrans/tabs/Login";
// import Home from "./ecrans/tabs/Home";
// import BottomTabs from "./ecrans/tabs";
// import Welcome from "./ecrans/tabs/Welcome";
// import { onAuthStateChanged, User } from 'firebase/auth';






// const Stack = createNativeStackNavigator();


// const App = ()=>{
// //   const [user, setUser] = useState<User | null>(null);


// // useEffect(()=>{
// //   onAuthStateChanged(FIREBASE_AUTH,(user) =>{
// //     console.log('user',user);
// //     setUser(user)
// //   } );

// // }, [] );

//   return (
    
//   <View style={{flex: 1}}>
//     <NavigationContainer>
//     <StatusBar style ="auto" />
//     <Stack.Navigator 
//     initialRouteName="login"
//     screenOptions={{headerShown: false}}
//     >
//     <Stack.Screen name="welcome" component={Welcome}/>
//     <Stack.Screen name="register" component={Register}/>
//     <Stack.Screen name="login" component={Login}/>
//     <Stack.Screen name="home" component={BottomTabs}/>
//     </Stack.Navigator> 
//      {/* <Routes />  */}
//      {/* <Register />  */}
//      {/* <Login />  */}
//      </NavigationContainer>
//   </View>
  
//   );
// }






// export default App;


