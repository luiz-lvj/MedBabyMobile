
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Image, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Footer";
import { Picker } from "@react-native-picker/picker";
import dbConnect from "../dbConnect";
import ResultsBox from './ResultsBox';

export default function Biometry({ navigation }){
    const [variable, setVariable] = useState("");
    const [week, setWeek] = useState("");
    const [choiceMethod, setChoiceMethod] = useState("");
    const [valueChoosen, setValueChoosen] = useState("");
    const [percentile, setPercentile] = useState("");
    const [variableAppName, setVariableAppName] = useState("");

    const [variablesList, setVariablesList] = useState([]);
    const [weeksList, setWeeksList] = useState([]);
    const [valuesList, setValuesList] = useState([]);
    const [percentilesList, setPercentilesList] = useState([]);

    useEffect(() => {
        dbConnect.transaction( tx => {
            const sqlQuery = `SELECT * FROM table_app_names;`
            tx.executeSql(sqlQuery, [], (tx2, results) => {
                let variables = [];
                for(let i = 0; i < results.rows.length; ++i){
                    variables.push(results.rows.item(i));
                }
                setVariablesList(variables);
            });
        });
    }, []);

    function selectVariable(value, idx){
        setVariable(value);
        setWeek("");
        setWeeksList([])
        setChoiceMethod("");
        setValueChoosen("");
        setValuesList([]);
        setPercentile("");
        setPercentilesList([]);
        for(let i = 0; i < variablesList.length; i++){
            if(variablesList[i]["table_name"] == variable){
                setVariableAppName(variablesList[i]["app_name"]);
            }
        }
        if(variable != ""){
            dbConnect.transaction( tx => {
                const sqlQuery = `SELECT DISTINCT "idade_gestacional" FROM ${variable};`
                tx.executeSql(sqlQuery, [], (tx2, results) => {
                    let weeks = [];
                    for(let i = 0; i < results.rows.length; ++i){
                        weeks.push(results.rows.item(i));
                    }
                    setWeeksList(weeks);
                });
            });
        }
    }

    function selectWeek(value, idx){
        setWeek(value);
        setChoiceMethod("");
        setValueChoosen("");
        setValuesList([]);
        setPercentile("");
        setPercentilesList([]);
    }

    function selectChoiceMethod(value, idx){
        setChoiceMethod(value)
        setValueChoosen("");
        setValuesList([]);
        setPercentile("");
        setPercentilesList([]);
        if(variable != "" && week != "" && value != ""){
            dbConnect.transaction(tx => {
                const sqlQuery = `SELECT DISTINCT ${value}
                FROM ${variable} WHERE "idade_gestacional"=${week};
                `;
                tx.executeSql(sqlQuery, [], (tx2, results) => {
                    let valuesOrPercentiles = [];
                    for(let i = 0; i < results.rows.length; ++i){
                        valuesOrPercentiles.push(results.rows.item(i));
                    }
                    if(value === "valor"){
                        setValuesList(valuesOrPercentiles);
                    }
                    else{
                        setPercentilesList(valuesOrPercentiles);
                    }
                })
            });
        }
    }

    function selectValue(value,idx){
        setValueChoosen(value);
        setPercentile("");
        if(variable != "" && week != ""){
            if(value !== ""){
                dbConnect.transaction(tx => {
                    const sqlQuery = `SELECT "percentil"
                    FROM ${variable} WHERE "idade_gestacional"=${week}
                    AND "valor"=${value};`;
                    tx.executeSql(sqlQuery, [], (tx2, results) => {
                        setPercentile(results.rows.item(0)["percentil"]);
                    })
                })
            }
        }
    }

    function selectPercentile(value, idx){
        setPercentile(value);
        setValueChoosen("");
        if(value !== ""){
            dbConnect.transaction(tx => {
                const sqlQuery = `SELECT "valor"
                FROM ${variable} WHERE "idade_gestacional"=${week}
                AND "percentil"=${value};`;
                tx.executeSql(sqlQuery, [],(tx2, results) => {
                    setValueChoosen(results.rows.item(0)["valor"]);
                });
            });
        }
    }

    return(
        <SafeAreaView style={calculatorStyle.container}>
            <LinearGradient colors={['#FFFFFF', '#B4CFD4' ]} style={calculatorStyle.gradient}>
                <Image
                source = {require('../imgs/MedBaby-08.png')}
                style={calculatorStyle.logoImg}
                onStartShouldSetResponder={() => navigation.navigate('Home') }
                />

                <View style={biometryStyle.container}>
                    <View style={biometryStyle.containerSelection}>
                        <Text style={biometryStyle.label}>Variável biométrica</Text>
                        <Picker
                        selectedValue={variable}
                        onValueChange={(value, idx) => selectVariable(value)}
                        style={selectionStyle.picker}
                        >
                            <Picker.Item label="Selecione a variável" value=""/>
                            {variablesList.map((vari, idx) => {
                                return(
                                    <Picker.Item key={idx}
                                    label={vari["app_name"]} 
                                    value={vari["table_name"]}/>
                                );
                            })}
                        </Picker>
                    </View>
                    {variable != "" &&
                        <View style={biometryStyle.containerSelection}>
                            <Text style={biometryStyle.label}>Semana gestacional</Text>
                            <Picker
                            selectedValue={week}
                            onValueChange={(value, idx) => selectWeek(value, idx)}
                            style={selectionStyle.picker}
                            >
                                <Picker.Item label="Selecione a semana" value=""/>
                                {weeksList.map((vari, idx) => {
                                    return(
                                        <Picker.Item key={idx}
                                        label={"Semana " + vari["idade_gestacional"]} 
                                        value={vari["idade_gestacional"]}/>
                                    );
                                })}
                        </Picker>
                        </View>
                    }
                    {variable != "" && week != "" &&
                        <View style={biometryStyle.containerSelection}>
                            <Text style={biometryStyle.label}>Modo de escolha</Text>
                            <Picker
                            selectedValue={choiceMethod}
                            onValueChange={(value,idx) =>{
                                setChoiceMethod(value)
                                selectChoiceMethod(value, idx)}}
                            style={selectionStyle.picker}
                            >
                                <Picker.Item label="Selecione o modo" value=""/>
                                <Picker.Item label="Pelo valor medido" value="valor"/>
                                <Picker.Item label="Pelo percentil" value="percentil"/>
                            </Picker>
                        </View>
                    }
                    {variable != "" && week != "" && choiceMethod != "" &&
                        <View style={biometryStyle.containerSelection}>
                            <Text style={biometryStyle.label}>
                                {choiceMethod === "valor" ? "Valor medido" : "Percentil"}
                            </Text>
                            <Picker
                            selectedValue={choiceMethod === "valor" ? valueChoosen : percentile}
                            onValueChange={
                                choiceMethod === "valor" ? 
                                (value, idx) => selectValue(value, idx)
                                : (value, idx) => selectPercentile(value, idx)}
                            style={selectionStyle.picker}
                            >
                             <Picker.Item label={"Selecione o " + choiceMethod} value=""/>
                             {choiceMethod === "valor" &&
                                valuesList.map((item, idx) => {
                                    return(
                                        <Picker.Item key={idx}
                                        label={item['valor']}
                                        value={item['valor']}
                                        />
                                    );
                                })
                             }
                             {choiceMethod === "percentil" &&
                                percentilesList.map((item, idx) => {
                                    return(
                                        <Picker.Item key={idx}
                                        label={item['percentil']}
                                        value={item['percentil']}
                                        />
                                    );
                                })
                             }
                            </Picker>
                        </View>
                    }
                    { variable != "" && week != "" && valueChoosen != "" && percentile != "" &&
                        <ResultsBox type="biometry" 
                        variable={variableAppName}
                        week={week}
                        valueChoosen={valueChoosen}
                        percentile={percentile}
                        />
                    }   
                </View>
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
        backgroundColor: '#B4CFD4'
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
        paddingBottom: '20%',
    },
    logoImg:{
        marginTop: '5%',
        height: '22%',
        width: '44%',
        marginBottom: '2%'
    }
});

const biometryStyle = StyleSheet.create({
    container: {
        height: '72%',
        width: '90%'
    },
    containerSelection:{
        height: '12%',
        display: "flex",
        alignItems: 'center',
        marginBottom: "9%"
    }, 
    label:{
        fontFamily: '123Marker',
        fontSize: 20,
        marginBottom: '1%'
    }
});
const selectionStyle = StyleSheet.create({
    picker: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
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