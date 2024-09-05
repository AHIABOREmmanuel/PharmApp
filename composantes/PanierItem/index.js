import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet } from 'react-native';

const PanierItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (text) => {
    const quantity = parseInt(text, 10);
    if (!isNaN(quantity) && quantity > 0) {
      onUpdateQuantity(item.idProduit, quantity);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `http://192.168.1.69/media/${item.image}` }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Medicament}</Text>
        <Text>{item.description}</Text>
        <Text>Prix: {item.prix} CFA</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Quantité"
          value={item.quantite.toString()}
          onChangeText={handleQuantityChange}
        />
        <View style={styles.actions}>
          <Button title="Mettre à jour" onPress={() => onUpdateQuantity(item.idProduit, item.quantite)} />
          <Button title="Supprimer" onPress={() => onRemoveItem(item.idProduit)} color="red" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PanierItem;
