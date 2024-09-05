import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
// import * as ImagePicker from "expo-image-picker";
import Title from "../../../composantes/Title";
import InformationText from "../../../composantes/InformationText";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.uri);
    }
  };

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      await updateProfile(user, {
        displayName: fullName,
        photoURL: profilePhoto,
      });

      // Save the user details in AsyncStorage
      await AsyncStorage.setItem('useremail', email);
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('profilePhoto', profilePhoto || '');

      alert("Inscription réussie");
      navigation.navigate("login"); // Navigate to login screen or any other screen
    } catch (error) {
      console.error(error);
      alert("Inscription échouée: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <Image
          source={require("../../../assets/LOGO_JPOPE_DIGI-PHARMA_AHIABOR Koffi Emmanuel.jpg")}
          style={styles.imageContainer}
        />

        {/* Titre de l'application */}
        <Title style={styles.titleText} title="REJOINDRE EPHARMA" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.formContainer}
        >
          <TextInput
            value={fullName}
            style={styles.input}
            placeholder="Nom complet"
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            value={address}
            style={styles.input}
            placeholder="Adresse"
            onChangeText={(text) => setAddress(text)}
          />
          {/* 
          <TextInput
            value={phoneNumber}
            style={styles.input}
            placeholder="Numéro de téléphone"
            keyboardType="phone-pad"
            onChangeText={(text) => setPhoneNumber(text)}
          />
          */}
          <TextInput
            secureTextEntry
            value={password}
            style={styles.input}
            placeholder="Mot de passe"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            secureTextEntry
            value={confirmPassword}
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            autoCapitalize="none"
            onChangeText={(text) => setConfirmPassword(text)}
          />

          {/* Uncomment this section to allow users to pick a profile photo */}
          {/* 
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text>Choisir une photo de profil</Text>
          </TouchableOpacity>
          {profilePhoto && (
            <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
          )}
          */}

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity onPress={signUp} style={styles.button}>
              <Text style={styles.buttonText}>Inscription</Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={() => navigation.navigate("login")} style={styles.loginTextContainer}>
          <Text style={styles.loginText}>J'ai déjà un compte</Text>
        </TouchableOpacity>

        <InformationText text="En cliquant sur créer mon compte vous acceptez nos conditions" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  imageContainer: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    width: "100%",
    backgroundColor: "#fff",
  },
  imagePicker: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#32ce89",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginTextContainer: {
    marginTop: 15,
  },
  loginText: {
    color: "#32ce89",
  },
  titleText: {
    textAlign: "center",
    marginVertical: 20,
  },
});

export default Register;

































// import { View, Text, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
// import React, { useState } from 'react';
// import Title from '../../../composantes/Title';
// import InformationText from '../../../composantes/InformationText';
// import { FIREBASE_AUTH } from '../../../FirebaseConfig';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const Register = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const auth = FIREBASE_AUTH;

//   const signUp = async () => {
//     setLoading(true);
//     try {
//       const response = await createUserWithEmailAndPassword(auth, email, password);
//       console.log(response);
//       alert('Inscription réussie');
//     } catch (error) {
//       console.error(error);
//       alert('Inscription échouée: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <Image source={require('../../../assets/LOGO_JPOPE_DIGI-PHARMA_AHIABOR Koffi Emmanuel.jpg')} style={styles.imageContainer} />

//       {/* Titre de l'application */}
//       <Title style={styles.titleText} title="REJOINDRE EPHARMA" />
      
//       <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
//         <TextInput
//           value={email}
//           style={styles.input}
//           placeholder='Email'
//           autoCapitalize='none'
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           secureTextEntry={true}
//           value={password}
//           style={styles.input}
//           placeholder='Mot de passe'
//           autoCapitalize='none'
//           onChangeText={(text) => setPassword(text)}
//         />

//         {loading ? (
//           <ActivityIndicator size="large" color="#0000ff" />
//         ) : (
//           <>
//             <TouchableOpacity onPress={signUp} style={styles.button}>
//               <Text style={styles.buttonText}>Inscription</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </KeyboardAvoidingView>

//       <TouchableOpacity onPress={() => navigation.navigate("login")} style={styles.loginTextContainer}>
//         <Text style={styles.loginText}>J'ai déjà un compte</Text>
//       </TouchableOpacity>

//       <InformationText text="En cliquant sur créer mon compte vous acceptez nos conditions" />
//     </View>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 30,
//   },
//   imageContainer: {
//     width: 90,
//     height: 90,
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//   },
//   input: {
//     marginVertical: 10,
//     height: 50,
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 15,
//     width: '100%',
//     backgroundColor: '#fff',
//   },
//   button: {
//     marginVertical: 10,
//     backgroundColor: '#32ce89',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   loginTextContainer: {
//     marginTop: 15,
//   },
//   loginText: {
//     color: '#32ce89',
//   },
//   titleText: {
//     textAlign: 'center',
//     marginVertical: 20,
//   },
// });
