import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ResultsBox from "./ResultsBox";
import dbConnect from "../dbConnect";

export default function CalculatorByCCN(){

    const [ccnValue, setCcnValue] = useState("0");
    const [weeks, setWeeks] = useState("-");
    const [days, setDays] = useState("-")

    function changeCcnValue(newText){
        const numberCcn = parseFloat(newText);
        if(isNaN(numberCcn) || numberCcn < 0){
            setCcnValue('');
            return;
        }
        setCcnValue(newText)
    }

    function getIgFromCCN(strCcn){
        const ccnInt = parseInt(strCcn);
        if(isNaN(ccnInt)){
            return {
                weeks: '-',
                days: '-'
            }
        }
        if(ccnInt < 2 || ccnInt > 79){
            return {
                weeks: '-',
                days: '-'
            }
        }
        dbConnect.transaction( tx => {
            const sqlQuery = `SELECT * FROM ccn_idade_gest
            WHERE "ccn"=${ccnInt};`
            tx.executeSql(sqlQuery, [], (tx2, results) => {
                setWeeks(results.rows.item(0)["idade_gestacional_semanas"])
                setDays(results.rows.item(0)["idade_gestacional_dias"])
            });
        });
        return {
            weeks: weeks ? weeks : '-',
            days: days ? days : '-'
        }
    }
    return(
        <View style={dateStyle.container}>
            <View style={dateStyle.containerDates}>
                <Text style={dateStyle.labelDate}>Medida do CCN (entre 2 e 79 mm)</Text>
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