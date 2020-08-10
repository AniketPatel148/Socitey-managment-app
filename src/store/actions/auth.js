import * as actionTypes from "./actions";
import axios from "axios";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		tokenId: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const authLogout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
	console.log("worked");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			reutrnSecureToken: true,
		};
		console.log(authData, isSignUp);
		let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
		if (!isSignUp) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
		}
		console.log(process.env.REACT_APP_FIREBASE_API_KEY);
		axios
			.post(url + process.env.REACT_APP_FIREBASE_API_KEY, authData)
			.then((response) => {
				console.log(response);
				localStorage.setItem("token", response.data.idToken);
				localStorage.setItem("userId", response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
			})
			.catch((error) => {
				console.log(error);
				dispatch(authFail(error.response.data.error));
			});
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		if (!token) {
			dispatch(authLogout());
		} else {
			dispatch(authSuccess(token, userId));
		}
	};
};
