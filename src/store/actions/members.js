import * as actionTypes from "./actions";
import axios from "../../axios-instance";

export const fetchMembersStart = () => {
	return {
		type: actionTypes.FETCH_MEMBERS_START,
	};
};

export const fetchMembersSuccess = (members) => {
	return {
		type: actionTypes.FETCH_MEMBERS_SUCCESS,
		members: members,
	};
};

export const fetchMembersFail = (error) => {
	return {
		type: actionTypes.FETCH_MEMBERS_FAIL,
		error: error,
	};
};

export const fetchMembers = (token) => {
	return (dispatch) => {
		dispatch(fetchMembersStart());
		axios
			.get("/heads.json?auth=" + token)
			.then((response) => {
				const members = [];
				for (let i in response.data) {
					let k = response.data[i];
					for (let j in k) members.push(k[j]);
				}
				dispatch(fetchMembersSuccess(members));
			})
			.catch((err) => {
				dispatch(fetchMembersFail(err));
				console.log(err);
			});
	};
};
