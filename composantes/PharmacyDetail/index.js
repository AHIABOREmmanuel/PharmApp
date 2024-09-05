import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, ActivityIndicator, Alert, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PanierList from '../PanierList';

const API_BASE_URL = 'http://10.10.6.53:8000/api';

const PharmacyDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [pharmacy, setPharmacy] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [panier, setPanier] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmacyUrl = `${API_BASE_URL}/Pharmacie/${id}/`;
        const productsUrl = `${API_BASE_URL}/Produits/`;
        console.log(`Fetching pharmacy data from: ${pharmacyUrl}`);
        console.log(`Fetching products data from: ${productsUrl}`);

        const [pharmacyResponse, productsResponse] = await Promise.all([
          axios.get(pharmacyUrl),
          axios.get(productsUrl)
        ]);
        
        setPharmacy(pharmacyResponse.data);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(products.filter(product =>
        product.Medicament.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const ajouterAuPanier = useCallback((item) => {
    setPanier(prevPanier => {
      const index = prevPanier.findIndex(prod => prod.url === item.url);
      if (index >= 0) {
        const updatedPanier = [...prevPanier];
        updatedPanier[index].quantity += 1;
        return updatedPanier;
      } else {
        return [...prevPanier, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const retirerDuPanier = useCallback((item) => {
    setPanier(prevPanier => {
      const index = prevPanier.findIndex(prod => prod.url === item.url);
      if (index >= 0) {
        const updatedPanier = [...prevPanier];
        if (updatedPanier[index].quantity > 1) {
          updatedPanier[index].quantity -= 1;
        } else {
          updatedPanier.splice(index, 1);
        }
        return updatedPanier;
      }
      return prevPanier;
    });
  }, []);

  const totalItems = useMemo(() => panier.reduce((acc, item) => acc + item.quantity, 0), [panier]);
  const totalPrice = useMemo(() => panier.reduce((acc, item) => acc + item.quantity * item.prix, 0), [panier]);

  const passerCommande = async () => {
    const userEmail = "user@gmail.com"; // Remplacez par l'email réel si disponible
    const status = "Pending"; // Définir le statut de la commande comme "Pending"

    // Créer les objets de commande avec les champs requis par l'API
    const commandesPayload = panier.map(item => ({
      produit: parseInt(item.url.split('/').filter(Boolean).pop(), 10), // Extraire l'ID produit de l'URL
      quantite: item.quantity,
      date_commande: new Date().toISOString(),
      useremail: userEmail,
      status: status
    }));

    console.log('Passing order with payload:', commandesPayload);
    
    try {
      await Promise.all(commandesPayload.map(async commande => {
        await axios.post(`${API_BASE_URL}/Commande/`, commande, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }));
      Alert.alert("Commande passée", "Votre commande a été passée avec succès.");
      setPanier([]);
      setModalVisible(false);
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la commande. Veuillez réessayer.");
    }
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
      </View>

      {pharmacy && (
        <>
          <View style={styles.pharmacyHeader}>
            <Image source={{ uri: pharmacy.photo }} style={styles.pharmacyImage} />
            <View style={styles.pharmacyInfoContainer}>
              <Text style={styles.pharmacyName}>{pharmacy.nom}</Text>
              <Text style={styles.pharmacyEmail}>{pharmacy.email}</Text>
              <Text style={styles.pharmacyAddress}>{pharmacy.adresse}</Text>
              <Text style={styles.pharmacyOwner}>{pharmacy.proprietaire}</Text>
            </View>
          </View>

          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item.url.toString()}
              renderItem={({ item }) => (
                <View style={styles.productCard}>
                  {item.image && (
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                  )}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.Medicament}</Text>
                    <Text style={styles.productPrice}>{item.prix} FCFA</Text>
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => ajouterAuPanier(item)}
                    >
                      <Text style={styles.buttonText}>Ajouter au panier</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text>Aucun produit trouvé.</Text>
          )}

          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Voir le panier ({totalItems} articles)</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <ScrollView>
                {panier.length > 0 ? (
                  panier.map((item, index) => (
                    <PanierList
                      key={index}
                      item={item}
                      onAdd={ajouterAuPanier}
                      onRemove={retirerDuPanier}
                    />
                  ))
                ) : (
                  <Text>Le panier est vide.</Text>
                )}
              </ScrollView>
              <View style={styles.modalFooter}>
                <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)} FCFA</Text>
                <TouchableOpacity
                  style={styles.orderButton}
                  onPress={passerCommande}
                >
                  <Text style={styles.buttonText}>Passer la commande</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  pharmacyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  pharmacyInfoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pharmacyEmail: {
    fontSize: 14,
    color: '#555',
  },
  pharmacyAddress: {
    fontSize: 14,
    color: '#555',
  },
  pharmacyOwner: {
    fontSize: 14,
    color: '#555',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
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
  addToCartButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  viewCartButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalFooter: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default PharmacyDetail;



















// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // Composant pour afficher les détails de la pharmacie et la liste des produits
// const PharmacyDetail = ({ route, navigation }) => {
//   const { id } = route.params;
//   const [pharmacy, setPharmacy] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchPharmacyDetails = async () => {
//       try {
//         const pharmacyResponse = await axios.get(`http://192.168.100.214:8000/api/Pharmacie/${id}/`);
//         setPharmacy(pharmacyResponse.data);
//       } catch (error) {
//         setError("Erreur lors du chargement des détails de la pharmacie.");
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         const productsResponse = await axios.get(`http://192.168.100.214:8000/api/Produits/`);
//         setProducts(productsResponse.data);
//         setFilteredProducts(productsResponse.data);
//       } catch (error) {
//         setError("Erreur lors du chargement des produits.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPharmacyDetails();
//     fetchProducts();
//   }, [id]);

//   useEffect(() => {
//     if (searchQuery) {
//       setFilteredProducts(
//         products.filter(product =>
//           product.Medicament.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [searchQuery, products]);

//   const addToCart = (product) => {
//     // Logic to add product to cart can be implemented here
//     alert(`${product.Medicament} ajouté au panier.`);
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Chargement...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={30} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Détails de la Pharmacie</Text>
//       </View>

//       {pharmacy && (
//         <>
//           <View style={styles.pharmacyHeader}>
//             <Image source={{ uri: pharmacy.photo }} style={styles.pharmacyImage} />
//             <View style={styles.pharmacyInfoContainer}>
//               <Text style={styles.pharmacyName}>{pharmacy.nom}</Text>
//               <Text style={styles.pharmacyEmail}>{pharmacy.email}</Text>
//               <Text style={styles.pharmacyAddress}>{pharmacy.adresse}</Text>
//               <Text style={styles.pharmacyOwner}>{pharmacy.proprietaire}</Text>
//             </View>
//           </View>

//           <TextInput
//             style={styles.searchBar}
//             placeholder="Rechercher un produit..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />

//           <FlatList
//             data={filteredProducts}
//             keyExtractor={(item) => item.id ? item.id.toString() : 'default_key'}
//             renderItem={({ item }) => (
//               <View style={styles.productCard}>
//                 {item.image && (
//                   <Image source={{ uri: item.image }} style={styles.productImage} />
//                 )}
//                 <View style={styles.productInfo}>
//                   <Text style={styles.productName}>{item.Medicament}</Text>
//                   <Text style={styles.produitDescription} numberOfLines={2}>{item.description}</Text>
//                   <Text style={styles.productPrice}>{item.prix} FCFA</Text>
//                   <TouchableOpacity
//                     style={styles.addToCartButton}
//                     onPress={() => addToCart(item)}
//                   >
//                     <Text style={styles.buttonText}>Ajouter au panier</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//             ListEmptyComponent={<Text style={styles.emptyMessage}>Aucun produit disponible.</Text>}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     width: '100%',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   pharmacyHeader: {
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   pharmacyImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginVertical: 20,
//   },
//   pharmacyInfoContainer: {
//     alignItems: 'center',
//   },
//   pharmacyName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   pharmacyEmail: {
//     fontSize: 16,
//     color: '#555',
//   },
//   pharmacyAddress: {
//     fontSize: 16,
//     color: '#777',
//   },
//   pharmacyOwner: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#333',
//   },
//   searchBar: {
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 20,
//     borderColor: '#ddd',
//     borderWidth: 1,
//   },
//   productCard: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     overflow: 'hidden',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   productInfo: {
//     flex: 1,
//     padding: 10,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   produitDescription: {
//     fontSize: 14,
//     color: '#777',
//     marginVertical: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#333',
//     marginVertical: 5,
//   },
//   addToCartButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#28a745',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   emptyMessage: {
//     textAlign: 'center',
//     color: '#777',
//     fontSize: 16,
//     marginTop: 20,
//   },
// });

// export default PharmacyDetail;
