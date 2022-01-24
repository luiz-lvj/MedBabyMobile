import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ResultsBox(props){

    function strFromDate(date){
        const strDate = ("0" + date.getDate()).slice("-2") + '/' + ("0" + (date.getMonth() +1)).slice("-2") + '/' + date.getFullYear()
        return strDate;
    }

    function addWeeksToDate(date, numberWeeks){
        const numDays = numberWeeks * 7
        const numHours = numDays * 24
        const numSeconds = numHours * 3600
        const numMiliSeconds = numSeconds * 1000
        const finalDate = new Date(date.getTime() + numMiliSeconds)
        return finalDate;
    }

    function addDaysToDate(date, numDays){
        const numHours = numDays * 24;
        const numSeconds = numHours * 3600;
        const numMiliSeconds = numSeconds * 1000;
        const finalDate = new Date(date.getTime() + numMiliSeconds)
        return finalDate;
    }

    function diffDateWeekDays(date, numWeeks, numDays){
        const weeksInMili = numWeeks * 7 * 24 * 3600 * 1000;
        const daysInMili = numDays * 24 * 3600 *1000;
        const finalDate = new Date(date.getTime() - weeksInMili - daysInMili);
        return finalDate
    }

    function timeWeekDays(timeDate){
        if(timeDate <= 0){
            return{
                weeks: '-',
                days: '-'
            }
        }
        const timeInSeconds = Math.floor(timeDate/1000);
        const timeInHours = Math.floor(timeInSeconds/3600);
        const timeInDays = Math.floor(timeInHours/24);
        const timeInWeeks = Math.floor(timeInDays/7);
        const weeks = timeInWeeks
        const days = timeInDays - weeks*7;
        return {
            weeks: weeks,
            days: days
        }
    }

    function timeWeekDaysFromUs(date, numWeeks, numDays){
        if(isNaN(numWeeks) || isNaN(numDays) || numDays < 0 || numWeeks < 0){
            return {
                weeks: '-',
                days: '-'
            }
        }
        const timeInitial = timeWeekDays(date);
        const timeInDays = timeInitial.days + numDays;
        let weeks = timeInitial.weeks + numWeeks;
        const weeksInDays = Math.floor(timeInDays/7);
        const days = timeInDays - weeksInDays*7
        weeks = weeks + weeksInDays;
        if(weeks <= 0 || days < 0){
            return {
                weeks: '-',
                days: '-'
            }
        }
        return {
            weeks: weeks,
            days: days
        }
    }

    return(
        <View style={resultStyle.container}>
            <View style={resultStyle.titleContainer}>
                <Text style={resultStyle.titleText}>Resultado</Text>
            </View>
            <View style={resultStyle.textContainer}>
                {props.type === "dum" &&
                <>
                <Text style={resultStyle.textResults}>
                    <Text style={resultStyle.boldText}>Idade Gestacional:</Text>{" "}
                    {timeWeekDays(props.examDate - props.dumDate).weeks + " "} semanas, 
                    {" " + timeWeekDays(props.examDate - props.dumDate).days + " "} dias
                </Text>
                <Text style={resultStyle.textResults}>
                    <Text style={resultStyle.boldText}>Data provável do parto:</Text>{" "}{strFromDate(addWeeksToDate(props.dumDate, 40))}
                </Text>
                </>
                }

                {props.type === "us" &&
                <>
                <Text style={resultStyle.textResults}>
                    <Text style={resultStyle.boldText}>Idade Gestacional:</Text>{" "}
                    {timeWeekDaysFromUs(props.examDate - props.usDate, props.weeksAge, props.daysAge).weeks} semanas,
                    {timeWeekDaysFromUs(props.examDate - props.usDate, props.weeksAge, props.daysAge).days} dias
                </Text>
                <Text style={resultStyle.textResults}> 
                    <Text style={resultStyle.boldText}>Data provável do parto:</Text>
                    {isNaN(props.weeksAge) || isNaN(props.daysAge) ? '' :
                    " " + strFromDate( addWeeksToDate(diffDateWeekDays(props.usDate, props.weeksAge,props.daysAge), 40))
                    }
                </Text>
                </>
                }
                {props.type === "biometry" && 
                    <Text style={resultStyle.textResults}>
                        Um feto na semana{" "}
                        <Text style={resultStyle.boldText}>{props.week}</Text> tem{" "}
                        <Text style={resultStyle.boldText}>{props.variable}</Text> de medida{" "}
                        <Text style={resultStyle.boldText}>{props.valueChoosen}</Text> no percentil{" "}
                        <Text style={resultStyle.boldText}>{props.percentile}</Text>
                        
                    </Text>
                }
                {props.type === "ccn" &&
                <>
                <Text style={resultStyle.textResults}>
                     <Text style={resultStyle.boldText}>Idade Gestacional:</Text>{" "}
                     {props.weeks} semanas, {props.days} dias
                </Text>
                <Text style={resultStyle.textResults}> 
                    <Text style={resultStyle.boldText}>Data provável do parto:</Text>
                    { isNaN(props.weeks) || isNaN(props.days) ? '':" " + strFromDate(addWeeksToDate(diffDateWeekDays(new Date(), props.weeks,props.days), 40))}
                </Text>
                </>
                }
            </View>
        </View>
        
    );
}

const resultStyle = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '23%',
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        backgroundColor: '#A6D9E1',
        width: '100%',
        height: '85%',
        borderStyle: 'dashed',
        borderColor: '#3A5B6B',
        borderRadius: 20,
        borderWidth: 2,
        zIndex: 1,
        paddingLeft: 1,
        paddingRight: 1
    },
    titleContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 0,
        backgroundColor: '#AA83BA',
        zIndex: 2,
        height: '30%',
        width: '50%',
        borderRadius: 10
    },
    titleText: {
        fontFamily: 'TimKid',
        color: '#FFFFFF',
        fontSize: 25
    },
    textResults: {
        fontFamily: 'Montserrat',
        fontSize: 15,
        color: '#000000',
        marginBottom: '0.3%'
    },
    boldText:{
        fontWeight: 'bold'
    }
})