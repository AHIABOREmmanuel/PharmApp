import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActivityItem from "../../../composantes/ActivityItem/index.js";
import { FakeActivity } from "../../../fakeData/fakeActivity.js";
import Produits from '../../../composantes/SymptomItem/index.js';
import PharmaciesList from '../../../composantes/PharmaciesList/index.js';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "../../../FirebaseConfig.js";

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email || '');
        setUserFullName(user.displayName || '');
      } else {
        setUserId(null);
        setUserEmail('');
        setUserFullName('');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <ScrollView>
      {/* Listes des activités */}
      <View>
        <Text style={styles.titleBold}>Nos catégories de médicaments</Text>
      </View>

      <FlatList 
        data={FakeActivity}
        keyExtractor={(item) => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollableList}
        renderItem={({ item }) => (
          <ActivityItem item={item} />
        )}
      />

      {/* Liste des produits */}
      <View>
        <Text style={styles.titleBold}>Nos produits en pharmacies</Text>
      </View>

      <Produits />

      {/* Liste des pharmacies */}
      <View style={{ flex: 1 }}>
        <View style={styles.title_space_between}>
          <Text style={styles.titleBold}>Nos pharmacies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PharmaciesList')}>
            <Text style={styles.link}>Afficher tout</Text>
          </TouchableOpacity>
        </View>

        <PharmaciesList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  titleBold: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title_space_between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  link: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default Home;
