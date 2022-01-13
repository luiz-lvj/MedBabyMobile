import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native"
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

export default function Home({ navigation }){
    return(
        <SafeAreaView style={homeStyle.container}>
            <LinearGradient colors={['#FFFFFF', '#B4CFD4' ]} style={homeStyle.gradient}>
                <Image source = {require('../imgs/MedBaby-08.png')} style={homeStyle.logoImg}/>

                <View style = {homeStyle.button} onStartShouldSetResponder={() => navigation.navigate('Calculator') }>
                    <Icon name="calendar" type='ionicon' />
                    <Text style={homeStyle.textButton}>Calculadora gestacional</Text>
                </View>

                <View style = {homeStyle.button} onStartShouldSetResponder={() => navigation.navigate('Biometry') }>
                    <Icon name="calendar" type='ionicon' />
                    <Text style={homeStyle.textButton}>Biometria fetal</Text>
                </View>

                <View style={homeStyle.imgsBottomView}>
                    <Image source = {require('../imgs/MedBaby-10.png')}/>
                    <Image source = {require('../imgs/MedBaby-10.png')}/>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const homeStyle = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        flex: 1,
        flexDirection: 'column',
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
        marginTop: '25%',
        height: '32%',
        width: '60%',
        marginBottom: '15%'
    },
    button:{
        marginBottom: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        backgroundColor: '#AA83BA',
        flexDirection: 'row',
        width: '75%',
        height: '10%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderColor: '#724983',
        borderBottomWidth: 5,
        borderRightWidth: 3,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    textButton:{
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: '15%'
    },
    imgsBottomView: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0

    },
    imgBottom: {
        width: '5%'
    }
})