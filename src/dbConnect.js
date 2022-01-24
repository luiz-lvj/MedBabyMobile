import SQLite from 'react-native-sqlite-storage';

function okCallback(){
    console.log('deu bom');
}

function errorCallback(error){
    console.log('ERROR: ' + error);
}

const dbConfig = {
    name : "medbabymobile.db",
    createFromLocation: 1
}

const dbConnect = SQLite.openDatabase(dbConfig, okCallback,errorCallback);

export default dbConnect
