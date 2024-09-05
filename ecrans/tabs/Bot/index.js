import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { fetchAIData } from '../../../composantes/Api/api';

const Bot = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (inputText.trim() === '') return;

    // Ajouter le message de l'utilisateur
    const userMessage = { text: inputText, type: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setLoading(true);
    setError('');
    try {
      const response = await fetchAIData({ text: inputText });
      const aiMessage = { text: response.result, type: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      setError('Une erreur est survenue.');
    } finally {
      setLoading(false);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer} contentContainerStyle={styles.messageContent}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.type === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre message ici"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSubmit}
        />
        <Button title="Envoyer" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  messageContainer: {
    flex: 1,
    marginBottom: 12,
  },
  messageContent: {
    paddingVertical: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 15,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFEO',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 8,
    paddingHorizontal: 12,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Bot;















