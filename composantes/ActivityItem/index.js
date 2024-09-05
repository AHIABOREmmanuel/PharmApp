import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://10.10.6.53:8000/api/Cat%C3%A9gorie/')
      .then(response => {
        console.log('Réponse de l\'API:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.log('La réponse de l\'API ne contient pas une liste de catégories.');
        }
      })
      .catch(error => {
        console.log('Erreur lors de la requête API :', error.message);
        if (error.response) {
          console.log('Données de réponse de l\'erreur:', error.response.data);
          console.log('Statut de la réponse de l\'erreur:', error.response.status);
          console.log('En-têtes de la réponse de l\'erreur:', error.response.headers);
        } else if (error.request) {
          console.log('La requête a été faite mais aucune réponse n\'a été reçue', error.request);
        } else {
          console.log('Erreur lors de la configuration de la requête', error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {categories.length > 0 ? (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.name}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryName}>{item.nom}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Aucune catégorie trouvée</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  categoryItem: {
    backgroundColor: '#4CAF50',
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10, 
    width: 210,
    alignItems: 'center', 
    borderRadius: 10,
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
