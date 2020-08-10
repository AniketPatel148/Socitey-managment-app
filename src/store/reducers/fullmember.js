import * as actionTypes from "../actions/actions";

const initialState = {
	fullmember: [],
	loading: false,
	error: null,
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_FULLMEMBERS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_FULLMEMBERS_SUCCESS:
			return {
				...state,
				loading: false,
				fullmember: action.fullmember,
			};
		case actionTypes.FETCH_FULLMEMBERS_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default Reducer;
