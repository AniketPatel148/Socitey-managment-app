import * as actionTypes from "./actions";
import axios from "../../axios-instance";

export const fetchFullMemberStart = () => {
	return {
		type: actionTypes.FETCH_FULLMEMBERS_START,
	};
};

export const fetchFullMemberSuccess = (fullmember) => {
	return {
		type: actionTypes.FETCH_FULLMEMBERS_SUCCESS,
		fullmember: fullmember,
	};
};

export const fetchFullMemberFail = (error) => {
	return {
		type: actionTypes.FETCH_FULLMEMBERS_FAIL,
		error: error,
	};
};

export const fetchFullMemmber = (houseId) => {
	return (dispatch) => {
		dispatch(fetchFullMemberStart());
		axios
			.get("/House.json")
			.then((response) => {
				let data = [];
				for (let i in response.data) {
					if (i === houseId) {
						let k = response.data[i];
						for (let j in k) data.push(k[j]);
					}
				}
				dispatch(fetchFullMemberSuccess(data));
			})
			.catch((error) => dispatch(fetchFullMemberFail(error)));
	};
};
