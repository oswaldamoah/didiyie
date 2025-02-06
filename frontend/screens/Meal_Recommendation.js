import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const MealRecommendation = ({ route }) => {
  // Default to empty recommendedDishes if none are passed
  const recommendedDishes = route?.params?.recommendedDishes ?? [];
  
  // State for all dishes
  const [allDishes, setAllDishes] = useState([]);

  // Fetch all dishes if none are passed
  useEffect(() => {
    if (recommendedDishes.length === 0) {
      const fetchAllDishes = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/dishes'); // Example endpoint to fetch all dishes
          const dishes = await response.json();
          setAllDishes(dishes);
        } catch (error) {
          console.error('Error fetching all dishes:', error);
        }
      };
      fetchAllDishes();
    }
  }, [recommendedDishes]);

  // Placeholder image for dishes without images
  const placeholderImage = 'https://via.placeholder.com/200';

  // Function to render each dish
  const renderDish = ({ item }) => (
    <View style={styles.dishContainer}>
      <Image source={{ uri: item.image_url || placeholderImage }} style={styles.dishImage} />
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.dishDescription}>{item.description}</Text>
    </View>
  );

  // If there are no recommended dishes, show all dishes
  const dishesToDisplay = recommendedDishes.length > 0 ? recommendedDishes : allDishes;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Dishes</Text>
      {dishesToDisplay.length === 0 ? (
        <Text style={styles.noDishesText}>No recommended dishes available.</Text>
      ) : (
        <FlatList
          data={dishesToDisplay}
          renderItem={renderDish}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          contentContainerStyle={styles.list}
        />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFBF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  noDishesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  dishContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dishImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dishDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default MealRecommendation;
