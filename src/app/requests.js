import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD45GZMjQoTHgShv8ltGmcs9iyI4qxL08A",
  authDomain: "la-regie-bde.firebaseapp.com",
  projectId: "la-regie-bde",
  storageBucket: "la-regie-bde.appspot.com",
  messagingSenderId: "1000837880571",
  appId: "1:1000837880571:web:f7265b43a775fb51c5ee5e",
  measurementId: "G-9MV3JS1B7P",
  databaseURL: "https://la-regie-bde-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
