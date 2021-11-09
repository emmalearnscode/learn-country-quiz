
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, getAnalytics } from 'firebase/database'



const firebaseConfig = {
    apiKey: 'AIzaSyCdZj2RJiXOpnGw8qMFGwFO2VbHR1hYOnQ',
    authDomain: 'new-flag-game.firebaseapp.com',
    databaseURL: 'https://new-flag-game-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'new-flag-game',
    storageBucket: 'new-flag-game.appspot.com',
    messagingSenderId: '506951071245',
    appId: '1:506951071245:web:198d921497d464f70f4744',
    measurementId: 'G-GF4QFRBZ12'
  }
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)


export const db = getDatabase(app)