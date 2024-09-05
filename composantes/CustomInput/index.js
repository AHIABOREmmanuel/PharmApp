import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const CustomInput = (props) => {
  const { placeholder, error } = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        {...props}
        placeholder={placeholder} 
        placeholderTextColor="#666" 
        style={error ? styles.inputError : styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    
  },
  input: {
    padding: 10,
    backgroundColor: '#f0f0f0', 
    borderRadius: 1,
    color: '#333', 
  },
  inputError: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    color: '#333',
  },
  errorText: {
    color: '#f46a6a',
    fontSize: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
});
