import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = ({ route }) => {
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Code QR pour la Commande {orderId}</Text>
      <QRCode
        value={orderId.toString()}
        size={200}
        color='black'
        backgroundColor='white'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default QRCodeScreen;
