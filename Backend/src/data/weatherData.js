const firebase = require('../firebase');
const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc
} = require('firebase/firestore')

const db = getFirestore(firebase);
const weatherService = require('../service/weatherService');

exports.getCities = async () => {
    const cities = [];
    const querySnapshot = await getDocs(collection(db, 'cities'));
    querySnapshot.forEach(doc => {
        cities.push(doc.data().city);
    });
    return cities;
};

exports.getWeather = async () => {
    const weather = [];
    const querySnapshot = await getDocs(collection(db, 'cities'));
    querySnapshot.forEach(doc => {
        weather.push(doc.data());
    });
    return weather;
}

exports.addCity = async (data) => {
    try{
        await addDoc(collection(db, 'cities'), data);
    }catch(errors){
        console.error('Error adding to Firebase: ', errors);
        throw new Error('Error adding document to Firebase');
    }
}

exports.refreshData = async () => {
    try{
        const querySnapshot = await getDocs(collection(db, 'cities'));
        querySnapshot.forEach(async doc => {
            const city = doc.data().city;
            const data = await weatherService.getWeatherForCity(city);
            await updateDoc(doc.ref, data);
        });
    }catch(errors){
        console.error('Error refreshing data: ', errors);
        throw new Error('Error refreshing data');
    }
}

exports.deleteCity = async (city) => {
    try{
        const querySnapshot = await getDocs(collection(db, 'cities'));
        querySnapshot.forEach(doc => {
            if(doc.data().city === city){
                deleteDoc(doc.ref);
            }
        });
    }catch (error){
        console.error('Error deleting from Firebase: ', error);
        throw new Error('Error deleting document from Firebase');
    }
}