import React from "react";
import { StyleSheet, View, Text} from "react-native";

export default function Footer( { navigation } ){
    return(
        <View style={footerStyle.container}>
            <View style={footerStyle.leftFooter}>

            </View>
            <View style={footerStyle.rightFooter}>

            </View>
        </View>
    );
}

const footerStyle = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, 
        height: '15%',
        flex: 1
    },
    leftFooter:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '50%',
        backgroundColor: '#000000'
    },
    rightFooter:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '50%'
    }
})