import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function Produits({ addToCart }) {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://10.10.6.53:8000/api/Produits/')
      .then(response => {
        setProduits(response.data);
      })
      .catch(() => {
        setError("Erreur lors du chargement des produits.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
    <View style={styles.container}>
      <FlatList
        data={produits}
        keyExtractor={(item) => item.url.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.produitItem}>
            <Image source={{ uri: item.image }} style={styles.produitImage} />
            <Text style={styles.produitName} numberOfLines={1}>{item.Medicament}</Text>
            <Text style={styles.produitDescription} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.produitPrice}>{item.prix} CFA</Text>
            {/* <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addButtonText}>Ajouter au panier</Text>
            </TouchableOpacity> */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  produitItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10, // Ajustement des marges pour éviter les chevauchements
    width: 220,
    alignItems: 'center', // Centrer les éléments
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 3,
  },
  produitImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain', // Ajustement de l'image pour qu'elle ne dépasse pas
  },
  produitName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', // Centrer le texte
  },
  produitDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center', // Centrer le texte
  },
  produitPrice: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
