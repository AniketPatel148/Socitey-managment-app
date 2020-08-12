import * as actionTypes from "../actions/actions";

const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	emailVerifiactionLinkSent: false,
	emailVerified: false,
};

const reducer = (state = initialState, action) => {
	console.log(state);
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				userId: action.userId,
				error: null,
				loading: false,
			};
		case actionTypes.AUTH_TOKEN:
			return {
				...state,
				token: action.token,
				error: null,
				loading: false,
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
			};
		case actionTypes.EMAIL_VERIFICATION_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.EMAIL_VERIFICATION_SENT:
			return {
				...state,
				loading: false,
				emailVerifiactionLinkSent: true,
			};
		case actionTypes.EMAIL_VERIFICATION_FAIL:
			return {
				...state,
				loading: false,
			};
		case actionTypes.EMAIL_VERIFICATION_SUCCESS:
			return {
				...state,
				emailVerified: true,
			};
		default:
			return state;
	}
};

export default reducer;
