import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, ScrollView, SafeAreaView, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
const searchLogo = require("../assets/searchh.png");

import Recipe from '../components/Recipe';
import Category from '../components/Category';



export default function Home() {

    const navigation = useNavigation();

    const [find, setFind] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');


    const goToDetails = (item) => {
        navigation.navigate("Details", { item });
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                setCategories(data.categories);
                console.log(data.categories[0].strCategory);
            } catch (error) {
                console.log("Error while fetching recipes");
                console.log(error);
            }
        }

        fetchCategories();
    }, []);


    const findRecipes = async (find) => {

        setRecipes([]);
        setSelectedCat('');

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${find}`);
            const data = await response.json();
            setRecipes(data.meals);
            console.log(find);

            if (data.meals.length > 0) {
                console.log(data.meals[0].strMeal)
            }

        } catch (error) {
            console.log("Error while fetching recipes")
        }
    };


    const findByCategory = async (item) => {
        setFind('');
        setRecipes([]);
        setSelectedCat(item.strCategory);
        

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item.strCategory}`);
            const data = await response.json();
            setRecipes(data.meals);
            if (data.meals.length > 0) {
                console.log(data.meals.length);
            }

        } catch (error) {
            console.log("Error while fetching recipes")
        }

    }


    return (


        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        {/* Search Bar */}
                        <View style={styles.inputfield}>
                            <TextInput
                                placeholder="Search For Recipes"
                                value={find}
                                onChangeText={(text) => setFind(text)}
                            />
                            <TouchableOpacity onPress={() => findRecipes(find)}>
                                <Image source={searchLogo} style={styles.logo} />
                            </TouchableOpacity>
                        </View>

                        {/* Popular Categories */}
                        <Text style={styles.popularCategories}>Popular Categories</Text>
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => findByCategory(item)}

                                >
                                    <Category
                                        imageSource={{ uri: item.strCategoryThumb }}
                                        category={item.strCategory}
                                        selected={item.strCategory === selectedCat}
                                    />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={styles.horizontalScrollContainer}
                        />
                    </>
                }
                data={recipes}
                keyExtractor={(item) => item.idMeal.toString()}
                renderItem={({ item }) => (
                    <Recipe
                        imageSource={{ uri: item.strMealThumb }}
                        category={selectedCat || item.strCategory}
                        cuisine={item.strArea}
                        name={item.strMeal}
                        onPress={() => goToDetails(item.idMeal)}
                    />

                )}
                
                
                initialNumToRender={10}
                getItemLayout={(data, index) => ({
                    length: 200, 
                    offset: 100 * index, 
                    index,
                })}

            />
        </SafeAreaView>


    )



}


const styles = StyleSheet.create({


    container: {
        flex: 1,

        padding: 20,
        backgroundColor: '#F0EDE4'

    },

    inputfield: {

        height: 50,
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 8,
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'


    },

    logo: {


        height: 35,
        width: 35,
        resizeMode: 'stretch',


    },

    popularCategories: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#F58220'
    },



    horizontalScrollContainer: {
        paddingHorizontal: 10, 


    },

})