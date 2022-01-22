import React, { useState } from "react";
import {StyleSheet,Text, TextInput, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import ResultsBox from "./ResultsBox";

export default function CalculatorByUs(){

    function strFromDate(date){
        const strDate = ("0" + date.getDate()).slice("-2") + '/' + ("0" + (date.getMonth() +1)).slice("-2") + '/' + date.getFullYear()
        return strDate;
    }

    const [usDate, setUsDate] = useState(new Date());
    const [showUsDate, setShowUsDate] = useState(false);

    const [examDate, setExameDate] = useState(new Date());
    const [showExamDate, setShowExameDate] = useState(false);

    const [weeksAge, setWeeksAge] = useState('0');
    const [daysAge, setDaysAge] = useState('0');

    function changeUsDate(event, selectedDate){
        const currentDate = selectedDate || usDate;
        setShowUsDate(false);
        setUsDate(currentDate);
    }

    function changeExamDate(event, selectedDate){
        const currentDate = selectedDate || examDate;
        setShowExameDate(false);
        setExameDate(currentDate);
    }

    function changeWeeksAge(newText){
        const numberWeeks = parseInt(newText);
        if(isNaN(numberWeeks)){
            setWeeksAge('');
            return;
        }
        if(numberWeeks < 0){
            setWeeksAge('');
            return;
        }
        setWeeksAge(newText);
    }

    function changeDaysAge(newText){
        const numberDays = parseInt(newText);
        if(isNaN(numberDays)){
            setDaysAge('');
            return;
        }
        
        if(numberDays < 0 || numberDays > 6){
            setDaysAge('');
            return;
        }
        setDaysAge(newText);
    }

    return(
        <View style={dateStyle.container}>
            <View style={dateStyle.containerDates}>
                <Text style={dateStyle.labelDate}
                >Data da US</Text>
                <Text 
                onPress={() => setShowUsDate(true)}
                style ={dateStyle.date}>
                    {strFromDate(usDate)}
                </Text>
                { showUsDate && 
                    <DateTimePicker  
                    value={usDate} 
                    mode="date"
                    onChange={changeUsDate}/>
                }
            </View>

            <View>
                <Text style={dateStyle.labelDate}
                >Idade gestacional na US</Text>
                <View style={inputWeekDays.containerInputs}>
                    <TextInput
                    value={weeksAge}
                    keyboardType="numeric"
                    maxLength={2}
                    style={inputWeekDays.textInput}
                    onChangeText={newText => changeWeeksAge(newText)}
                    />
                    <Text style={inputWeekDays.label}>semanas,</Text>
                    <TextInput
                    value={daysAge}
                    keyboardType="numeric"
                    maxLength={1}
                    style={inputWeekDays.textInput}
                    onChangeText={newText => changeDaysAge(newText)}
                    />
                    <Text style={inputWeekDays.label}>dias</Text>
                </View>

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

            <ResultsBox type="us"
            usDate={usDate} examDate={examDate}
            weeksAge={parseInt(weeksAge)} daysAge={parseInt(daysAge)}/>
        
        </View>
    );
}

const dateStyle = StyleSheet.create({
    container:{
        display: "flex",
        height: '99%',
        width: '80%',
        paddingBottom: '10%'
    },
    containerDates:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '15%'
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

const inputWeekDays = StyleSheet.create({
    containerInputs:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1%',
        width: '100%',
        justifyContent: 'center'
    }, 
    textInput: {
        backgroundColor: '#FFFFFF',
        width: '20%',
        height: 35,
        marginRight: '3%',
        marginLeft: '3%',
        borderWidth: 1,
        borderColor: '#000000'
    },
    label: {
        textAlignVertical: 'center',
        fontSize: 20
    }
})