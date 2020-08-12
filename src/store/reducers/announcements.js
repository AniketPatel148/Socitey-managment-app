import * as actionTypes from "../actions/actions";

const initialState = {
	announcements: [],
	loading: false,
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ANNOUNCEMENTS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_ANNOUNCEMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				announcements: action.announcements,
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
