import { Text, View, StyleSheet, ImageBackground, Image, Button, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
const searchLogo = require("../assets/icon.png");


export default function Category(props) {







    return (

        <View style={props.selected? [styles.innerContainer, styles.selected] : styles.innerContainer}>


                <Image source={props.imageSource} style={styles.recipeImage} />

                
                <Text style={props.selected? [styles.detailText, styles.selected] : styles.detailText}>{props.category}</Text>


        

        </View>


    )
}




const styles = StyleSheet.create({

    innerContainer: {

        height: 170,
        width: 170,
        backgroundColor: '#F0F3F4',
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 20, height: 20 },
        shadowOpacity: 5,
        shadowRadius: 20,
        elevation: 15,
        margin: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'


    },

    selected: {
        backgroundColor: '#F58220',
        color: 'white'
    },


    recipeImage: {
        height: 100,
        width: '100%',
        resizeMode: 'cover',

        borderRadius: 50,

        borderColor: 'white',


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
        
        fontSize: 17,
        fontWeight: 'bold',
        color: '#F58220'
    },



})