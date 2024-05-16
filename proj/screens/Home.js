import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Button } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SearchContainer from './searchcontainer';
import Cart from './Cart'; // Import your Cart component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function Home({ cartItems, onAddToCart }) {
  const navigation = useNavigation();
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const carouselData = [
    { id: 1, imageUrl: require('../assets/Hoodie.png'), title: 'Hoodie', price: '$25', info: 'Comfortable hoodie for everyday wear' },
    { id: 2, imageUrl: require('../assets/Bonnet.png'), title: 'Bonnet', price: '$15', info: 'Stylish bonnet to keep you warm' },
    { id: 3, imageUrl: require('../assets/Jeans.png'), title: 'Jeans', price: '$40', info: 'Classic denim jeans for any occasion' },
    // Add more images as needed
  ];

  const products = [
    { id: 4, imageUrl: require('../assets/Shirt.png'), title: 'Shirt', price: '$20', info: 'Casual shirt for a trendy look' },
    { id: 5, imageUrl: require('../assets/Shoes.png'), title: 'Shoes', price: '$50', info: 'Stylish shoes for every outfit' },
    // Add more products as needed
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    const lowerCaseQuery = query.toLowerCase(); // Convert query to lowercase for case-insensitive comparison

    // Check if the query matches any screen name
    if (lowerCaseQuery === 'hoodie') {
      navigation.navigate('Hoodie'); // Navigate to the Hoodie screen
    } else if (lowerCaseQuery === 'cardigan') {
      navigation.navigate('Cardigan'); // Navigate to the Cardigan screen
    } else if (lowerCaseQuery === 'bonnet') {
      navigation.navigate('Bonnet'); // Navigate to the Bonnet screen
    } else if (lowerCaseQuery === 'polo') {
      navigation.navigate('Polo'); // Navigate to the Polo screen
    } else if (lowerCaseQuery === 'shoes') {
      navigation.navigate('Shoes'); // Navigate to the Shoes screen
    } else if (lowerCaseQuery === 'shirt') {
      navigation.navigate('Shirt'); // Navigate to the Shirt screen
    } else {
      alert('No result found!'); // Show alert if no matching results found
    }
};
  

  const renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCarouselItemClick(item)}>
        <View style={styles.carouselItem}>
          <Image source={item.imageUrl} style={styles.carouselImage} />
          <Text style={styles.carouselText}>{item.title}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderProductItem = (product) => {
    return (
      <TouchableOpacity key={product.id} onPress={() => handleProductItemClick(product)}>
        <View style={styles.productItem}>
          <Image source={product.imageUrl} style={styles.productImage} />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCarouselItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleToggleRecentSearches = () => {
    setShowRecentSearches(!showRecentSearches);
  };

  const handleAddToCart = (item) => {
    onAddToCart(item); // Add the selected item to the cart
    setShowModal(false);
  };

  const handleProductItemClick = (product) => {
    // Handle product click event here
    console.log('Product clicked:', product);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Da. Source</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.image} />
        <SearchContainer onSearch={handleSearch} onToggleRecentSearches={handleToggleRecentSearches} />
      </View>

      {!showRecentSearches && (
        <>
          <View style={styles.carouselContainer}>
            <Carousel
              data={carouselData}
              renderItem={renderCarouselItem}
              sliderWidth={300}
              itemWidth={200}
              loop={true}
              autoplay={true}
            />
          </View>

          <View style={styles.productContainer}>
            <Text style={styles.productTitle}>Featured Products</Text>
            <View style={styles.productList}>
              {products.map(renderProductItem)}
            </View>
          </View>

          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.selectedItemTitle}>{selectedItem?.title}</Text>
                <Text style={styles.selectedItemPrice}>{selectedItem?.price}</Text>
                <Text style={styles.selectedItemInfo}>{selectedItem?.info}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(selectedItem)} style={styles.addToCartButtonModal}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                <Button title="Close" onPress={handleCloseModal} />
              </View>
            </View>
          </Modal>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Us</Text>
            <Text style={styles.sectionContent}>This is a brief description of our website. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut lectus at velit consequat varius. Sed eu tellus id felis efficitur tristique non eget nulla. Fusce vitae neque sit amet ligula cursus sollicitudin.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <Text style={styles.sectionContent}>- Web Design{'\n'}- Graphic Design{'\n'}- Content Writing{'\n'}- SEO Optimization</Text>
          </View>
        </>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 My Homepage. All rights reserved.</Text>
      </View>

      <Cart cartItems={cartItems} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 70,
    resizeMode: 'cover',
  },
  carouselContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center', // Center the carousel horizontally
  },
  carouselItem: {
    borderRadius: 20, // Adjust the border radius as needed for desired curve
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#fff', // Set background color to white
  },
  carouselImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  carouselText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000000', // Set text color to black
  },
  productContainer: {
    marginVertical: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 20,
  },
  productList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  productItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#fff',
  },
  section: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  selectedItemTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  selectedItemPrice: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  selectedItemInfo: {
    fontSize: 16,
  },
  addToCartButtonModal: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});