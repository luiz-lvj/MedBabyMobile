import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Image, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Footer";
import { Picker } from "@react-native-picker/picker";
import CalculatorByUs from "./CalculatorByUs";
import CalculatorByDum from "./CalculatorByDum";

export default function Calculator({ navigation }){
    const [selectCalc, setSelectCalc] = useState("");

    return(
        <SafeAreaView style={calculatorStyle.container}>
            <LinearGradient colors={['#FFFFFF', '#B4CFD4' ]} style={calculatorStyle.gradient}>
                <Image
                source = {require('../imgs/MedBaby-08.png')}
                style={calculatorStyle.logoImg}
                onStartShouldSetResponder={() => navigation.navigate('Home') }
                />
                <Text style={calculatorStyle.title}>Calculadora gestacional</Text>
                <Picker
                selectedValue={selectCalc}
                onValueChange={(value, idx) => setSelectCalc(value)}
                style={selectionStyle.picker}
                >
                    <Picker.Item label="Selecione o método" value=""/>
                    <Picker.Item label="Por ultrassonografia (US)" value="us"/>
                    <Picker.Item label="Pela data da menstruação (DUM)" value="dum"/> 
                </Picker>
                {selectCalc === "us" && <CalculatorByUs/>}
                {selectCalc === "dum" && <CalculatorByDum/>}
                {selectCalc !== "us" && selectCalc !== "dum" && <View style={emptyStyle.container}/>}
                
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
        marginTop: '6%',
        height: '22%',
        width: '44%'
    },
    title:{
        fontFamily: '123Marker',
        fontSize: 20
    }
});

const selectionStyle = StyleSheet.create({
    picker: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        width: '80%',
        height: '0.4%',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginTop: '1%',
        borderWidth: 1,
        borderColor: '#000000'
    },
    label: {
        marginTop: '1%'
    }
});

const emptyStyle = StyleSheet.create({
    container:{
        display: "flex",
        height: '80%',
        width: '80%',
        paddingBottom: '3%'
    }
})