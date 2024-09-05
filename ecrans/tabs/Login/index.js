import { View, StyleSheet, KeyboardAvoidingView, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Utilisateur connecté:', user);
                console.log('User ID:', user.uid); // Log de l'ID de l'utilisateur
                setUser(user);
                // Naviguer vers la page des produits avec l'ID utilisateur
                navigation.navigate('SymptomItem', { userId: user.uid });
            } else {
                setUser(null);
            }
        });

        return unsubscribe;
    }, [auth, navigation]);

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            console.log('Connexion réussie, User ID:', response.user.uid); // Log de l'ID de l'utilisateur
            Alert.alert('Connexion réussie');
        } catch (error) {
            console.error(error);
            Alert.alert('Connexion échouée', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder='Mot de passe'
                    autoCapitalize='none'
                    onChangeText={(text) => setPassword(text)}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button mode="contained" onPress={signIn} style={styles.button}>
                            Connexion
                        </Button>

                        <Text style={styles.Text}>Ou</Text>

                        <TouchableOpacity onPress={() => navigation.navigate("register")} style={styles.loginText}>
                            <Text style={styles.loginText}>Créer un compte</Text>
                        </TouchableOpacity>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#32ce89',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    Text: {
        textAlign: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
    loginText: {
        textAlign: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    }
});

