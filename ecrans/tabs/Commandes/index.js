import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import QRCode from 'react-native-qrcode-svg';

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [qrCodeOrderId, setQrCodeOrderId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserEmail(user.email || '');
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const fetchCommandes = () => {
      axios.get('http://10.10.6.53:8000/api/Commande/')
        .then(response => {
          setCommandes(response.data);
        })
        .catch(error => {
          console.log('Erreur lors de la récupération des commandes:', error);
          Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des commandes.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCommandes();

    const intervalId = setInterval(fetchCommandes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const updateCommandeStatus = (id, action) => {
    axios.post(`http://10.10.6.53:8000/api/Commande/${action}/${id}/`)
      .then(response => {
        setCommandes(prevCommandes =>
          prevCommandes.map(cmd =>
            cmd.id === id ? { ...cmd, status: action === 'accepter' ? 'Accepted' : 'Rejected' } : cmd
          )
        );
        Alert.alert("Succès", `Commande ${action === 'accepter' ? 'acceptée' : 'refusée'}.`);
      })
      .catch(error => {
        console.log(`Erreur lors de la ${action === 'accepter' ? 'acceptation' : 'refus'} de la commande:`, error);
        Alert.alert("Erreur", `Une erreur s'est produite lors de la ${action === 'accepter' ? 'acceptation' : 'refus'} de la commande.`);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      case 'In Progress':
      default:
        return 'blue';
    }
  };

  const handlePayment = (orderId) => {
    Alert.alert('Paiement', 'Le paiement a été effectué.');
    setQrCodeOrderId(orderId);
  };

  const handleHideQRCode = () => {
    setQrCodeOrderId(null);
  };

  const renderCommandeItem = ({ item }) => (
    <View style={styles.commandeItem}>
      {/* <Image source={{ uri: item.image }} style={styles.produitImage} />
      */}
      <Text style={styles.commandeText}>Produit: {item.produit}</Text> 
      <Text style={styles.commandeText}>Quantité: {item.quantite}</Text>
      <Text style={styles.commandeText}>Prix: {item.prix} CFA</Text>
      <Text style={styles.commandeText}>Date: {new Date(item.date_commande).toLocaleString()}</Text>
      <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>
          {item.status === 'Accepted' ? 'Commande acceptée' :
            item.status === 'Rejected' ? 'Commande refusée' :
            'Commande en cours'}
        </Text>
      </View>
      {item.status === 'In Progress' && (
        <View style={styles.buttonContainer}>
          <Button title="Accepter" onPress={() => updateCommandeStatus(item.id, 'accepter')} />
          <Button title="Refuser" onPress={() => updateCommandeStatus(item.id, 'refuser')} />
        </View>
      )}
      {item.status === 'Accepted' && (
        <>
          <Button
            title="Payer"
            onPress={() => handlePayment(item.id)}
          />
          {qrCodeOrderId === item.id && (
            <View style={styles.qrContainer}>
              <QRCode
                value={item.id.toString()}
                size={200}
                color='black'
                backgroundColor='white'
              />
              <Button title="Cacher le Code QR" onPress={handleHideQRCode} />
            </View>
          )}
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des commandes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      {commandes.length > 0 ? (
        <FlatList
          data={commandes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommandeItem}
        />
      ) : (
        <Text>Aucune commande trouvée</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  commandeItem: {
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    //position: 'relative',
    //backgroundColor: '#f5f5f5',
    //borderRadius: 10,
    //alignItems: 'center',
    elevation: 3,
  },
  commandeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  produitImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Commandes;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Button,Image } from 'react-native';
// import axios from 'axios';
// import { onAuthStateChanged } from 'firebase/auth';
// import { FIREBASE_AUTH } from '../../../FirebaseConfig';

// const Commandes = () => {
//   const [commandes, setCommandes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userEmail, setUserEmail] = useState('');

//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
//       if (user) {
//         setUserEmail(user.email || '');
//       } else {
//         setUserEmail('');
//       }
//     });

//     return () => unsubscribeAuth();
//   }, []);

//   useEffect(() => {
//     const fetchCommandes = () => {
//       axios.get('http://192.168.100.214:8000/api/Commande/')
//         .then(response => {
//           setCommandes(response.data);
//         })
//         .catch(error => {
//  console.log('Erreur lors de la récupération des commandes:', error);
//           Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des commandes.");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     };

//     fetchCommandes();

//     const intervalId = setInterval(fetchCommandes, 5000); 

//     return () => clearInterval(intervalId); 
//   }, []);

//   const updateCommandeStatus = (id, action) => {
//     axios.post(`http://192.168.100.214:8000/api/Commande/${action}/${id}/`)
//       .then(response => {
//         setCommandes(prevCommandes =>
//           prevCommandes.map(cmd =>
//             cmd.id === id ? { ...cmd, status: action === 'accepter' ? 'Accepted' : 'Rejected' } : cmd
//           )
//         );
//         Alert.alert("Succès", `Commande ${action === 'accepter' ? 'acceptée' : 'refusée'}.`);
//       })
//       .catch(error => {
//         console.log(`Erreur lors de la ${action === 'accepter' ? 'acceptation' : 'refus' } de la commande:`, error);
//         Alert.alert("Erreur", `Une erreur s'est produite lors de la ${action === 'accepter' ? 'acceptation' : 'refus' } de la commande.`);
//       });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Accepted':
//         return 'green'; 
//       case 'Rejected':
//         return 'red';   
//       case 'In Progress':
//       default:
//         return 'blue'; 
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Chargement des commandes...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Historique des Commandes</Text>
//       {commandes.length > 0 ? (
//         <FlatList
//           data={commandes}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.commandeItem}>
//               <Image source={{ uri: item.image }} style={styles.produitImage} />
//               <Text style={styles.commandeText}>Produit: {item.produit}</Text>
//               <Text style={styles.commandeText}>Quantité: {item.quantite}</Text>
//               <Text style={styles.commandeText}>Prix: {item.prix} CFA</Text>
//               <Text style={styles.commandeText}>Date: {new Date(item.date_commande).toLocaleString()}</Text>
//               <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) }]}>
//                 <Text style={styles.statusText}>
//                   {item.status === 'Accepted' ? 'Commande acceptée' :
//                    item.status === 'Rejected' ? 'Commande refusée' :
//                    'Commande en cours'}
//                 </Text>
//               </View>
//               {item.status === 'In Progress' && (
//                 <View style={styles.buttonContainer}>
//                   <Button title="Accepter" onPress={() => updateCommandeStatus(item.id, 'accepter')} />
//                   <Button title="Refuser" onPress={() => updateCommandeStatus(item.id, 'refuser')} />
//                 </View>
//               )}
//             </View>
//           )}
//         />
//       ) : (
//         <Text>Aucune commande trouvée</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   commandeItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     position: 'relative',
//   },
//   commandeText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   statusContainer: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     padding: 5,
//     borderTopRightRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   statusText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default Commandes;
