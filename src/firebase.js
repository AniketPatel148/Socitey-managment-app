import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
	apiKey: "AIzaSyAFlMGU3YEZ5AGn_xCzXat7lbr3gq0P1gY",
	authDomain: "sahdev-345af.firebaseapp.com",
	databaseURL: "https://sahdev-345af.firebaseio.com",
	projectId: "sahdev-345af",
	storageBucket: "sahdev-345af.appspot.com",
	messagingSenderId: "685537054731",
	appId: "1:685537054731:web:e81211e34f91d4bb01f70e",
	measurementId: "G-HD34HY4BNQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
