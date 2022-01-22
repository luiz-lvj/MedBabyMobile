import React, { useState } from "react";
import {StyleSheet,Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import ResultsBox from "./ResultsBox";

export default function CalculatorByDum(){

    const [dumDate, setDumDate] = useState(new Date());
    const [showDumDate, setShowDumDate] = useState(false);

    const [examDate, setExameDate] = useState(new Date());
    const [showExamDate, setShowExameDate] = useState(false);

    function changeDumDate(event, selectedDate){
        const currentDate = selectedDate || usDate;
        setShowDumDate(false);
        setDumDate(currentDate);
    }

    function changeExamDate(event, selectedDate){
        const currentDate = selectedDate || examDate;
        setShowExameDate(false);
        setExameDate(currentDate);
    }

    function strFromDate(date){
        const strDate = ("0" + date.getDate()).slice("-2") + '/' + ("0" + (date.getMonth() +1)).slice("-2") + '/' + date.getFullYear()
        return strDate;
    }

    return(
        <View style={dateStyle.container}>
            <View style={dateStyle.containerDates}>
                <Text style={dateStyle.labelDate}
                >Data da DUM</Text>
                <Text 
                onPress={() => setShowDumDate(true)}
                style ={dateStyle.date}>
                    {strFromDate(dumDate)}
                </Text>
                { showDumDate && 
                    <DateTimePicker  
                    value={dumDate} 
                    mode="date"
                    onChange={changeDumDate}/>
                }
            </View>

            <View style={dateStyle.containerDates}>
                <Text style={dateStyle.labelDate}
                >Data do exame</Text>
                <Text 
                onPress={() => setShowExameDate(true)}
                style ={dateStyle.date}>
                    {strFromDate(examDate)}
                </Text>
                { showExamDate && 
                    <DateTimePicker  
                    value={examDate} 
                    mode="date"
                    onChange={changeExamDate}/>
                }
            </View>

            <ResultsBox type="dum" dumDate={dumDate} examDate={examDate}/>
        
        </View>
    );
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
        height: '20%'
    },
    labelDate:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: '123Marker'
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
    }
});