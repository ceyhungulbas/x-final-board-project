import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBfRpNGZBGbHy1YATA0gD8ff0e0i18rNM",
    authDomain: "board-project-cemu.firebaseapp.com",
    projectId: "board-project-cemu",
    storageBucket: "board-project-cemu.appspot.com",
    messagingSenderId: "330380544830",
    appId: "1:330380544830:web:efb499b8cfc834600efa6f"
};


firebase.initializeApp(firebaseConfig);

export default firebase.firestore();