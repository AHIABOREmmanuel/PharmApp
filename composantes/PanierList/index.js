// PanierList.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PanierList({ item, onAdd, onRemove }) {
  return (
    <View style={styles.container}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.productImage} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{item.Medicament}</Text>
        <Text style={styles.productPrice}>{item.prix} FCFA</Text>
        <Text style={styles.productQuantity}>Quantité: {item.quantity}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => onAdd(item)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onRemove(item)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    width: '100%',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 12,
    color: '#000',
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
