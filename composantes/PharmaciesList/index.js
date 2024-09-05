import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation

const PharmaciesList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation(); // Utilisez useNavigation pour obtenir l'objet navigation

  useEffect(() => {
    axios.get('http://10.10.6.53:8000/api/Pharmacie/')
      .then(response => {
        setPharmacies(response.data);
      })
      .catch(error => {
        setError("Erreur lors du chargement des pharmacies.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePress = (pharmacyId) => {
    navigation.navigate('PharmacyDetail', { id: pharmacyId }); // Utilisez navigation pour naviguer
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pharmacies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.pharmacyCard}
          onPress={() => handlePress(item.id)}
        >
          {item.photo && (
            <Image source={{ uri: item.photo }} style={styles.pharmacyImg} />
          )}
          <View style={styles.pharmacyInfo}>
            <Text style={styles.pharmacyName}>{item.nom}</Text>
            <Text style={styles.pharmacyLocal}>{item.adresse}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pharmacyCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  pharmacyImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  pharmacyInfo: {
    flex: 1,
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pharmacyLocal: {
    fontSize: 14,
    color: '#777',
  },
});

export default PharmaciesList;
