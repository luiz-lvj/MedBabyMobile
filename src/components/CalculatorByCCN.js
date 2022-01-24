import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ResultsBox from "./ResultsBox";

export default function CalculatorByCCN(){

    const [ccnValue, setCcnValue] = useState("0");

    function changeCcnValue(newText){
        const numberCcn = parseFloat(newText);
        if(isNaN(numberCcn) || numberCcn < 0){
            setCcnValue('');
            return;
        }
        setCcnValue(newText)
    }

    function getIgFromCCN(strCcn){
        let floatCcn = parseFloat(strCcn);
        if(isNaN(floatCcn)){
            return {
                weeks: '-',
                days: '-'
            }
        }
        const ig = 5.2827 + (0.1584* floatCcn) - (0.0007 * floatCcn*floatCcn);
        if(ig < 0){
            return {
                weeks: '-',
                days: '-'
            } 
        }
        const weeks = Math.floor(ig);
        const days = Math.floor((ig-weeks)*7);
        return {
            weeks: weeks,
            days: days
        }
    }
    return(
        <View style={dateStyle.container}>
            <View style={dateStyle.containerDates}>
                <Text style={dateStyle.labelDate}>Medida do CCN (em mm)</Text>
                <TextInput
                value={ccnValue}
                keyboardType="numeric"
                onChangeText={newText => changeCcnValue(newText)}
                style={dateStyle.inputCcn}
                />
            </View>
            <ResultsBox type="ccn" weeks={getIgFromCCN(ccnValue).weeks} days={getIgFromCCN(ccnValue).days}/>
            
        </View>
    )
}

const dateStyle = StyleSheet.create({
    container:{
        display: "flex",
        height: '99%',
        width: '80%',
        paddingBottom: '10%',

    },
    containerDates:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        marginBottom: '35%'
    },
    labelDate:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: '123Marker',
        marginTop: '30%'
    },
    date:{
        textAlign: 'center',
        fontSize: 25,
        marginTop: '2%',
        backgroundColor: '#FFFFFF',
        width: '65%',
        height: '40%',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: '#000000'
    },
    inputCcn: {
        backgroundColor: '#FFFFFF',
        width: '60%',
        marginTop: '5%'
    }
});