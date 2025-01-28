import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import React, { memo } from 'react';
const searchLogo = require("../assets/icon.png");


function Recipe(props) {







    return (

        <View style={styles.innerContainer}>



            <View style={styles.itemcontainer}>

                <Image source={props.imageSource} style={styles.recipeImage} />

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Category: {props.category}</Text>


                    {
                        props.cuisine && (
                            <Text style={styles.detailText}>Cuisine: {props.cuisine}</Text>
                        )
                    }


                </View>





            </View>



            <TouchableOpacity style={styles.mealbutton} onPress={props.onPress}>
                <Text style={styles.recipeName}>{props.name}</Text>

            </TouchableOpacity>



        </View>


    )
}




const styles = StyleSheet.create({

    innerContainer: {

        height: 200,
        backgroundColor: '#F0F3F4',
        borderRadius: 25,
        borderColor: 'white',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 5,
        shadowRadius: 20,
        elevation: 15,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'


    },

    itemcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 140,

    },

    recipeImage: {
        height: 140,
        width: '50%',
        resizeMode: 'cover',

        borderRadius: 25,

        borderColor: 'white',


    },

    detailsContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',

    },

    mealbutton: {

        height: 50,
        width: '100%',
        backgroundColor: '#F58220',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 8


    },

    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',

    },

    detailText: {
        marginVertical: 5,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#F58220'
    },



})

export default memo(Recipe);