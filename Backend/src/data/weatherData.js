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

exports.getCities = async () => {
    const cities = [];
    const querySnapshot = await getDocs(collection(db, 'cities'));
    querySnapshot.forEach(doc => {
        cities.push(doc.data().city);
    });
    return cities;
};

exports.addCity = async (city) => {
    try{
        const cities = await this.getCities();

        if(cities.includes(city)){
            return city;
        }
        
        await addDoc(collection(db, 'cities'), { city: city });
        return city;
    }catch (error){
        console.error('Error adding to Firebase: ', error);
        throw new Error('Error adding document to Firebase');
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