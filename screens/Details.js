import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";



export default function Details() {
    const route = useRoute();

    const navigation = useNavigation();
    const { item } = route.params;
    const [meal, setMeal] = useState({});

    const [ingredients, setIngredients] = useState([]);


    const loadIngredients = (item) => {

        let ingredientsArray = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = item[`strIngredient${i}`];

            if (ingredient) {
                ingredientsArray.push(ingredient);
            }
        }

        setIngredients(ingredientsArray);
    };


    useEffect(() => {
        const loadMeal = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
                const data = await response.json();
                setMeal(data.meals[0]);
                loadIngredients(data.meals[0]);
            } catch (error) {
                console.log("Error while fetching recipes")

            }

        }
        loadMeal();
        
    }, []);




    return (


        <SafeAreaView style={styles.container} >
            {Object.keys(meal).length > 0 && (

                <ScrollView>


                    <Image style={styles.thumb} source={{ uri: meal.strMealThumb }} />


                    <View style={styles.titleView}>
                        <Text style={styles.title}>{meal.strMeal}</Text>
                    </View>
                    <Text style={styles.subtitle}>Category: {meal.strCategory}</Text>
                    <Text style={styles.subtitle}>Cuisine: {meal.strArea}</Text>
                    <Text style={styles.subtitle}>Instructions:</Text>
                    <Text style={styles.infoText}>{meal.strInstructions}</Text>
                    <Text style={styles.subtitle}>Ingredients:</Text>

                    {ingredients.map((ingredient, index) => (
                        <Text key={index} style={styles.infoText}>- {ingredient}</Text>
                    ))}


                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Go Back...</Text>
                    </TouchableOpacity>





                </ScrollView>

            )

            }

        </SafeAreaView>



    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0EDE4'
    },

    titleView: {

        justifyContent: 'center',
        alignItems: 'center',

        borderBottomColor: '#F58220',
        borderBottomWidth: 3,
        marginBottom: 20


    },
    title: {
        fontSize: 40,

        fontWeight: 'bold',
        color: '#F58220',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: "green",
        fontWeight: 'bold',
        marginTop: 10,
    },
    buttonText: {
        marginTop: 20,
        fontSize: 20,
        color: 'blue',
        fontWeight: 'bold'
    },

    thumb: {
        height: 300,
        width: '100%',
        borderRadius: 25,

        borderColor: 'white',
        marginBottom: 10,
        marginTop: 5
    },

    infoText: {
        fontSize: 16,
        color: "black",
        fontWeight: 'bold',

    },
});