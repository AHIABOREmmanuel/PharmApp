const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f9f9f9',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      width: '100%',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    cartIcon: {
      marginTop: 15,
    },
    cartBadge: {
      position: 'absolute',
      right: 0,
      top: -5,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: 'white',
      fontSize: 12,
    },
    pharmacyHeader: {
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    pharmacyImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginVertical: 20,
    },
    pharmacyInfoContainer: {
      alignItems: 'center',
    },
    pharmacyName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    pharmacyEmail: {
      fontSize: 18,
      color: '#666',
    },
    pharmacyAddress: {
      fontSize: 16,
      color: '#999',
    },
    pharmacyOwner: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#444',
    },
    searchBar: {
      height: 35,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
      width: '80%',
      alignSelf: 'center',
    },
    productCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    produitDescription: {
      fontSize: 14,
      color: '#777',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1c1c1c',
    },
    addToCartButton: {
      backgroundColor: '#5cb85c',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    emptyMessage: {
      textAlign: 'center',
      fontSize: 16,
      color: '#777',
      marginTop: 20,
    },
    cartContainer: {
      marginTop: 20,
    },
    cartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

export default styles