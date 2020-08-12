import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
	apiKey: ,
	authDomain:,
	databaseURL: ,
	projectId:,
	storageBucket: ,
	messagingSenderId:,
	appId: ,
	measurementId: ,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
