import * as actionTypes from "./actions";
import { auth } from "../../firebase";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		userId: userId,
	};
};
export const authToken = (token) => {
	return {
		type: actionTypes.AUTH_TOKEN,
		token: token,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const authLogoutSuccess = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authLogout = () => {
	return (dispatch) => {
		auth.signOut().then(() => {
			dispatch(authLogoutSuccess());
		});
	};
};

export const authenticate = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		if (isSignUp) {
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					console.log(res);
					dispatch(authSuccess(res.user.uid));
					localStorage.setItem("userId", res.user.uid);
					auth.currentUser.getIdToken(true).then((token) => {
						dispatch(authToken(token));
						localStorage.setItem("token", token);
					});
				})
				.catch((err) => dispatch(authFail(err)));
		} else {
			auth
				.signInWithEmailAndPassword(email, password)
				.then((res) => {
					dispatch(authSuccess(res.user.uid));
					localStorage.setItem("userId", res.user.uid);
					auth.currentUser.getIdToken(true).then((token) => {
						dispatch(authToken(token));
						localStorage.setItem("token", token);
					});
				})
				.catch((err) => dispatch(authFail(err)));
		}
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		const userId = localStorage.getItem("userId");
		if (!token) {
			dispatch(authLogout());
			console.log("loggedout");
		} else {
			console.log("autologgedin");
			dispatch(authSuccess(userId));
			dispatch(authToken(token));
		}
	};
};

export const emailVerificationStart = () => {
	return {
		type: actionTypes.EMAIL_VERIFICATION_START,
	};
};

export const emailVerificationSent = () => {
	return {
		type: actionTypes.EMAIL_VERIFICATION_SENT,
	};
};

export const emailVerificationFail = (error) => {
	return {
		type: actionTypes.EMAIL_VERIFICATION_FAIL,
		error: error,
	};
};

export const emailVerificartionSend = () => {
	return (dispatch) => {
		dispatch(emailVerificationStart());
		auth.onAuthStateChanged((user) => {
			if (user) {
				auth.currentUser
					.sendEmailVerification()
					.then(function () {
						dispatch(emailVerificationSent());
					})
					.catch(function (error) {
						dispatch(emailVerificationFail(error));
					});
			} else {
				console.log("no user");
			}
		});
	};
};

export const emailVerificationSuccess = () => {
	return {
		type: actionTypes.EMAIL_VERIFICATION_SUCCESS,
	};
};

export const emailVerified = () => {
	return (dispatch) => {
		auth.onAuthStateChanged((user) => {
			if (user.emailVerified) {
				dispatch(emailVerificationSuccess());
			}
		});
	};
};
