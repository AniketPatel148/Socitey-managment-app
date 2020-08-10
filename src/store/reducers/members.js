import * as actionTypes from "../actions/actions";

const initialState = {
	loading: false,
	members: [],
	error: null,
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_MEMBERS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_MEMBERS_SUCCESS:
			return {
				...state,
				loading: false,
				members: action.members,
			};
		case actionTypes.FETCH_MEMBERS_FAIL:
			return {
				...state,
				error: action.error,
			};
		default:
			return state;
	}
};

export default Reducer;
