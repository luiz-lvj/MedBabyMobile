import React from "react";
import { StyleSheet, View, Text} from "react-native";
import {Icon} from 'react-native-elements';
import {useRoute} from '@react-navigation/native'

export default function Footer( { navigation } ){
    const route = useRoute();
    const routeName = route.name;

    return(
        <View style={footerStyle({}).container}>
            <View style={footerStyle({routeName}).leftFooter} onStartShouldSetResponder={() => navigation.navigate('Calculator') }>
                <Icon name="calendar" type='ionicon' color='#FFFFFF' size={45} />
            </View>
            <View style={footerStyle({routeName}).rightFooter} onStartShouldSetResponder={() => navigation.navigate('Biometry') }>
                <Icon name="woman" type='ionicon' color='#FFFFFF'/>
            </View>
        </View>
    );
}

const footerStyle = (props) => StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, 
        height: '15%',
        flex: 1,
        backgroundColor: '#E1BBBF'
    },
    leftFooter:{
        display: 'flex',
        postion: 'absolute',
        left: 0,
        flex: props.routeName === 'Calculator' ? 2 : 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '50%',
        maxWidth: '50%',
        backgroundColor: props.routeName === 'Calculator' ? '#F4A7B0' : '#E1BBBF',
        elevation: props.routeName === 'Calculator' ? 15 : 0,
        borderColor: '#F4A7B0',
        borderTopRightRadius: props.routeName === 'Calculator' ? 15 : 0,
        borderBottomRightRadius: props.routeName === 'Calculator' ? 15 : 0,
        borderBottomWidth: 0,
        borderRightWidth: props.routeName === 'Calculator' ? 15 : 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    rightFooter:{
        display: 'flex',
        postion: 'absolute',
        right: 0,
        flex: props.routeName === 'Biometry' ? 2 : 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '50%',
        maxWidth: '49%',
        backgroundColor: props.routeName === 'Biometry' ? '#F4A7B0' : '#E1BBBF',
        elevation: props.routeName === 'Biometry' ? 15 : 0,
        borderColor: '#F4A7B0',
        borderTopLeftRadius: props.routeName === 'Biometry' ? 15 : 0,
        borderBottomLeftRadius: props.routeName === 'Biometry' ? 15 : 0,
        borderBottomWidth: 0,
        borderLeftWidth: props.routeName === 'Biometry' ? 15 : 0,
        borderRightWidth: 0,
        borderTopWidth: 0
    }
})