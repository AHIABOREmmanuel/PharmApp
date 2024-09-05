import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Button } from "react-native";
import Styles from "./Style";
import { fakeSetting } from "../../../fakeData/fakeSetting";
import SettingItem from "../../../composantes/SettingItem";

import { FIREBASE_AUTH } from "../../../FirebaseConfig";


const Setting = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <View>
      {/* Header */}
      <View style={Styles.header}>
        <Image
          source={user && user.photoURL ? { uri: user.photoURL } : require('../../../assets/Nuel_.jpg')}
          style={Styles.Image}
        />
        <View style={Styles.userInfo}>
          <View>
            <Text style={Styles.userName}>{user ? user.displayName : 'Nom d\'utilisateur'}</Text>
            <Text style={Styles.userEmail}>{user ? user.email : 'Email d\'utilisateur'}</Text>
            <Text>{user ? user.phoneNumber : 'Numéro de téléphone'}</Text>
          </View>
        </View>
      </View>

      {/* Fin Header */}

      <FlatList
        data={fakeSetting}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <SettingItem item={item} />;
        }}
      />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Me déconnecter" />
    </View>
  );
}

export default Setting;




















// import React from "react";
// import { View, Text, Image, FlatList,Button } from "react-native";
// import Styles from "./Style";
// import { fakeSetting } from "../../../fakeData/fakeSetting";
// import SettingItem from "../../../composantes/SettingItem";
// import { FIREBASE_AUTH } from "../../../FirebaseConfig";



// const Setting = ({navigation}) => {
//   return (<View>
//     {/* Header */}
//     <View style={Styles.header}>
//       <Image source={require('../../../assets/Nuel_.jpg')} style={Styles.Image} />
//       <View Styles={Styles.userInfo}>
//         <View>
//           <Text style={Styles.userName}>Emmanuel ahiabor</Text>
//           <Text style={Styles.userEmail}>ahiaboremmanuel9@gmail.com </Text>
//           <Text>+228 92 59 65 83</Text>

//         </View>
//       </View>
//     </View>

// {/* Fin Header */}

// <FlatList data={fakeSetting} keyExtractor={item=>item.id} 
// showsHorizontalScrollIndicator={false} renderItem={({item})=>{
//   return <SettingItem item={item} />;

// }}/>
// <Button onPress={() => FIREBASE_AUTH.signOut()} title='Me déconnecter' />
//   </View>
//   );
// }


// export default Setting;