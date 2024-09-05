import axios from 'axios';

// Remplacez par l'URL de l'API Gemini avec ta clé API
const API_KEY = 'AIzaSyBsWDlbc3pS6yP0h7WBCwUZZuzm3iwbjF4';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

export const fetchAIData = async (data) => {
  try {
    const response = await axios.post(API_URL, {
      contents: [
        {
          parts: [
            {
              text: data.text,
            }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Extraire le texte de la réponse
    const aiMessage = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Pas de réponse reçue';

    return { result: aiMessage };
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw new Error(error.response?.data?.error?.message || 'Erreur inconnue');
  }
};
