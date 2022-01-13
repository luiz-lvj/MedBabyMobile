import React from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Footer";

export default function Calculator({ navigation }){
    return(
        <SafeAreaView style={calculatorStyle.container}>
            <LinearGradient colors={['#FFFFFF', '#B4CFD4' ]} style={calculatorStyle.gradient}>
                <Image source = {require('../imgs/MedBaby-08.png')} style={calculatorStyle.logoImg}/>
                <Footer navigation={navigation}/>
            </LinearGradient>
        </SafeAreaView>
    );
}

const calculatorStyle = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#B4CFD4',
    },
    gradient:{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#B4CFD4',
        paddingBottom: '25%',
    },
    logoImg:{
        marginTop: '22%',
        height: '22%',
        width: '44%',
        marginBottom: '15%'
    }
});